
import express, { Request, Response } from 'express';
import { justifyText } from './justify'; 
import { authRouter, validateToken } from './authentification'; 


const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

// Définition de la route pour la page d'accueil
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenue'); 
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialisation d'un objet qui va stocker le nombre de mots déjà traités par token
const wordsByToken: Record<string, number> = {};

app.use('/api/justify', authRouter);


app.post('/api/justify', (req: Request, res: Response) => {
  const { token, text } = req.body; 

  
  if (!token || !text) {
    return res.status(400).json({ error: 'Token and text are required' });
  }

  // Comptage du nombre de mots dans le texte
  const wordCount = text.split(' ').length;

  // Récupération du nombre de mots
  const currentWordCount = wordsByToken[token] || 0;

  // Vérification du dépassement de la limite
  if (currentWordCount + wordCount > 80000) {
    return res.status(402).json({ error: 'Payment Required' });
  }

  wordsByToken[token] = currentWordCount + wordCount;

  // Justification du texte
  const justifiedText = justifyText(text);

  
  const responseJSON = {
    justifiedText: justifiedText,
  };

  res.setHeader('Content-Type', 'application/json');

  // Réponse JSON correctement formatée
  res.status(200).send(JSON.stringify(responseJSON)); 
});
