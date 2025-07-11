// Title.jsx
import './css/Title.css';
import Counter from './Counter';
import TitleText from './TitleText.jsx'

export default function Title() {
  return (
    <div id='Title' className='wrap'>
      <div className="text-effect-wrapper">
        <h1 className="text" contentEditable suppressContentEditableWarning={true}>
          HEY! I'M YURA<br />
          <p>LET'S BUILD SOMETHING<br />
          BEAUTIFUL TOGETHER.</p>
        </h1>
      </div>
    </div>
  );
}