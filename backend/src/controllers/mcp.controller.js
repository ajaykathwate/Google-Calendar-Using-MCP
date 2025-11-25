const sessionStore = require("../utils/session-store");
const fetch = require("node-fetch");

async function proxyMcp(sessionId, path) {
  const session = sessionStore.get(sessionId);
  if (!session || !session.mcpsUrl) throw new Error("Not connected");

  const url = session.mcpsUrl + path;
  const response = await fetch(url);

  return response.json();
}

exports.getUpcoming = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  try {
    const now = new Date().toISOString();
    const data = await proxyMcp(sessionId, `/events?timeMin=${now}&limit=5`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPast = async (req, res) => {
  const sessionId = req.cookies.sessionId;
  try {
    const now = new Date().toISOString();
    const data = await proxyMcp(sessionId, `/events?timeMax=${now}&limit=5`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
