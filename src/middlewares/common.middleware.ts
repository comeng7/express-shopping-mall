import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

export const commonMiddleware = [
  express.json(),
  express.urlencoded({ extended: true }),
  cors(),
  helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
  }),
];
