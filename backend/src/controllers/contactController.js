const sendEmail = require('../utils/sendEmail');

// This function handles the POST request to /api/contact
exports.handleContactForm = async (req, res) => {
  try {
    // 1. Get the data from the request body (sent from React/Postman)
    const { name, email, message } = req.body;

    // 2. Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a name, email, and message.',
      });
    }

    // 3. Prepare the email content
    const subject = `Vendor Complaint`;
    const textContent = `Attachements/Content Below -
    
Name: ${name}
Email: ${email}
Message:
${message}
    `;

    // 4. Send the email to your admin address
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: textContent,
    });

    // 5. Send a success response back to the client
    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });

  } catch (error) {
    console.error('Error in contact form handler:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
    });
  }
};