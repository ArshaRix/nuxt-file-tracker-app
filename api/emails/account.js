const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendWelcomeEmail = (email, firstname) => {
    sgMail.send({
        to: email,
        from: 'r.jericho0586@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Chronoa Project, ${firstname}.`
    })
}

module.exports = {
    sendWelcomeEmail,
}