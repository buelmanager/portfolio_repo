const { verifyToken, getTokenFromReq, githubRequest, setCors } = require('./_helpers');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!verifyToken(getTokenFromReq(req))) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const { data, status } = await githubRequest('GET', '/contents/data.json');
    if (status !== 200 || !data.content) {
      return res.status(500).json({ error: 'data.json을 가져올 수 없습니다' });
    }
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
    return res.json({ content, sha: data.sha });
  }

  if (req.method === 'POST') {
    const { content, sha } = req.body || {};
    if (!content || !sha) return res.status(400).json({ error: 'content, sha 필요' });
    const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
    const { status } = await githubRequest('PUT', '/contents/data.json', {
      message: 'Admin: update data.json',
      content: encoded,
      sha
    });
    if (status === 200) return res.json({ success: true });
    return res.status(500).json({ error: 'data.json 저장 실패' });
  }

  res.status(405).end();
};

module.exports.config = {
  api: { bodyParser: { sizeLimit: '5mb' } }
};
