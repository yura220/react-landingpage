const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
//const PORT = 3001;
const PORT = process.env.PORT || 3000;

// CORS 설정 (기본적으로 http://localhost:5174만 허용)
app.use(cors({
  origin: "http://localhost:5174",  // 프론트엔드 URL 설정
  methods: "GET,POST",             // 허용하는 HTTP 메서드
  allowedHeaders: "Content-Type",  // 허용하는 헤더
  credentials: true //
}));

app.use(express.json());

// MySQL 연결
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // 사용자 이름
  password: "Mghfkddl92!", // 비밀번호
  database: "contact_db", // 실제 DB 이름
  dateStrings: true
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 오류:", err);
  } else {
    console.log("MySQL 연결 성공!");
  }
});

// 댓글 목록 가져오기
app.get("/comments", (req, res) => {
  const sql = "SELECT * FROM contact_board ORDER BY id DESC";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send("DB 조회 오류");
    res.json(result);
  });
});

// 댓글 저장
app.post("/comments", (req, res) => {
  const { name, phone, comment } = req.body;
  const date = new Date().toISOString().split("T")[0]; // 날짜 추가

  const sql = "INSERT INTO contact_board (name, phone, comment, date) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, phone, comment, date], (err, result) => {
    if (err) {
      console.error("DB 저장 오류:", err);
      return res.status(500).send("DB 저장 오류");
    }
    res.json({ message: "댓글 저장 성공" });
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});