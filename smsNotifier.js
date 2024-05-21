const twilio = require('twilio');

// Initialize Twilio client with your account SID and auth token
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendSMSNotification = async (phoneNumber, message) => {
  try {
    // Use Twilio's messages.create() method to send an SMS
    const response = await client.messages.create({
      body: message,
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER // Your Twilio phone number
    });
    
    console.log(`SMS sent to ${phoneNumber}: ${response.sid}`);
  } catch (error) {
    console.error(`Failed to send SMS to ${phoneNumber}: ${error.message}`);
  }
};

module.exports = sendSMSNotification;
