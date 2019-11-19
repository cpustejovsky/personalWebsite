require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");

//TODO: create object with name/username and an array of tweets; push tweets that have been liked and retweeted into array

function verifyEngTweet(tweet) {
    for (let j = 0; j < tweet.full_text.length; j++) {
        if (tweet.full_text.charCodeAt(j) >= 945 && tweet.full_text.charCodeAt(j) <= 1023) {
            return false;
        }
    }
    return tweet
}

module.exports = {
    getTwitterData(screenName, count) {
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
                    let tweetData = {
                        name: data[0].user.name,
                        screenName: data[0].user.screen_name,
                        tweets: []
                    };
                    for (let i = 0; i < data.length; i++) {
                        if (verifyEngTweet(data[i])) {
                            tweetData.tweets.push({
                                content: data[i].full_text,
                                id: data[i].id_str
                            });
                        }
                    }
                    resolve(tweetData);
                }
            })
        })
    }
    ,
    like(tweetData) {
        let T = new Twitter(config);

        const params = {
            screen_name: tweetData.screenName,
            count: tweetData.tweets.length,
            tweet_mode: 'extended'
        }
        for (let i = 0; i < tweetData.tweets.length; i++) {
            let id = {id: tweetData.tweets[i].id}
            T.post(`favorites/create/`, id,function (err, response) {
                if (err) console.log(
                    `${err[0].message}\n`+
                    `${tweetData.tweets[i].content} found at: `+
                    `https://twitter.com/${tweetData.screenName}/status/${tweetData.tweets[i].id}\n`
                );
                else {
                    console.log('Favorited: ', `https://twitter.com/${tweetData.screenName}/status/${tweetData.tweets[i].id}`)
                }
            })
        }
    },
    retweet(tweetData) {
        let T = new Twitter(config);

        const params = {
            screen_name: tweetData.screenName,
            count: tweetData.tweets.length,
            tweet_mode: 'extended'
        };
        for (let i = 0; i < tweetData.tweets.length; i++) {
            let id = {id: tweetData.tweets[i].id}
            T.post(`statuses/retweet/${id.id}`, function (err, response) {
                if (err) console.log(
                    `${err[0].message}\n`+
                    `${tweetData.tweets[i].content} found at: `+
                    `https://twitter.com/${tweetData.screenName}/status/${tweetData.tweets[i].id}\n`
                );
                else {
                    console.log('Rewtweeted: ', `https://twitter.com/${response.user.screen_name}/status/${id.id}`)
                }
            })
        }
    },
    test() {
        const params = {
            screen_name: "CCPustejovsky",
            count: 1,
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
}
;