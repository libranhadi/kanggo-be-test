import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoute';
import {ErrorMiddleware}  from './middleware/ErrorMiddleware';

// import authMiddleware from './middleware/authMiddleware';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

app.use('/api/auth',authRoutes);
// app.use(authMiddleware)
app.use(ErrorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});