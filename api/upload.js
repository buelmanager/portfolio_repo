const { verifyToken, getTokenFromReq, githubRequest, safePath, setCors } = require('./_helpers');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (!verifyToken(getTokenFromReq(req))) return res.status(401).json({ error: 'Unauthorized' });
  if (req.method !== 'POST') return res.status(405).end();

  const { folder, filename, content } = req.body || {};
  if (!folder || !filename || !content) {
    return res.status(400).json({ error: 'folder, filename, content 필요' });
  }
  if (!safePath(folder) || filename.includes('..') || filename.includes('/')) {
    return res.status(400).json({ error: 'Invalid path' });
  }
  if (!/\.(png|jpg|jpeg|gif|webp)$/i.test(filename)) {
    return res.status(400).json({ error: '이미지 파일만 업로드 가능합니다' });
  }

  // Get existing SHA if file already exists (required for update)
  const { data: existing } = await githubRequest(
    'GET',
    `/contents/images/projects/${folder}/${filename}`
  );

  const body = {
    message: `Admin: upload ${folder}/${filename}`,
    content
  };
  if (existing?.sha) body.sha = existing.sha;

  const { status, data } = await githubRequest(
    'PUT',
    `/contents/images/projects/${folder}/${filename}`,
    body
  );

  if (status === 201 || status === 200) {
    return res.json({
      success: true,
      path: `images/projects/${folder}/${filename}`,
      sha: data.content?.sha
    });
  }

  return res.status(500).json({ error: '업로드 실패', detail: data?.message });
};

module.exports.config = {
  api: { bodyParser: { sizeLimit: '10mb' } }
};
