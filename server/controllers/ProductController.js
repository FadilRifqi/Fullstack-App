import Product from "../models/ProductModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ["uuid", "name", "price", "updatedAt"],
      include: [{ model: User }],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ["uuid", "name", "price", "updatedAt"],
      where: {
        name: { [Op.startsWith]: req.params.id },
      },
      include: [{ model: User }],
    });

    if (!response || response.length < 1)
      return res.status(404).json({ msg: "Barang Ga ada!" });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getMyProduct = async (req, res) => {
  try {
    const response = await Product.findAll({
      attributes: ["uuid", "name", "price", "updatedAt"],
      where: { user_id: req.user_id },
      include: [{ model: User }],
    });
    if (!response) return res.status(404).json({ msg: "Barang Ga Ada" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product.id,
        },
        include: [{ model: User }],
      });
    } else {
      response = await Product.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { user_id: req.user_id }],
        },
        include: [{ model: User }],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  if (!name) return res.status(400).json({ msg: "Isi Nama Barang" });
  if (!price) return res.status(400).json({ msg: "Isi Harga Barang" });

  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/product/${fileName}`;
    const allowedTypes = [".png", ".jpeg", ".jpg"];
    if (!allowedTypes.includes(ext.toLocaleLowerCase()))
      return res.status(415).json({ msg: "Invalid Image" });
    if (fileSize > 5000000)
      return res.status(415).json({ msg: "Image Must Be Less Than 5 MB" });
    if (!file) return res.status(400).json({ msg: "Harus Memasukkan File" });

    file.mv(`./public/images/product/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.mesage });
      try {
        await Product.create({
          name: name,
          price: price,
          url: url,
          image: fileName,
          user_id: req.user_id,
        });
        res.status(200).json({ msg: "Created" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });
  } else {
    try {
      await Product.create({
        name: name,
        price: price,
        user_id: req.user_id,
      });
      res.status(201).json({ msg: "product created" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!product) return res.status(404).json({ msg: "data tidak ditemukan" });
  const { name, price } = req.body;

  if (req.files && req.files.file) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get(
      "host"
    )}/images/product/${fileName}`;
    const allowedTypes = [".png", ".jpeg", ".jpg"];

    if (!allowedTypes.includes(ext.toLocaleLowerCase()))
      return res.status(415).json({ msg: "Invalid Image" });
    if (fileSize > 5000000)
      return res.status(415).json({ msg: "Image Must Be Less Than 5 MB" });
    if (!file) return res.status(400).json({ msg: "Harus Memasukkan File" });

    const filepath = `./public/images/product/${product.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/product/${fileName}`, async (err) => {
      if (err) return res.status(500).json({ msg: err.mesage });
      try {
        await Product.update(
          {
            name: name || product.name,
            price: price || product.price,
            url: url || product.url,
            image: fileName || product.image,
            user_id: req.user_id,
          },
          {
            where: {
              [Op.and]: [{ id: product.id }, { user_id: req.user_id }],
            },
          }
        );

        res.status(200).json({ msg: "Updated" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });
  } else {
    try {
      if (req.user_id !== product.user_id)
        return res.status(403).json({ msg: "Akses Terlarang" });
      await Product.update(
        { name: name || product.name, price: price || product.price },
        {
          where: {
            [Op.and]: [{ id: product.id }, { user_id: req.user_id }],
          },
        }
      );

      res.status(200).json({ msg: "Updated" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    const filepath = `./public/images/product/${product.image}`;
    fs.unlinkSync(filepath);

    if (!product) return res.status(404).json({ msg: "data tidak ditemukan" });
    if (req.role === "admin") {
      await Product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.user_id !== product.user_id)
        return res.status(403).json({ msg: "Akses Terlarang" });
      await Product.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { user_id: req.user_id }],
        },
      });
    }
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
