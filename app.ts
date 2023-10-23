import express, { Request, Response } from 'express';
import { validateToken } from './authentification';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wordsByToken: Record<string, number> = {};

app.use('/api/justify', (req: Request, res: Response, next) => {
  const { token } = req.body;
  if (!validateToken(token)) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  next();
});

app.use('/api/justify', (req: Request, res: Response, next) => {
  const { token, text } = req.body;
  
  const wordCount = text.split(' ').length;
  const currentWordCount = wordsByToken[token] || 0;

  if (currentWordCount + wordCount > 80000) {
    return res.status(402).json({ error: 'Payment Required' });
  }

  
  wordsByToken[token] = currentWordCount + wordCount;

  next();
});


