import { useState, useEffect } from "react";

function CommentForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  // 🔧 Render 서버 주소
  const API_URL = "https://react-landingpage-oquo.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/comments`)
      .then((res) => res.json())
      .then((data) => setCommentList(data))
      .catch((err) => console.error("댓글 불러오기 실패:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !comment.trim()) return;

    const newComment = { name, phone, comment };

    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then(() => {
        // 등록 후 목록 다시 불러오기
        return fetch(`${API_URL}/comments`)
          .then((res) => res.json())
          .then((data) => setCommentList(data));
      })
      .catch((err) => console.error("댓글 등록 실패:", err));

    setName("");
    setPhone("");
    setComment("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="전화번호"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글"
        />
        <button type="submit">등록</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>댓글</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {commentList.map((c, index) => (
            <tr key={index}>
              <td><strong>{c.name}</strong></td>
              <td>{c.phone}</td>
              <td>{c.comment}</td>
              <td><small>{new Date(c.created_at).toLocaleString("ko-KR")}</small></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CommentForm;
