import { Router } from 'express';
import passport from 'passport';
import authController from '../controllers/authController.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), authController.githubCallback);

router.get('/logout', authController.logout);
router.get('/user', authController.getUser);

export { router as authRoutes };
