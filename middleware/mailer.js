require("dotenv").config({path: "../.env"});
const bot = require("cpustejovsky-twitter-bot");
const moment = require("moment");
const nodemailer = require("nodemailer");

//TODO: Add in cron functionality and run at same time as my notes and the dynoWaker

async function emailTweets(emailAddress, data) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PW
        }
    });
    let tweetContent = `<h1>${data.name}'s Tweets</h1>\n`;
    tweetContent += `<h3>Tweets from ${data.screenName}</h3>`;
    tweetContent += `<ul>`;
    data.tweets.forEach((tweet) => {
        tweetContent += `<li>${tweet.content}</li>`;
    });
    tweetContent += `</ul>`;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"NodeJS Application" donotreply@estuary.com',
        to: emailAddress,
        subject: `Tweets from ${data.name}`,
        html: tweetContent
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

//TODO: set this up as a cronjob for wife and archbishop

function tweetEmailUpdate(screenName, count, email) {
    bot.getTwitterData(screenName, count)
        .then(async (data) => {
            let likedTweets = await bot.like(data);
            let retweetedTweets = await bot.retweet(likedTweets);
            console.log(retweetedTweets);
            await emailTweets(email, retweetedTweets);
        });
};

const cronEmailUpdate = () => {
    let now = moment();
    if (now.hours() === 13 && (now.minutes() <= 15 || now.minutes() >= 16) && now.format("A") === "PM") {
        tweetEmailUpdate("FluffyHookers", 10, "charles.pustejovsky@gmail.com");
        tweetEmailUpdate("Elpidophoros", 10, "charles.pustejovsky@gmail.com");
    } else {
        console.log(`${now.hours()}:${now.minute()} ${now.format("A")}`)
        setTimeout(cronEmailUpdate, 1000 * 60);
    }
};

module.exports = cronEmailUpdate;