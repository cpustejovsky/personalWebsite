require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");


const params = {
    screen_name: "CCPustejovsky",
    count: 4,
    tweet_mode: 'extended'
};

let T = new Twitter(config);

async function getTweets() {
    let tweets = await T.get("/statuses/user_timeline", params)
    return tweets;

}

getTweets()
    .then((spam) => {
        for (let i = 0; i < spam.length; i++) {
            console.log(spam[i].full_text)
        }
    })
    .catch((err)=> console.log(err))



