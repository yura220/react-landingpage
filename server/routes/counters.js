// routes/counters.js
const express = require('express');
const router = express.Router();
const Counter = require('../models/Counter');

// GET /api/counters/:id - 특정 카운터 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.getCounter(id);

    res.json({
      id: counter.id,
      count: counter.count,
      icon: counter.icon,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Get counter error:', error);
    res.status(500).json({ error: 'Failed to get counter' });
  }
});

// POST /api/counters/:id/increment - 카운터 증가
router.post('/:id/increment', async (req, res) => {
  try {
    const { id } = req.params;
    const counter = await Counter.incrementCounter(id);

    res.json({
      id: counter.id,
      count: counter.count,
      icon: counter.icon,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Increment counter error:', error);
    res.status(500).json({ error: 'Failed to increment counter' });
  }
});

// PUT /api/counters/:id - 카운터 값 직접 설정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { count, icon } = req.body;

    if (typeof count !== 'number' || count < 0) {
      return res.status(400).json({ error: 'Invalid count value' });
    }

    const updateData = { count, updatedAt: Date.now() };
    if (icon) updateData.icon = icon;

    const counter = await Counter.findOneAndUpdate(
      { id },
      updateData,
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      id: counter.id,
      count: counter.count,
      icon: counter.icon,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Update counter error:', error);
    res.status(500).json({ error: 'Failed to update counter' });
  }
});

// DELETE /api/counters/:id - 카운터 삭제
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Counter.deleteOne({ id });
    res.json({ message: 'Counter deleted successfully' });
  } catch (error) {
    console.error('Delete counter error:', error);
    res.status(500).json({ error: 'Failed to delete counter' });
  }
});

// GET /api/counters - 모든 카운터 조회
router.get('/', async (req, res) => {
  try {
    const counters = await Counter.find({}).sort({ updatedAt: -1 });
    res.json(counters.map(counter => ({
      id: counter.id,
      count: counter.count,
      icon: counter.icon,
      updatedAt: counter.updatedAt
    })));
  } catch (error) {
    console.error('Get all counters error:', error);
    res.status(500).json({ error: 'Failed to get counters' });
  }
});

// POST /api/counters/:id/reset - 카운터 리셋
router.post('/:id/reset', async (req, res) => {
  try {
    const { id } = req.params;

    const counter = await Counter.findOneAndUpdate(
      { id },
      { count: 0, updatedAt: Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({
      id: counter.id,
      count: counter.count,
      icon: counter.icon,
      updatedAt: counter.updatedAt
    });
  } catch (error) {
    console.error('Reset counter error:', error);
    res.status(500).json({ error: 'Failed to reset counter' });
  }
});

module.exports = router;