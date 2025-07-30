// 부모 컴포넌트 Snslists.jsx

import Snslist from "./Snslist";
//import './css/Sns.css' 파이어폭스검사기에서 배경이미지코드 전체가 표시됨
import instagram from '/img/svg/instagram.png';
import pinterest from '/img/svg/pinterest.png';
import notion from '/img/svg/notion.png';
import instagramhover from '/img/svg/instagram2.png';
import pinteresthover from '/img/svg/pinterest2.png';
import notionhover from '/img/svg/notion2.png';

function Snslists({ text1, text2, text3 }) {
    return (
        <ul className="sns">
            <Snslist
                text={text1}
                bgimg={instagram}
                hoverimg={instagramhover}
                link="https://www.instagram.com/yu_ra_8"
            />
            <Snslist
                text={text2}
                bgimg={pinterest}
                hoverimg={pinteresthover}
                link="https://kr.pinterest.com/ruddbfk/"
            />
            <Snslist
                text={text3}
                bgimg={notion}
                hoverimg={notionhover}
                link="https://www.notion.so/2407017f822b80b498c0ed86c58c4d45?source=copy_link"
            />
        </ul>
    );
}

export default Snslists;



