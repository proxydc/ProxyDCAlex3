const { Router } = require("express");
const controller = require("./controllerAccount");
const controllerDC = require("./controllerDC");
const router =  Router();
router.post("/account", controller.getAuthentification);
router.get("/account", controller.getAccounts);
router.post("/account/add", controller.addAccount);
router.get("/account/:id", controller.getAccountById);
router.put("/account/:id", controller.updateAccount);
router.delete("/account/:id", controller.deleteAccountById);


router.get("/dc", controllerDC.getDCs);
router.post("/dc/add", controllerDC.addDC);
router.get("/dc/:id", controllerDC.getDCById);
router.put("/dc/:id", controllerDC.updateDC);
router.delete("/dc/:id", controllerDC.deleteDCById);

module.exports = router;