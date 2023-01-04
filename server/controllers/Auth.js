import User from "../models/UserModel.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await User.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Ga Ada" });

  const match = await argon2.verify(user.password, req.body.password);

  if (!match) return res.status(400).json({ msg: "Ga Cocok" });
  req.session.user_id = user.uuid;
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.user_id) {
    return res.status(401).json({ msg: "Mohon Login" });
  }
  const user = await User.findOne({
    where: {
      uuid: req.session.user_id,
    },
    attributes: ["uuid", "name", "email", "role","url"],
  });
  if (!user) return res.status(404).json({ msg: "User Ga Ada" });
  res.status(200).json(user);
};

export const Logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "tidak dapat Logout" });
    res.status(200).json({ msg: "Ando Telah Logout" });
  });
};
