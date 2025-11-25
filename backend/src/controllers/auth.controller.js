const { v4: uuid } = require("uuid");
const sessionStore = require("../utils/session-store");

exports.startAuth = (req, res) => {
  const sessionId = uuid();
  sessionStore.createSession(sessionId);

  const authUrl = `${process.env.COMPOSIO_AUTH_URL}&state=${sessionId}`;

  res.json({ sessionId, authUrl });
};

exports.completeConnection = (req, res) => {
  const { sessionId, mcpsUrl } = req.body;

  if (!sessionId || !mcpsUrl)
    return res.status(400).json({ error: "Missing fields" });

  sessionStore.setMcpsUrl(sessionId, mcpsUrl);

  // store session cookie
  res.cookie("sessionId", sessionId, { httpOnly: true });
  res.json({ message: "Connected", mcpsUrl });
};

exports.getSessionInfo = (req, res) => {
  const { sessionId } = req.cookies;

  if (!sessionId) return res.json({ connected: false });

  const session = sessionStore.get(sessionId);
  res.json(session || { connected: false });
};
