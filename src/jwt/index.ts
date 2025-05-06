import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(payload: any) {
  const expiresIn = '5h';
  const token = jwt.sign(payload, String(JWT_SECRET), { expiresIn });
  return token;
}
export { generateToken };
