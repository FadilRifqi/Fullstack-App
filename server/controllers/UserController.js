import User from "../models/UserModel.js";
import argon2 from "argon2";
import Products from "../models/ProductModel.js";
import Friends from "../models/FriendModel.js";
import path from "path";
import fs from 'fs'
import Messages from "../models/MessageModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role", "url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        uuid: req.params.id,
      },
      attributes: ["uuid", "name", "email", "role","url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  const Users = await User.findAll({
    where: {
      name: name,
    },
  });
  for (let user of Users) {
    if (user.name === name)
      return res.status(400).json({ msg: "Username Sudah Ada" });
  }
  if (!name) return res.status(400).json({ msg: "Nama harus diisi" });
  if (!email) return res.status(400).json({ msg: "Email harus diisi" });
  if (!role) return res.status(400).json({ msg: "Pilih Salah Satu Role" });
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan Confirm Password tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.status(200).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User Ga Ada" });

  if (user.id !== req.user_id)
    return res.status(404).json({ msg: "Akses Terlarang" });

  const { name, email } = req.body;

  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/user/${fileName}`;
    const allowedTypes = [".png", ".jpeg", ".jpg"];
    if (!allowedTypes.includes(ext.toLocaleLowerCase()))
      return res.status(415).json({ msg: "Invalid Image" });
    if (fileSize > 5000000)
      return res.status(415).json({ msg: "Image Must Be Less Than 5 MB" });
    if (!file) return res.status(400).json({ msg: "Harus Memasukkan File" });
    const filepath = `./public/images/user/${user.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/user/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.mesage });
      try {
        await User.update(
          {
            name: name || user.name,
            email: email || user.email,
            url: url || user.url,
            image: fileName || user.image,
          },
          { where: { id: user.id } }
        );
        res.status(200).json({ msg: "Updated" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });
  }else{
    try {
      await User.update(
        {
          name: name || user.name,
          email: email || user.email,
        },
        { where: { id: user.id } }
      );
      res.status(200).json({ msg: "Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User Ga Ada" });
  try {
    //hapus yang berkaitan dengan user
    const filepath = `./public/images/user/${user.image}`
    fs.unlinkSync(filepath);
    await Products.destroy({
      where: {
        user_id: user.id,
      },
    });
    await Friends.destroy({
      where: {
        user_id: user.id,
      },
    });
    await Messages.destroy({
      where:{
        receiver_uuid:user.uuid
      }
    })

    //hapus user
    await User.destroy({ where: { id: user.id } });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
