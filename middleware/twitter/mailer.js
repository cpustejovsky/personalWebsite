require("dotenv").config();
const bot = require("./bot.js");
const nodemailer = require("nodemailer");
console.log(bot("FluffyHookers"))

// async function emailTweets() {
//
//     let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL,
//             pass: process.env.EMAIL_PW
//         }
//     });
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         from: '"Cpustejovsky Twitter Bot" donotreply@cpustejovsky.com',
//         to: "charles.pustejovsky@gmail.com",
//         subject: `Tweets from Bishop and Bunners`,
//         html: "Test test!!!!"
//     });
// }
//  emailTweets();