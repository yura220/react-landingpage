import { useEffect } from 'react';
import './css/about.css';

export default function About({ onFooterClass }) {
  useEffect(() => {
    if (onFooterClass) {
      onFooterClass('footer--about');
    }
  }, [onFooterClass]);

  return (
    <section id="about">
      <div className="wrap">
        <div className="img_box">
          <img src="/img/photo2.jpg" alt="" />
        </div>
        <div className="right">
          <ul className="greetings">
            <li className="p_top">
              <p>
                UX 중심의 디자인과 개발을 함께하는 디자이너 경유라입니다.<br />
                6년간 다양한 브랜드와 협업하며 실무 감각을 쌓았고,<br />
                퍼블리싱과 프론트엔드 역량으로 더 나은 UX를 고민합니다.<br />
                새로운 도전을 즐기며, 책임감 있게 끝까지 완성해냅니다.
              </p>
            </li>
            <li>
              <h3 className="brown">경력사항</h3>
              <ul className="personal_history">
                <li>
                  <div className="a_text">
                    <h4>비컴비</h4>
                    <p className="sub_title"><span>디자이너</span>2022.03 ~ 2024.03</p>
                  </div>
                  <p className="desc">
                    카드 및 카드 홀더 디자인을 중심으로,<br />
                    전단지, 브로슈어, 홈페이지 등 다양한 인쇄물 및 웹 디자인을 경험했습니다.
                  </p>
                  <p className="small">사용 툴: Photoshop, Illustrator</p>
                </li>
                <li>
                  <div className="a_text">
                    <h4>수철에프앤비</h4>
                    <p className="sub_title"><span>디자이너</span>2021.08 ~ 2019.07</p>
                  </div>
                  <p className="desc">
                    패키지, 메뉴판, 상세페이지, DID 등 브랜드 전반의 디자인을 담당했으며,<br />
                    영상 편집 등 멀티미디어 콘텐츠도 일부 제작했습니다.
                  </p>
                  <p className="small">사용 툴: Photoshop, Illustrator, Premiere Pro</p>
                </li>
                <li>
                  <div className="a_text">
                    <h4>가온팩토리</h4>
                    <p className="sub_title"><span>디자이너</span>2017.01 ~ 2019.02</p>
                  </div>
                  <p className="desc">
                    다양한 외주 업체와 협업하며 제품별 인쇄 방식(승화전사, 자수, 실크인쇄, 박 등)에<br />
                    최적화된 디자인을 제작했습니다. 마우스패드 관련 작업 비중이 높았으며,<br />
                    상세페이지 및 각종 인쇄물 디자인을 병행했습니다.
                  </p>
                  <p className="small">사용 툴: Photoshop, Illustrator</p>
                </li>
                <li>
                  <div className="a_text">
                    <h4>서울호서직업전문학교</h4>
                    <p className="sub_title"><span>온라인마케터</span>2015.03 ~ 2016.03</p>
                  </div>
                  <p className="desc">
                    기업 블로그·카페 관리, 키워드 기반 콘텐츠 작성, 1:1 온라인 상담 등의<br />
                    업무를 맡아 온라인 채널 운영 경험을 쌓았습니다.
                  </p>
                  <p className="small">업무 내용: 키워드 서치, 블로그/카페 글 작성, 고객 응대</p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
