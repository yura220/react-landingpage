const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ Counter 라우트 임포트
const counterRoutes = require("./routes/counters");

// ✅ 미들웨어
app.use(express.json());

// ✅ CORS 설정
const allowedOrigins = [
  "http://localhost:5174",
  "https://react-landingpage-oquo.onrender.com",
  "https://react-landingpage-sable.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS 차단: 허용되지 않은 origin"));
    }
  },
  credentials: true
}));

// ✅ MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB 연결 성공!");
}).catch((err) => {
  console.error("❌ MongoDB 연결 실패:", err);
});

// ✅ 댓글 모델 정의
const commentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  comment: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});
const Comment = mongoose.model("Comment", commentSchema, "comments");

// ✅ 댓글 API
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ created_at: -1 });
    console.log("💬 불러온 댓글 수:", comments.length);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "DB 조회 실패", detail: err });
  }
});

app.post("/comments", async (req, res) => {
  const { name, phone, comment } = req.body;
  try {
    const newComment = new Comment({ name, phone, comment });
    await newComment.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "DB 저장 실패", detail: err });
  }
});

// ✅ 카운터 라우트 적용
app.use("/api/counters", counterRoutes);

// ✅ 서버 실행 (단 한 번만!)
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
