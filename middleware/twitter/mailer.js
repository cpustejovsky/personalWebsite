const bot = require("./bot.js");
const nodemailer = require("nodemailer");
require("dotenv").config();
//TODO: Try and move these functions in bot.js
//TODO: Add in cron functionality and run at same time as my notes and the dynoWaker
async function likeAndRetweet(tweetData) {
    let completeTweets = [];
    for (let i = 0; i < tweetData.tweets.length; i++) {
        let liked = await bot.like(tweetData.tweets[i]);
        let retweeted = await bot.retweet(liked);
        completeTweets.push(retweeted);
    }
    tweetData.tweets = completeTweets;
    return tweetData;
}

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
    data.tweets.forEach((tweet)=>{
        tweetContent += `<li>${tweet.content}</li>`;
    });
    tweetContent += `</ul>`;
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"NodeJS Application" donotreply@estuary.com',
        to: emailAddress,
        subject: "Testing!",
        html: tweetContent
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

bot.getTwitterData("CCPustejovsky", 2)
    .then(async (data) => {
        let likedAndRetweeted = await likeAndRetweet(data);
        console.log(likedAndRetweeted)
        emailTweets("cpustejovsky@bitpay.com", likedAndRetweeted);
    });
