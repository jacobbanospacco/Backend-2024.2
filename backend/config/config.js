import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 5000;
export const googleClientID = process.env.GOOGLE_CLIENT_ID;
export const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
export const githubClientID = process.env.GITHUB_CLIENT_ID;
export const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
export const sessionSecret = process.env.SESSION_SECRET;
