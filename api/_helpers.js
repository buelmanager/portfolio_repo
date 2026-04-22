const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'change-this-in-production';

function generateToken() {
  const ts = Date.now().toString();
  const sig = crypto.createHmac('sha256', SECRET).update(ts).digest('hex');
  return Buffer.from(`${ts}:${sig}`).toString('base64');
}

function verifyToken(token) {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, 'base64').toString();
    const colonIdx = raw.indexOf(':');
    const ts = raw.substring(0, colonIdx);
    const sig = raw.substring(colonIdx + 1);
    const expected = crypto.createHmac('sha256', SECRET).update(ts).digest('hex');
    const a = Buffer.from(sig.padEnd(64, '0'), 'hex');
    const b = Buffer.from(expected.padEnd(64, '0'), 'hex');
    if (!crypto.timingSafeEqual(a, b)) return false;
    if (sig !== expected) return false;
    return Date.now() - parseInt(ts) < 86400000; // 24h
  } catch {
    return false;
  }
}

async function githubRequest(method, path, body = null) {
  const { GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO } = process.env;
  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}${path}`;
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'portfolio-admin'
    }
  };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  const res = await fetch(url, options);
  const data = await res.json();
  return { status: res.status, data };
}

function safePath(p) {
  return p.split('/').filter(Boolean).every(part => part !== '..' && part !== '.');
}

function getTokenFromReq(req) {
  const auth = req.headers.authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : '';
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

module.exports = { generateToken, verifyToken, githubRequest, safePath, getTokenFromReq, setCors };
