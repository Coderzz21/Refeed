const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, message) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log(`SMS sent successfully: ${result.sid}`);
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('SMS Error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = sendSMS;