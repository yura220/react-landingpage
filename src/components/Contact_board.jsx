//  Contact_board.jsx
import { useState, useEffect } from "react";

function Contact_board() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  // 댓글 목록 불러오기
  useEffect(() => {
    fetch("http://localhost:3001/comments")
      .then((res) => res.json())
      .then((data) => setCommentList(data))
      .catch((err) => console.error("불러오기 오류:", err));
  }, []);

  // 댓글 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !comment.trim()) return;

    const today = new Date().toISOString().split("T")[0];
    const newComment = { name, phone, comment, created_at: today };

    fetch("http://localhost:3001/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then(() => {
        // 새로고침 없이 목록 갱신
        setCommentList((prev) => [newComment, ...prev]);
        setName("");
        setPhone("");
        setComment("");
      })
      .catch((err) => console.error("저장 오류:", err));
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Number"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
        />
        <button type="submit"><strong>등록</strong></button>
      </form>

      <ul>
        {commentList.map((c, index) => (
          <li key={index}>
            <strong>{c.name}</strong>
            <p>{c.phone.slice(0, 3) + '-****-' + c.phone.slice(-4)}</p>
            <small>{new Date(c.created_at).toLocaleDateString('ko-KR')}</small>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Contact_board;