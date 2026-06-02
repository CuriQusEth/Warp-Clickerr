export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      name: "Warp Clicker Orchestrator",
      status: "active",
      platform: "Warp Clicker",
      version: "1.0.0"
    });
  }

  if (req.method === 'POST') {
    return res.status(200).json({
      status: "success",
      message: "Agent interaction received",
      receivedAt: new Date().toISOString(),
      payload: req.body
    });
  }

  return res.status(404).json({ error: "Not found" });
}
