let participants = []; // ← estado em memória (some após inatividade ou redeploy)

export default function handler(req, res) {
  // Cabeçalhos CORS básicos
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json(participants);
  }

  if (req.method === 'POST') {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Nome inválido' });
    }

    const player = { id: Date.now().toString(), name: name.trim() };
    participants.push(player);

    return res.status(201).json(player);
  }

  return res.status(405).json({ error: 'Método não permitido' });
}