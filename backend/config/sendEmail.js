const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,

    to: email,

    subject: "Increnity Email Verification",

    html: `
      <div style="
        font-family: Arial;
        padding: 30px;
      ">

        <h2>Verify Your Email</h2>

        <p>
          Your OTP verification code is:
        </p>

        <h1 style="
          letter-spacing: 6px;
          color: #7c3aed;
        ">
          ${otp}
        </h1>

        <p>
          This OTP expires in 10 minutes.
        </p>

      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;