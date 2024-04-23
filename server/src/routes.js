const { Router } = require('express') ;

const router = Router();
const controller = require('./controller');

router.post("/insert",controller.addWebServer);
router.get('/' ,controller.getWebservers);
router.get("/get",controller.getWebServerById);
router.get('/history', controller.getWebServerHistory);
router.put("/update",controller.updateWebServer);
router.delete("/remove",controller.removeWebServer);

module.exports=router;