import Skillcard from "./Skillcard";

const skills = [
  { title: "Photoshop", desc: "이미지 편집 및 시각 요소 디자인", percent: 85 },
  { title: "Illustrator", desc: "로고 및 벡터 아이콘 제작", percent: 85 },
  { title: "InDesign", desc: "출판용 인쇄물 및 레이아웃 구성", percent: 60 },
  { title: "Figma", desc: "UI 설계 및 프로토타이핑", percent: 70 },
  { title: "Sass", desc: "스타일링 변수 및 믹스인 활용", percent: 60 },
  { title: "HTML", desc: "웹 구조 설계 및 시맨틱 마크업", percent: 70 },
  { title: "CSS", desc: "레이아웃 구성 및 반응형 디자인", percent: 80 },
  { title: "JavaScript", desc: "동적 UI 제어 및 이벤트 처리", percent: 60 },
  { title: "jQuery", desc: "DOM 조작 및 간단한 애니메이션 구현", percent: 60 },
  { title: "React", desc: "컴포넌트 기반 SPA 구성", percent: 50 },
  { title: "Vue", desc: "간결한 문법의 MVVM 기반 프레임워크", percent: 50 },
  { title: "Git", desc: "협업을 위한 브랜치 전략 및 커밋 관리 경험", percent: 50 },
];

function MainSkill({ subject, id }) {
  return (
    <section id={id}>
      <div className="wrap">
        <h2 className="h1">{subject}</h2>
        <div className="box">
          <ul className="grid">
            {skills.map((skill, index) => (
              <Skillcard
                key={index}
                title={skill.title}
                desc={skill.desc}
                percent={skill.percent}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MainSkill;