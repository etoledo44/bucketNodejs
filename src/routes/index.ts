import { Router } from 'express';
import mainProcess from './mainRoute/index';
import _login from './login/index';

const routes = Router();

routes.use(_login);
routes.use(mainProcess);

export default routes;
