import { Router } from "express";
import { userModel } from "../models/user.models.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    user["password"] = undefined;
    req.session.user = user;

    res.status(200).redirect.apply("/profile");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  if (!first_name || !last_name || !email || !age || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user = await userModel.create({
      first_name,
      last_name,
      email,
      age,
      password,
    });
    res.status(201).redirect("/login");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

export default router