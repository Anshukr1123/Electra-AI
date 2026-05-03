const admin = require('../utils/firebaseAdmin');

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  // For development ease, if auth is "mock", let it pass.
  // REMOVE THIS IN PRODUCTION
  if (authHeader === 'Bearer mock') {
    req.user = { uid: 'mock-user-123', email: 'test@example.com' };
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying auth token', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = { verifyToken };
