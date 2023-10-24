// app.mjs
import express from 'express';
import { justifyText } from './justify';
import { authRouter, validateToken } from './authentification';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenue');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wordsByToken = {};

app.use('/api/justify', authRouter);

app.post('/api/justify', (req, res) => {
  const { token, text } = req.body;

  if (!token || !text) {
    return res.status(400).json({ error: 'Token and text are required' });
  }

  const wordCount = text.split(' ').length;
  const currentWordCount = wordsByToken[token] || 0;

  if (currentWordCount + wordCount > 80000) {
    return res.status(402).json({ error: 'Payment Required' });
  }

  wordsByToken[token] = currentWordCount + wordCount;

  const justifiedText = justifyText(text);

  res.send(justifiedText);
});
