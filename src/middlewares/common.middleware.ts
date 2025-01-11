import express from 'express';
import cors from 'cors';

export const commonMiddleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
];
