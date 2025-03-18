import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import users from "../models/auth.js";
export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await users.create({ email, password: hashedPassword });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      "GauravKishore"
    );
    res.status(200).json({ result: newUser, token });
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email:email });
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "GauravKishore"
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json("Something Went Wrong");
  }
};
