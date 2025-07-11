// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
require("dotenv").config(); // 환경변수 사용

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  dateStrings: true
});

// 연결 확인
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL 연결 실패:", err);
  } else {
    console.log("✅ MySQL 연결 성공!");
  }
});

// CORS 설정 (프론트와 통신 허용)
app.use(cors({
  origin: "http://localhost:5174", // 실제 배포 시 도메인으로 교체
  credentials: true
}));
app.use(express.json());

// GET: 댓글 목록
app.get("/comments", (req, res) => {
  const sql = "SELECT * FROM contact_board ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "DB 조회 실패", detail: err });
    res.json(results);
  });
});

// POST: 댓글 등록
app.post("/comments", (req, res) => {
  const { name, phone, comment } = req.body;
  const sql = "INSERT INTO contact_board (name, phone, comment, created_at) VALUES (?, ?, ?, ?)";
  const values = [name, phone || null, comment, new Date()];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: "DB 삽입 실패", detail: err });
    res.status(201).json({ success: true, id: result.insertId });
  });
});

// 서버 실행
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
