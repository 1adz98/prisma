const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.send("You are not logged in");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    // you can do more checks
    next();
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isLoggedIn;
