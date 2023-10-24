
import express, { Request, Response } from 'express';

const authRouter = express.Router();
const tokens = new Map<string, string>();

// Définition d'une route pour la création de jetons d'authentification
authRouter.post('/api/token', (req: Request, res: Response) => {
  const { email } = req.body;

  // Vérification e-mail fourni dans la demande
  if (email) {
    const token = generateUniqueToken();
    tokens.set(email, token);

    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid email' });
  }
});

function generateUniqueToken() {
  return 'your-unique-token';
}

// Fonction de validation du jeton
function validateToken(token: string): boolean {
  return tokens.has(token);
}

export { authRouter, generateUniqueToken, validateToken };
