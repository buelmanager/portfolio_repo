const { generateToken, verifyToken, getTokenFromReq, setCors } = require('./_helpers');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { password } = req.body || {};
    if (!password) return res.status(400).json({ error: '비밀번호를 입력해주세요' });
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: '비밀번호가 틀렸습니다' });
    }
    return res.json({ token: generateToken() });
  }

  if (req.method === 'GET') {
    return res.json({ valid: verifyToken(getTokenFromReq(req)) });
  }

  res.status(405).end();
};
