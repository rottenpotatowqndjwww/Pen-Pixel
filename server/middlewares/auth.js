import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.cookies.token; // <-- requires cookie-parser middleware

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // store decoded info for later use
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
