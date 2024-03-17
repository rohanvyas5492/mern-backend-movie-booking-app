const { z } = require("zod");
const { generateToken } = require("../lib/auth");
const User = require("../models/user");

const userSchemaSignup = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
const userSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const handleLogin = async function (req, res) {
  const userData = req.body;
  try {
    const { email, password } = userSchemaLogin.parse(userData);
    const user = await User.matchPassword(email, password);
    const token = generateToken({
      _id: user._id,
      role: user.role,
    });
    return res.status(200).json({
      status: "success",
      data: { _id: user._id, token: token },
    });
  } catch (error) {
    return res.status(404).json({ status: "failed", error: error.message });
  }
};

const handleSignUp = async function (req, res) {
  const userData = req.body;
  try {
    const validatedUser = userSchemaSignup.parse(userData);
    if (validatedUser.error) {
      return res
        .status(400)
        .json({ status: "error", error: safeParseResult.error });
    }
    const newUser = await User.create(validatedUser);
    const token = generateToken({
      _id: newUser._id.toString(),
      role: newUser.role,
    });

    return res.status(201).json({
      status: "success",
      data: { _id: newUser._id, token: token },
    });
  } catch (error) {
    return res.status(400).json({ status: "failed", error: error });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
};
