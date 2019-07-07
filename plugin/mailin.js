module.exports = app => {
    const mailin = require('mailin')
    mailin.start({
        host: '0.0.0.0',
        port: 25,
        disableWebhook: true
    })
    
    mailin.on('error', function(err) {
        console.error(err.stack);
    })
    
    mailin.on('message', async function (connection, data, content) {
        console.log('Get new Mail');
        const mail = await Mails.create({
            from_address: data.from.pop().address,
            to_address: data.to.pop().address,
            subject: data.headers.subject,
            html: data.html,
            text: data.text
        })
        console.log(mail);
    })
}