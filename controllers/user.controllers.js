const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cookieToken = require("../utils/cookieToken");

// User signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all fields" });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    // Send user a token
    cookieToken(user, res);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please provide email or password");
    }
    // find a user based on email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    // Where is no user
    if (!user) {
      throw new Error("User not found");
    }

    // password mismatch
    if (user.password !== password) {
      throw new Error("Password incorrect");
    }
    // User is there and validation
    cookieToken(user, res);
  } catch (error) {
    throw Error(error);
  }
};

// logout
const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { signup, login, logout };
