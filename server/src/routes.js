const { Router } = require('express') ;

const router = Router();
const controller = require('./controller');

router.post("/",controller.addWebServer);
router.get('/' ,controller.getWebservers);
router.get("/:url",controller.getWebServerById);
router.get('/history/:url', controller.getWebServerHistory);
router.put("/:url",controller.updateWebServer);
router.delete("/:url",controller.removeWebServer);

module.exports=router;