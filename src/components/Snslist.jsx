// 자식 컴포넌트 Snslist.jsx
import styled from "styled-components";
const Styledsns = styled.a`
width:30px;
height:30px;
border-radius:50%;
background-color:#fff;
display:flex;
justify-content:center;
align-items:center;
background-image:url(${props => props.bg});
font-size:0px;
background-repeat:no-repeat;
background-size: 60%;
background-position:center;
cursor: pointer;

&:hover {
    background-image: url(${props => props.$hover});
  }
`
function Snslist({ text, bgimg, hoverimg }) {
	return (

		<li><Styledsns bg={bgimg} $hover={hoverimg}>{text}</Styledsns></li>
	);
}

export default Snslist;