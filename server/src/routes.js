const { Router } = require('express') ;

const router = Router();
const controller = require('./controller');

router.post("/insert",controller.addWebServer);
router.get('/' ,controller.getWebservers);
router.get("/get/:url",controller.getWebServerById);
router.get('/history/:url', controller.getWebServerHistory);
router.put("/update/:url",controller.updateWebServer);
router.delete("/remove/:url",controller.removeWebServer);

module.exports=router;