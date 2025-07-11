// 1. 셰이더 import ← 최상단
import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader
} from './shaders.js';

// 2. WebGL 초기화 ← canvas 설정, viewport 설정
const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0.0, 0.0, 0.0, 1.0);

// 3. 유틸 함수 선언 ← createShader / createProgram 등 (function 는 어느데든 가능, 여기 추천)
function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl, vs, fs) {
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

// 4. 셀어 컴파일 및 프리그래머 생성 ← 여기서 import한 shader 실제로 사용
const simVertex = createShader(gl, gl.VERTEX_SHADER, simulationVertexShader);
const simFragment = createShader(gl, gl.FRAGMENT_SHADER, simulationFragmentShader);
const simProgram = createProgram(gl, simVertex, simFragment);

const renderVertex = createShader(gl, gl.VERTEX_SHADER, renderVertexShader);
const renderFragment = createShader(gl, gl.FRAGMENT_SHADER, renderFragmentShader);
const renderProgram = createProgram(gl, renderVertex, renderFragment);

// 5. 정점 버퍼 생성 (fullscreen quad) ← 한 번만 설정
const quadVerts = new Float32Array([
  -1, -1, 1, -1, -1, 1,
  -1, 1, 1, -1, 1, 1
]);
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

// 6. 텍스쳐 & FBO 생성 (ping-pong용)
function createFBOTexture() {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    canvas.width,
    canvas.height,
    0,
    gl.RGBA,
    gl.FLOAT,
    null
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return tex;
}

gl.getExtension('OES_texture_float'); // ✅ 꼭 있어야 gl.FLOAT 사용 가능

const textureA = createFBOTexture();
const textureB = createFBOTexture();
const fbo = gl.createFramebuffer(); // ✅ 꼭 필요!

function updateSimulation(time) {
  gl.useProgram(simProgram);
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, textureB, 0);

  const resolutionLoc = gl.getUniformLocation(simProgram, 'resolution');
  const mouseLoc = gl.getUniformLocation(simProgram, 'mouse');
  const timeLoc = gl.getUniformLocation(simProgram, 'time');
  const frameLoc = gl.getUniformLocation(simProgram, 'frame');

  gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
  gl.uniform2f(mouseLoc, mouse[0], mouse[1]);
  gl.uniform1f(timeLoc, time * 0.001);
  gl.uniform1i(frameLoc, frame);

  const positionLoc = gl.getAttribLocation(simProgram, 'position');
  gl.enableVertexAttribArray(positionLoc);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureA);
  const texLoc = gl.getUniformLocation(simProgram, 'textureA');
  gl.uniform1i(texLoc, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function renderToScreen() {
  gl.useProgram(renderProgram);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null); // 화면에 보이기 위해

  const resolutionLoc = gl.getUniformLocation(renderProgram, 'resolution');
  gl.uniform2f(resolutionLoc, canvas.width, canvas.height);

  const positionLoc = gl.getAttribLocation(renderProgram, 'position');
  gl.enableVertexAttribArray(positionLoc);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, textureB);
  const texLoc = gl.getUniformLocation(renderProgram, 'textureA');
  gl.uniform1i(texLoc, 0);

  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

// 7. 마우스 좌표 추적
let mouse = [0, 0];
canvas.addEventListener('mousemove', (e) => {
  mouse = [e.clientX, canvas.height - e.clientY];
});

let frame = 0;

// 8. 루프: 시뮬리언 + 렌더링
function loop(time) {
  updateSimulation(time);

  // ping-pong: A 로 발생한 결과를 B에 보고 전체 변경
  let temp = textureA;
  textureA = textureB;
  textureB = temp;

  renderToScreen();
  frame++;
  requestAnimationFrame(loop);
}
loop();