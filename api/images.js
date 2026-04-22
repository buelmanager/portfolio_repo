const { verifyToken, getTokenFromReq, githubRequest, safePath, setCors } = require('./_helpers');

const IMAGE_EXT = /\.(png|jpg|jpeg|gif|webp)$/i;

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!verifyToken(getTokenFromReq(req))) return res.status(401).json({ error: 'Unauthorized' });

  const folder = req.query.folder;
  if (!folder || !safePath(folder)) {
    return res.status(400).json({ error: 'Invalid folder' });
  }

  if (req.method === 'GET') {
    const { data, status } = await githubRequest('GET', `/contents/images/projects/${folder}`);
    if (status !== 200 || !Array.isArray(data)) {
      return res.json({ folders: [], images: [] });
    }
    const folders = data
      .filter(item => item.type === 'dir')
      .map(item => ({ name: item.name, path: `${folder}/${item.name}` }));
    const images = data
      .filter(item => item.type === 'file' && IMAGE_EXT.test(item.name))
      .map(item => ({
        name: item.name,
        sha: item.sha,
        url: item.download_url,
        path: `images/projects/${folder}/${item.name}`
      }));
    return res.json({ folders, images });
  }

  if (req.method === 'DELETE') {
    const { filename, sha } = req.body || {};
    if (!filename || !sha) return res.status(400).json({ error: 'filename, sha 필요' });
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }
    const { status } = await githubRequest(
      'DELETE',
      `/contents/images/projects/${folder}/${filename}`,
      { message: `Admin: delete ${folder}/${filename}`, sha }
    );
    if (status === 200) return res.json({ success: true });
    return res.status(500).json({ error: '삭제 실패' });
  }

  res.status(405).end();
};
