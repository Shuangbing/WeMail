module.exports = app => {
    const router = require('express').Router()
    const mongoose = require('mongoose')
    const Mails = mongoose.model('Mail')

    router.get('/recive', async function (req, res) {
        const mails = await Mails.find();
        res.send(mails);
    });
    
    router.get('/recive/:id', async function (req, res) {
        const mail = await Mails.findById(req.params.id)
        res.send(mail);
    });
    
    app.use('/api', router)
}