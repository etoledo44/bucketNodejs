import { Router, RequestHandler } from 'express';
const _login = Router();
import { login } from '../../controllers/login/index';

_login.post('/login', login as RequestHandler);

export default _login;
