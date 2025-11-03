// src/app.ts
import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';
import loansRouter from './api/v1/routes/loans';
import { errorHandler } from './api/v1/middleware/errorHandler';
import { loggingMiddleware } from './api/v1/middleware/logging';

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use(loggingMiddleware);

// Version 1 routes
app.use('/api/v1/loans', loansRouter);

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Not Found', timestamp: new Date().toISOString() }));

// global error handler
app.use(errorHandler);

export default app;
