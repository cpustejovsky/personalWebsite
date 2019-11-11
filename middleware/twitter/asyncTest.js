require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");

async function asyncTwitterTest() {
    let T = new Twitter(config);


    const params = {
        screen_name: "FluffyHookers",
        count: 4,
        tweet_mode: 'extended'
    };

    let tweetArray = [];

    let data = await T.get("/statuses/user_timeline", params, (err, data, response) => {
        if (err) throw err;
        else {
            return data;
        }

    })
}

asyncTwitterTest()
    .then((data) => console.log(data))
    .catch((err) => {
        throw err
    })
