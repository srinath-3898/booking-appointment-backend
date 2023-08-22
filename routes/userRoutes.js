const express = require("express");
const {
  addUser,
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/add-user", addUser);
router.get("/allUsers", getAllUsers);
router.post("/edit-user/:userId", editUser);
router.delete("/delete-user/:userId", deleteUser);

module.exports = router;
