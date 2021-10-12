import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';
import request from '../types/Request';

const checkAuth = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1]

        if (!token) {
           return res.status(401).json({ message: 'No TOKEN' });
        }
        const decodeToken = jwt.verify(token, config.get('jwtSecret'));
        req.user = decodeToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'соси хуй' });
    }
}
export default checkAuth;