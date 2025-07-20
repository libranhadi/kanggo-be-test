import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoute';
import workerRoutes from './routes/workerRoute';
import globRoutes from './routes/globRoute';
import {ErrorMiddleware}  from './middleware/ErrorMiddleware';
import authAdminMiddleware from './middleware/authAdminMiddleware';
import authMiddleware from './middleware/authMiddleware';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

app.use('/api/v1',authRoutes);
app.use('/api/v1', globRoutes);
app.use(authMiddleware)


app.get('/api/v1/health-check-validate-token', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP VALIDATED' });
});

app.use(authAdminMiddleware)
app.use('/api/v1/admin',workerRoutes);


app.use(ErrorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});