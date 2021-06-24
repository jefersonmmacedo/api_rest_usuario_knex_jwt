const express = require("express")
const app = express();
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const UsersController = require("../controllers/UsersController");


router.get('/', HomeController.index);
router.post('/user', UsersController.create);
router.get('/user', UsersController.index);
router.get('/user/:id', UsersController.findUserId);
router.put('/user', UsersController.Update)

module.exports = router;