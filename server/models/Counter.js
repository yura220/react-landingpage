// models/Counter.js
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  count: {
    type: Number,
    default: 0,
    min: 0
  },
  icon: {
    type: String,
    default: "❤️"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 업데이트 시 updatedAt 자동 갱신
counterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// 원자적 증가 메서드
counterSchema.statics.incrementCounter = async function(counterId) {
  const result = await this.findOneAndUpdate(
    { id: counterId },
    {
      $inc: { count: 1 },
      $set: { updatedAt: Date.now() }
    },
    {
      new: true,
      upsert: true, // 없으면 새로 생성
      setDefaultsOnInsert: true
    }
  );
  return result;
};

// 카운터 조회 메서드
counterSchema.statics.getCounter = async function(counterId) {
  let counter = await this.findOne({ id: counterId });
  if (!counter) {
    // 없으면 새로 생성
    counter = new this({ id: counterId, count: 0 });
    await counter.save();
  }
  return counter;
};

module.exports = mongoose.model('Counter', counterSchema);