"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
const tokens = new Map();
authRouter.post('/api/token', (req, res) => {
    const { email } = req.body;
    if (email) {
        const token = generateUniqueToken();
        tokens.set(email, token);
        res.json({ token });
    }
    else {
        res.status(400).json({ error: 'Invalid email' });
    }
});
function generateUniqueToken() {
    return 'your-unique-token';
}
