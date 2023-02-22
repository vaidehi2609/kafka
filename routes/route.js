const router = require('express').Router()
var { sendMessageToQueue } = require("../services/producer.js");
var {consumeMessage} = require('../services/consumer.js')

router.post('/sendMessage',async(req,res,next)=>{
    try {
        await sendMessageToQueue(req.body)
        res.send('MESSAGE SENT')
    } catch (error) {
        next(error)
    }

})

router.get('/getMessage',async(req,res,next)=>{
    try {
        await consumeMessage()
        res.send('MESSAGE RECIEVED')
    } catch (error) {
        next(error)
    }

})


module.exports = router