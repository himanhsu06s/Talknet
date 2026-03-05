const express = require('express');
const { protect } = require('../middlewares/authMiddlerware');
const {accessChat,fetchChat, createGroupChat, renameGroup, addToGroup, removeFromGroup} = require ("../controllers/chatsController");


const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChat);

router.route('/group').post(protect, createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/remove").put(protect,removeFromGroup);
router.route("/add").put(protect,addToGroup);

module.exports = router;              