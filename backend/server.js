import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import './services/passportConfig.js';
import { authRoutes } from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'un-secreto-muy-seguro',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // para pruebas locales, debería ser `true` en producción con HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
