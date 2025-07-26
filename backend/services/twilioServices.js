//backend/services/twilioServices

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendVerificationCode = async (phoneNumber, code) => {
  try {
    const message = await client.messages
      .create({
        body: `Your verification code is: ${code}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      });
    console.log(`Verification code sent to ${phoneNumber}`);
  } catch (error) {
    console.error(error);
  }
};

export { sendVerificationCode };