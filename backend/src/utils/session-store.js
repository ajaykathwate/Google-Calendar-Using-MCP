const store = {};

module.exports = {
  createSession(sessionId) {
    store[sessionId] = { mcpsUrl: null, createdAt: Date.now() };
  },
  setMcpsUrl(sessionId, url) {
    if (store[sessionId]) store[sessionId].mcpsUrl = url;
  },
  get(sessionId) {
    return store[sessionId];
  }
};
