import nodemailer from 'nodemailer';

// async...await is not allowed in global scope, must use a wrapper

const sendEmail = async function(email, subject, massage){
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport
    ({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,  // true for 465 , false for other ports 

        auth:{
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PAASSWORD,
        },

    });

    // SEND MAIL WITH DEFINED TRANSPORT OBJECT 

    await transporter.sendEmail({
        from: process.env.SMTP_FROM_EMAIL, 
        TO: email,
        subject: subject,
        html: massage,
    })
}

export default sendEmail;