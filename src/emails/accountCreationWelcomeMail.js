
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = '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'

sgMail.setApiKey(SENDGRID_API_KEY)


const sendWelcomeEmail= (email ,name)=>{

    const msg = {
        to: email, 
        from: 'muhammed.goudataha@gmail.com', 
        subject: 'Welcome To The App',
        text: `Welcome ${name} to our App`
      }

    sgMail
  .send(msg)
  .then(() => {
   // console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}


module.exports = {
    sendWelcomeEmail
}