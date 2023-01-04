import Friends from "../models/FriendModel.js";
import User from "../models/UserModel.js";

export const getAllFriends = async (req, res) => {
  try {
    const response = await Friends.findAll({
      where: {
        user_id: req.user_id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "Ga ada Teman" });
  }
};
export const getFriendById = async (req, res) => {
  try {
    const friend = await Friends.findOne({
      where: {
        friend_uuid: req.params.id,
      },
      attributes: ["user_id", "friend_uuid", "friend_name"],
    });
    if (!friend) return res.status(404).json({ msg: "Ga ada" });
    res.status(200).json(friend);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const createFriends = async (req, res) => {
  const { friend_uuid } = req.body;
  try {
    const friend_data = await User.findOne({
      where: {
        uuid: friend_uuid,
      },
      attributes: ["uuid", "name"],
    });
    const friendlist = await Friends.findAll({
      where: {
        user_id: req.user_id,
      },
    });

    for (let friend of friendlist) {
      if (friend.friend_uuid === friend_uuid) {
        return res.status(400).json({ msg: "Sudah Ada Dalam Friendlist" });
      }
    }

    if(!friend_data) return res.status(404).json({msg:"User Tidak Ditemukan"})

    await Friends.create({
      friend_uuid: friend_uuid,
      friend_name: friend_data.name,
      user_id: req.user_id,
    });
    res.status(200).json({ msg: "Berhasil Tambah Teman"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteFriends = async (req, res) => {
    const {friend_uuid} = req.body
    if(!friend_uuid)return res.status(400).json({ msg: "Teman mana yang mau dihapus" });
  try {
    await Friends.destroy({
      where: {
        friend_uuid,
      },
    });
    res.status(200).json({ msg: "Berhasil Menghapus Teman" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
