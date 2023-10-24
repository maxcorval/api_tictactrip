import express, { Request, Response } from 'express';

const authRouter = express.Router();
const tokens = new Map<string, string>();

authRouter.post('/api/token', (req: Request, res: Response) => {
  const { email } = req.body;
  if (email) {
    const token = generateUniqueToken();
    tokens.set(email, token);
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid email' });
  }
});

export { authRouter };

function generateUniqueToken() {
  return 'your-unique-token';
}

export function validateToken(token: string): boolean {
    // Votre logique de validation de token ici.
    // Par exemple, vérifiez si le token est présent dans la map de tokens.
  
    return tokens.has(token);
  }