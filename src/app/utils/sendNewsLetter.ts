const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "anik.mysoftheaven@gmail.com",
        pass: "yiidkxoukiqsnqax",
    },
});

export const sendNewsLetterEmail = async (to: string, message: string) => {
    await transporter.sendMail({
        from: "anik.mysoftheaven@gmail.com", // sender address
        to: to, // list of receivers
        subject: "News letter from next bazaar", // Subject line
        text: "", // plain text body
        html: `
        
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Newsletter</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #003366;
      color: #ffffff;
      text-align: center;
      padding: 20px 10px;
    }
    .header img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-bottom: 10px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .header p {
      font-size: 14px;
      margin: 5px 0 0;
    }
    .content {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .content h2 {
      color: #003366;
      margin-top: 0;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #003366;
      color: #ffffff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
    }
    .button:hover {
      background-color: #00509e;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 15px 10px;
      font-size: 12px;
      color: #666666;
    }
    .footer a {
      color: #003366;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <img src="https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg" alt="Logo">
      <h1>Stay Informed</h1>
      <p>Your monthly insights delivered directly to your inbox</p>
    </div>

    <!-- Content -->
    <div class="content">
      ${message}
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>You’re receiving this email because you subscribed to our newsletter.
      <p>&copy; 2025 NextBazaar. All rights reserved.</p>
    </div>
  </div>
</body>
</html>

        `
    });
};
