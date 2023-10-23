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
export function validateToken(token: string): boolean {
  
    const validTokens = ["token1", "token2", "token3"]; 

    if (validTokens.includes(token)) {
        return true; // Le token est valide
    } else {
        return false; // Le token n'est pas valide
    }
}

function generateUniqueToken() {
  return 'your-unique-token';
}

