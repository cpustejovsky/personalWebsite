require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");



function getTwitterData(screenName, count) {

    const params = {
        screen_name: screenName,
        count: count,
        tweet_mode: 'extended'
    };

    let T = new Twitter(config);
    return new Promise(resolve => {
        T.get("/statuses/user_timeline", params, (err, data, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })

}

// async function twitterTest() {
//
//     const params = {
//         screen_name: "FluffyHookers",
//         count: 4,
//         tweet_mode: 'extended'
//     };
//
//     const data = await getTwitterData(params);
//     return data;
// }

let nameAndTweets = {
    name: "",
    tweets: []
}

getTwitterData("FluffyHookers", 4)
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
