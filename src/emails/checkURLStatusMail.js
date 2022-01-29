
const sgMail = require('@sendgrid/mail')

const SENDGRID_API_KEY = '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'

sgMail.setApiKey(SENDGRID_API_KEY)


const sendCheckUrlStatusEmail= (email ,name ,  checkName , url , status)=>{

    const msg = {
        to: email, 
        from: 'muhammed.goudataha@gmail.com', 
        subject: `${checkName} Check Notification`,
        text: `Hello  ${name}, thanks to note that the  ${url} is currently ${status}`
      }

    sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}


module.exports = {
    sendCheckUrlStatusEmail
}