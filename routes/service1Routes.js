const express = require('express');
const router = express.Router();
const ctr_ser1 = require('../controllers/service1Controller');
// const authenticateJWT = require('../middlewares/authenticateJWT'); // นำเข้ามิดเดิลแวร์


// router.use(authenticateJWT); // ใช้ middleware กับทุกเส้นทางใน router นี้
router.get('/Hello', ctr_ser1.Hello);
router.get('/getapifile', ctr_ser1.getapifile);
router.post('/method1', ctr_ser1.method1);
router.get('/file/:uuid', ctr_ser1.filefromuuid);



module.exports = router;