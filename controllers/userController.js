const { where } = require("sequelize");
const User = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const { fullName, email, mobile } = req.body;
    if (!fullName || !email || !mobile) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "You already have an appointment" });
    }
    const user = await User.create({
      fullName,
      email,
      mobile,
    });
    if (!user) {
      throw new Error(
        "Something went wring while booking an  appointment, pleas try again"
      );
    }
    return res.status(201).json({
      status: true,
      data: user,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      throw new Error(
        "Something went wring while fetching all  appointments, pleas try again"
      );
    }
    return res
      .status(200)
      .json({ status: true, data: users, message: "List all appointments" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const id = parseInt(req.params.userId);
    if (!id) {
      return res.status(400).json({ message: "Missing user id " });
    }
    const { fullName, email, mobile } = req.body;
    if (!fullName || !email || !mobile) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const updatedUser = await user.update({ fullName, email, mobile });
    if (!updatedUser) {
      throw new Error(
        "Something went wring while updating appointment details, pleas try again"
      );
    }
    return res.status(400).json({
      status: true,
      data: updatedUser,
      message: "Appointment updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.userId);
    if (!id) {
      return res.status(400).json({ message: "Missing user id " });
    }
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const deletedUser = await user.destroy();
    if (!deletedUser) {
      throw new Error("Couldnt delete the user");
    }
    return res.status(200).json({
      status: true,
      data: deletedUser,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { addUser, getAllUsers, editUser, deleteUser };
