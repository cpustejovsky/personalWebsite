/*
    nodemailer logic similar to that used in estuary project.
    export function
    twitterBot will call twitterMailer at a set time which will be handled in app.js
*/

const bot = require("./bot.js");

// bot.likeAndRetweet("FluffyHookers");

let nameAndTweets = {
    name: "",
    tweets: []
}

bot.getTwitterData("FluffyHookers", 4)
    .then((data) => {
        nameAndTweets.name = data[0].user.name;
        for (let i = 0; i < data.length; i++) {
            nameAndTweets.tweets.push(data[i].full_text)
        }
        console.log(nameAndTweets)
    })
    .catch((err) => {
        throw err
    })