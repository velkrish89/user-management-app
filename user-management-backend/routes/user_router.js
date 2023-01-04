const express = require("express");
const { getUsers, createUser, getUserByRollNo, updateUserByRollNo, deleteUserByUserId } = require("../controller/userController");
const router = express.Router();


router.get("/users", getUsers);

router.post("/users", createUser);

router.get("/users/:userId", getUserByRollNo);

router.put("/users/:userId", updateUserByRollNo);

router.delete("/users/:userId", deleteUserByUserId);

module.exports = router;