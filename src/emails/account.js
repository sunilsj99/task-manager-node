const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rpspjjjj@gmail.com',
        subject: 'Thanks for Joining In',
        html: `<h3>Welcome to the app, ${name}.<br><strong>Create some Tasks and manage them.</strong>  <h3>`
    })
}

const sendByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rpspjjjj@gmail.com',
        subject: 'Thanks for Joining In',
        html: `<h3>Thanks for using our Service, ${name}.
        <br><strong>Maybe We could have served you more.<br>Best of luck for future</strong>  <h3>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendByeEmail
}