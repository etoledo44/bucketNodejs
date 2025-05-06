import { Request, Response } from 'express';
import { generateToken } from '../../jwt/index';

async function login(req: Request, res: Response): Promise<void> {
  console.time('login');
  const user = req.body;
  const userMock = {
    id: 1,
    name: 'eriq',
    password: '45646546',
  };

  const payload = { id: userMock.id, userName: userMock.name };
  const jwt = generateToken(payload);

  console.timeEnd('login');
  res.status(200).json(jwt);
}

export { login };
