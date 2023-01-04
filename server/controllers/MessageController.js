import Friends from "../models/FriendModel.js";
import User from "../models/UserModel.js";
import Messages from "../models/MessageModel.js";

export const getAllMessages = async (req, res) => {
  try {
    const response = await Messages.findAll({
      attributes: ["uuid", "sender_name", "sender_uuid", "text"],
      where: {
        receiver_id: req.user_id,
      },
      group: ["sender_uuid"],
      order: [["createdAt", "ASC"]],
    });
    if (!response) return res.status(404).json({ msg: "ga ada" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const getAllFriendMessages = async (req, res) => {
  try {
    const response = await Messages.findAll({
      attributes: ["uuid", "sender_name", "sender_uuid", "text"],
      where: {
        receiver_id: req.user_id,
        sender_id:req.params.id,
      },
      order: [["createdAt", "ASC"]],
    });
    if (!response) return res.status(404).json({ msg: "ga ada" });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const createMessages = async (req, res) => {
  const { receiver_uuid, text } = req.body;
  if (!receiver_uuid) return res.status(400).json({ msg: "uuid ga valid" });
  if (!text) return res.status(400).json({ msg: "isi pesan" });
  try {
    const sender = await User.findOne({
      where: {
        id: req.user_id,
      },
    });
    if (!sender) return res.status(404).json({ msg: "User Ga ada" });
    const receiver = await User.findOne({
      where: {
        uuid: receiver_uuid,
      },
    });
    if (!receiver) return res.status(404).json({ msg: "User Ga ada" });

    await Messages.create({
      sender_id: sender.id,
      sender_uuid: sender.uuid,
      sender_name: sender.name,
      receiver_uuid: receiver_uuid,
      receiver_id: receiver.id,
      text: text,
    });
    res.status(201).json({ msg: "Berhasil Mengirim Pesan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteMessages = async (req, res) => {
  try {
    await Messages.destroy({
      where: {
        receiver_id: req.user_id,
        sender_uuid:req.params.id
      },
    });
    res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
