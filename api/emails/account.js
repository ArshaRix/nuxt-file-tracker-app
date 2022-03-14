const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_KEY)

const sendWelcomeEmail = (email, firstname) => {
    sgMail.send({
        to: email,
        from: 'r.jericho0586@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the Chronoa Project, ${firstname}. Let me know how you get along with the app.`
    })
}

const sendFileRequest = (stundentEmail, document, action) => {
    sgMail.send({
        to: stundentEmail,
        from: 'r.jericho0586@gmail.com',
        subject: `File Requested: ${document}.`,
        text: `Status: ${action}. Check system request page to see the full status.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendFileRequest
}