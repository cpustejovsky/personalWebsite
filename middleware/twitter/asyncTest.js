require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");

function asyncTwitterTest() {
    let T = new Twitter(config);


    const params = {
        screen_name: "FluffyHookers",
        count: 4,
        tweet_mode: 'extended'
    };

    let tweetArray = [];

    return new Promise((resolve, reject) => {
        T.get("/statuses/user_timeline", params, (err, data, response) => {
            if (err) reject(err);
            resolve(data)
        })

    })
}

asyncTwitterTest()
    .then((data)=> console.log(data))
