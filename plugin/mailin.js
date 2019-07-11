module.exports = app => {

    const mongoose = require('mongoose')
    const mailin = require('mailin')
    const Mails = mongoose.model('Mail')
    const Address = mongoose.model('Address')
    const Domain = mongoose.model('Domain')

    mailin.start({
        host: '0.0.0.0',
        port: 25,
        disableWebhook: true
    })

    mailin.on('message', async (connection, data, content) => {
        const to_address = data.to.pop().address.split('@')
        const to_domain = to_address.pop()
        const to_path = to_address.pop()
        const domain = await Domain.findOne({
            domain: to_domain
        })
        if(domain == null) return false
        const address = await Address.findOne({
            domain: domain._id,
            path: to_path
        })
        if(address == null) return false
        await Mails.create({
            address: address._id,
            from_address: data.from.pop().address,
            to_address: to_path+'@'+to_domain,
            subject: data.headers.subject,
            html: data.html,
            text: data.text
        })
    })
}