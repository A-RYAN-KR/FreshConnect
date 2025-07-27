const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter using your Gmail account
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `"FreshConnect" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html, // You can also include an HTML version
  };

  // 3. Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    // Throw an error to be caught by the calling controller
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;