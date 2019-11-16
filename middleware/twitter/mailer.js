/*
    nodemailer logic similar to that used in estuary project.
    export function
    twitterBot will call twitterMailer at a set time which will be handled in app.js
*/

const bot = require("./bot.js");

// bot.likeAndRetweet("FluffyHookers");

let tweetData = []

// bot.getResponseData("FluffyHookers")
//     .then((data)=>{console.log(data)})
bot.test()
bot.getTwitterData("FluffyHookers", 4)
    .then((data) => {
        bot.like(data)
        bot.retweet(data)
        .then(()=>{
            tweetData.push(data);
            console.log(tweetData)
            console.log(tweetData[0].tweets)
        })
    })
    .catch((err) => {
        throw err
    });
// .then(() => {
//     bot.getTwitterData("Elpidophoros", 8)
//         .then((data) => {
//             tweetData.push(data)
//         })
//         .then(() => {
//             console.log(tweetData)
//             console.log(tweetData[0].tweets)
//             console.log(tweetData[1].tweets)
//         })
//         .then(())
//         .catch((err) => {
//             throw err
//         })
// })
