const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();
const processBulkPhoneNumbers = require('./bulkProcessor');
const sendSMSNotification = require('./smsNotifier');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    console.error('Authorization header missing');
    return res.status(401).send('Access Denied: Authorization header missing');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    console.error('Token missing');
    return res.status(401).send('Access Denied: Token missing');
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    console.log('Token verified:', verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error('Token verification error:', err.message);
    console.log('Token:', token);
    console.log('JWT_SECRET:', JWT_SECRET);
    return res.status(401).send('Access Denied: Invalid Token');
  }
};

// Register User
app.post('/register', async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phoneNumber,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Authenticate User
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) return res.status(400).send('Email or password is wrong');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.header('Authorization', `Bearer ${token}`).send(token);
});

// Protected route example
app.get('/user', authenticateToken, async (req, res) => {
  const user = await prismaClient.user.findUnique({ where: { id: req.user.userId } });
  res.json(user);
});

// Game Endpoints
app.post('/play', authenticateToken, async (req, res) => {
  const { score } = req.body;
  const game = await prismaClient.game.create({
    data: {
      userId: req.user.userId,
      score,
    },
  });
  res.status(201).json(game);
});

app.get('/scores', authenticateToken, async (req, res) => {
  const scores = await prismaClient.game.findMany({ where: { userId: req.user.userId } });
  res.json(scores);
});

app.post('/process-bulk', authenticateToken, async (req, res) => {
  const { filePath } = req.body;
  try {
    await processBulkPhoneNumbers(filePath);
    res.status(200).send('Bulk processing completed');
  } catch (error) {
    res.status(500).send(`Error processing bulk file: ${error.message}`);
  }
});

app.post('/notify-bonus', authenticateToken, async (req, res) => {
  const { phoneNumber, message } = req.body;
  try {
    await sendSMSNotification(phoneNumber, message);
    res.status(200).send('SMS notification sent');
  } catch (error) {
    res.status(500).send(`Error sending SMS: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
