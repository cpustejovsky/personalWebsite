/*
    nodemailer logic similar to that used in estuary project.
    export function
    twitterBot will call twitterMailer at a set time which will be handled in app.js
*/

const bot = require("./bot.js");

let tweetData = []

bot.getSpecificTweets("CCPustejovsky", "advocate")
    .then((data)=> {
        console.log(data);
    });

bot.getTwitterData("CCPustejovsky", 5)
    .then((data)=> {
        for (let i = 0; i < data.tweets.length; i++) {
            console.log(data.tweets[i].content)
        }
    });

