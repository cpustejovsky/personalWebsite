/*
    nodemailer logic similar to that used in estuary project.
    export function
    twitterBot will call twitterMailer at a set time which will be handled in app.js
*/

const bot = require("./bot.js");

let completeTweets = []

// bot.search("CCPustejovsky", "advocate")
//     .then((data)=> {
//         console.log(data);
//     });

bot.getTwitterData("CCPustejovsky", 2)
    .then(async (data)=> {
        for (let i = 0; i < data.tweets.length; i++) {
            let likedTweet = await bot.like(data.tweets[i])
            completeTweets.push(likedTweet);
        }
        console.log(completeTweets)
    });

