import express, { Request, Response } from 'express';

import { justifyText } from './justify';
import { authRouter, validateToken } from './authentification'; // Assurez-vous d'importer validateToken

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

app.use('/api/justify', authRouter); // Utilisez le routeur d'authentification

app.post('/api/justify', (req: Request, res: Response) => {
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
