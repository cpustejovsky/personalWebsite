/*
    nodemailer logic similar to that used in estuary project.
    export function
    twitterBot will call twitterMailer at a set time which will be handled in app.js
*/

const bot = require("./bot.js");

// bot.likeAndRetweet("FluffyHookers");

let tweetData = []

// bot.getSpecificTweets("CCPustejovsky", "Republicans")
//     .then((data)=> {
//         console.log(data);
//         for (let i = 0; i < data.tweets.length; i++) {
//             console.log(data.tweets[i].content)
//         }
//     });

// bot.test()
//     .then((data) => {
//         // console.log(data)
//         console.log(data[0].id)
//         console.log(data[0].id_str)
//         bot.likeTest(data[0].id_str);
//     });
bot.getTwitterData("FluffyHookers", 4)
    .then((data) => {
        bot.like(data)
        tweetData.push(data);
    })
    .catch((err) => {
        throw err
    });
//     .then(() => {
//         bot.getTwitterData("Elpidophoros", 8)
//             .then((data) => {
//                 bot.like(data)
//                 bot.retweet(data)
//                 tweetData.push(data)
//             })
//             .then(() => {
//                 console.log(tweetData)
//                 console.log(tweetData[0].tweets)
//                 console.log(tweetData[1].tweets)
//             })
//             .catch((err) => {
//                 throw err
//             })
//     });
