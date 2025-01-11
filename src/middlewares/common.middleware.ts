import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const commonMiddleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
  helmet({
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  }),
];
