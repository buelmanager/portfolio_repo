const { verifyToken, getTokenFromReq, githubRequest, safePath, setCors } = require('./_helpers');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!verifyToken(getTokenFromReq(req))) return res.status(401).json({ error: 'Unauthorized' });

  if (req.method === 'GET') {
    const { data, status } = await githubRequest('GET', '/contents/images/projects');
    if (status !== 200 || !Array.isArray(data)) {
      return res.status(500).json({ error: '폴더 목록을 가져올 수 없습니다' });
    }
    const folders = data
      .filter(item => item.type === 'dir')
      .map(item => ({ name: item.name, path: item.name }));
    return res.json(folders);
  }

  if (req.method === 'POST') {
    const { name } = req.body || {};
    if (!name) return res.status(400).json({ error: '폴더 이름이 필요합니다' });
    if (!safePath(name) || !/^[a-zA-Z0-9/_-]+$/.test(name)) {
      return res.status(400).json({ error: '영문, 숫자, -, _, / 만 사용 가능합니다' });
    }
    const { status } = await githubRequest(
      'PUT',
      `/contents/images/projects/${name}/.gitkeep`,
      { message: `Admin: create folder ${name}`, content: '' }
    );
    if (status === 201) return res.json({ success: true });
    return res.status(500).json({ error: '폴더 생성 실패' });
  }

  res.status(405).end();
};
