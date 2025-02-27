const ser1 = require('../service/service1');

const Hello = async (req, res) => {
    return res = ser1.Hello(req, res);
};
const getapifile = async (req, res) => {
    return res = ser1.getapifile(req, res);
};

const method1 = async (req, res) => {
    return res = ser1.method1(req, res);
};
const filefromuuid = async (req, res) => {
    return res = ser1.filefromuuid(req, res);
};




module.exports = {
    Hello
    ,getapifile
    ,method1
    ,filefromuuid
};
