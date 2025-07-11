// 부모 컴포넌트 Snslists.jsx

import Snslist from "./Snslist";
//import './css/Sns.css' 파이어폭스검사기에서 배경이미지코드 전체가 표시됨
import instagram from '/img/svg/instagram.png';
import pinterest from '/img/svg/pinterest.png';
import notion from '/img/svg/notion.png';
import instagramhover from '/img/svg/instagram2.png';
import pinteresthover from '/img/svg/pinterest2.png';
import notionhover from '/img/svg/notion2.png';

// function Snslists(){ // 배열을 이용한 내용전달
//     const sns=['인스타그램','핀터레스트','노션'];
//     return(
//         <ul>
//             <Snslist text={sns[0]} />
//             <Snslist text={sns[1]} />
//             <Snslist text={sns[2]} />
//         </ul>
//     );
// }
function Snslists({ text1, text2, text3 }) {
    return (
        <ul className="sns">
            <Snslist text={text1} bgimg={instagram} hoverimg={instagramhover} />
            <Snslist text={text2} bgimg={pinterest} hoverimg={pinteresthover} />
            <Snslist text={text3} bgimg={notion} hoverimg={notionhover} />
        </ul>
    );
}
export default Snslists;



