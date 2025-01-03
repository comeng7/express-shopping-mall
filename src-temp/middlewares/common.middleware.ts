import express from 'express';
import cors from 'cors';

export const commonMiddleware = [
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
];
