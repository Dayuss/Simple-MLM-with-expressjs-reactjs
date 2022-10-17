const route = require('express').Router();
const memberService = require('../services/memberService');


route.post('/register', 
    async (req, res, next) => {
    try{
        let data = await memberService.registerMember(req.body);
        return res.status(200).json({
            status: 0,
            ... data,
        });
    }catch(e){
        next(e)
    }
});

route.post('/network/move', 
    async (req, res, next) => {
    try{
        let data = await memberService.moveParent(req.body);
        return res.status(200).json({
            status: 0,
            ... data,
        });
    }catch(e){
        next(e)
    }
});

route.get('/', 
    async (req, res, next) => {
    try{
        let data = await memberService.getList();
        return res.status(200).json({
            status: 0,
            ... data,
        });
    }catch(e){
        next(e)
    }
});

route.get('/get', 
    async (req, res, next) => {
    try{
        let data = await memberService.getListMember();
        return res.status(200).json({
            status: 0,
            ... data,
        });
    }catch(e){
        next(e)
    }
});
module.exports = route;
