// 메일 제출 ------------------------------------------------------------------------
// import { useState } from "react";

// function ContactForm() {
//   const [email, setEmail] = useState("");
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('이벤트 객체정보 : ', e);
//     alert(`입력한 이메일: ${email}`);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">제출</button>
//       </form>
//       <p>{email}</p>
//     </>
//   );
// };

// export default ContactForm;

// import { useState } from "react";

// function ContactForm() {
//   const [email, setEmail] = useState("");
//   const [inputValue, setInputValue] = useState(""); //3 입력값 임시 저장용

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setEmail(inputValue); //4 제출할 때만 상태 업데이트
//     alert(`입력한 이메일: ${inputValue}`);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           value={inputValue} // 1
//           onChange={(e) => setInputValue(e.target.value)} //2 이건 단순히 임시 보관용
//         />
//         <button type="submit">제출</button>
//       </form>
//       <p>{email}</p> {/* 제출한 이메일만 출력 */}
//     </>
//   );
// }

// export default ContactForm;
// 댓글등록 -----------------------------------------------------------------------------
// import { useState } from "react";

// function CommentForm() {
//   const [comment, setComment] = useState(""); // 입력 중인 댓글 상태입니다.
//   const [commentList, setCommentList] = useState([]); // 등록된 댓글 목록 상태입니다.

//   const handleSubmit = (e) => {
//     e.preventDefault(); // 폼 제출 시 페이지 새로고침을 막습니다.
//     if (comment.trim() === "") return; // 빈 문자열 등록 방지입니다.

//     setCommentList([comment, ...commentList]); // 기존 댓글 목록에 새 댓글 추가입니다.
//     setComment(""); // 입력창 초기화입니다.
//     console.log(commentList);
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)} // 입력한 값을 상태에 저장합니다.
//           placeholder="댓글을 입력하세요"
//         />
//         <button type="submit">등록</button>
//       </form>

//       <ul>
//         {commentList.map((c, index) => (
//           <li key={index}>{c}{console.log(`배열요소${typeof c}`)}</li> // 등록된 댓글 목록을 출력합니다.
//         ))}
//       </ul>
//     </>
//   );
// }

// 댓글 등록 컴포넌트 만들기 번호 + 작성일자 기능 추가 ----------------------------------------
// import { useState } from "react";

// function CommentForm() {
//   const [comment, setComment] = useState(""); // 입력 중인 댓글 상태입니다.
//   const [commentList, setCommentList] = useState([]); // 등록된 댓글 목록 상태입니다.

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim() === "") return;

//     const newComment = {
//       text: comment,
//       date: new Date().toLocaleString(), // 현재 날짜와 시간입니다.
//     };

//     setCommentList([...commentList, newComment]); // 새 댓글 객체를 목록에 추가합니다.
//     setComment(""); // 입력창 초기화입니다.
//   };

//   return (
//     <><form onSubmit={handleSubmit}>
//       <input type="text"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="댓글을 입력하세요"
//       />
//       <button type="submit">등록</button>
//     </form>

//       <ul>
//         {commentList.map((c, index) => (
//           <li key={index}>
//             <strong>{index + 1}.</strong> {c.text} <br />
//             <small>{c.date}</small>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default CommentForm;

// import { useState } from "react";

// function CommentForm() {
//   const [comment, setComment] = useState("");
//   const [commentList, setCommentList] = useState([]);

//   const formatDate = (dateObj) => {
//     const year = dateObj.getFullYear();
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // 0~11이라 +1 필요
//     const day = String(dateObj.getDate()).padStart(2, "0");
//     return `${year} / ${month} / ${day}`;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (comment.trim() === "") return;

//     const newComment = {
//       text: comment,
//       date: formatDate(new Date()), // 날짜 포맷 적용
//     };

//     setCommentList([newComment, ...commentList]);
//     setComment(""); // 입력창 초기화
//   };

//   return (
//     <><form onSubmit={handleSubmit}>
//       <input type="text"
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         placeholder="댓글을 입력하세요"
//       />
//       <button type="submit">등록</button>
//     </form>

//       <ul>
//         {commentList.map((c, index) => (
//           <li key={index}>
//             {/* {index + 1}. */}
//             <strong>{c.text}</strong>
//             <br />
//             <small>{c.date}</small>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

// export default CommentForm;

// 로컬 스토리지 저장 ----------------------------------------------------------------
import { useState, useEffect } from "react";

function CommentForm() {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  // 날짜를 YYYY-MM-DD 형식으로 반환하는 함수입니다.
  const formatDate = (dateObj) => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 컴포넌트가 처음 마운트될 때 로컬 스토리지에서 댓글을 불러옵니다.
  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setCommentList(JSON.parse(savedComments));
    }
  }, []);

  // 댓글이 추가될 때마다 로컬 스토리지에 저장합니다.
  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(commentList));
  }, [commentList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.trim() === "" || comment.trim() === "") return;

    const newComment = {
      author: author,
      text: comment,
      date: formatDate(new Date()),
    };

    setCommentList([...commentList, newComment]);
    setAuthor("");
    setComment("");
  };

  return (
    <><form onSubmit={handleSubmit}>
      <input className="form_input" type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="이름을 입력하세요"
      />
      <input className="form_input" type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <button type="submit">등록</button>
    </form>

      <ul>
        {commentList.map((c, index) => (
          <li className="form_li" key={index}>
            <strong><b>{c.author}</b></strong>{c.text}
            <br />
            <small>{c.date}</small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommentForm;