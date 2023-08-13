const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD, META_HOST } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_HOST,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const emailSender = async (data) => {
  const { META_HOST } = process.env;
  const email = { ...data, from: META_HOST };
  await transporter.sendMail(email);
  return true;
};

module.exports = emailSender;
