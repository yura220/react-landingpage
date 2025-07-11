import { useEffect } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './js/shaders';

export default function CanvasEffect() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // ✅ renderer 선언 먼저!
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 배경 투명

    // ✅ 스타일 적용 (선언 이후!)
    Object.assign(renderer.domElement.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      zIndex: '9999', // ✅ 맨 위로
      pointerEvents: 'none', // ✅ 클릭 막지 않음
    });

    // ✅ 한 번만 추가
    document.body.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 0 },
      mouse: { value: new THREE.Vector2(0.5, 0.5) },
      resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };



    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const animate = (t) => {
      uniforms.time.value = t * 0.001;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleMouseMove = (e) => {
      uniforms.mouse.value.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight
      );
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement && document.body.contains(renderer.domElement)) {
        document.body.removeChild(renderer.domElement);
      }
    };
  }, []);

  return null; // ✅ JSX에 아무것도 렌더링 안 함
}
