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

function matchQeury(tweet, query) {
    let tweetWords = tweet.full_text.split(" ")
    for (let i = 0; i < tweetWords.length; i++) {
        if (tweetWords[i].toUpperCase() === query.toUpperCase()) {
            return tweet;
        }
    }
}

module.exports = {
    async getTwitterData(screenName, count) {
        const params = {
            screen_name: screenName,
            count: count,
            tweet_mode: 'extended'
        };

        let T = new Twitter(config);
        try {
            let data = await T.get("/statuses/user_timeline", params);
            let tweetData = {
                name: data[0].user.name,
                screenName: data[0].user.screen_name,
                tweets: []
            };
            for (let i = 0; i < data.length; i++) {
                if (verifyEngTweet(data[i])) {
                    tweetData.tweets.push({
                        content: data[i].full_text,
                        id: data[i].id_str,
                        url: `https://twitter.com/${tweetData.screenName}/status/${data[i].id_str}`,
                        liked: false,
                        retweeted: false
                    });
                }
            }
            return (tweetData);
        } catch (e) {
            console.log(e);
        }
    },
    async like(tweet) {
        try {
            let T = new Twitter(config);
            let id = {id: tweet.id};
            await T.post(`favorites/create/`, id);
            tweet.liked = true;
            return tweet;
        } catch (err) {
            if (err[0].message === "You have already favorited this status.") {
                tweet.liked = true;
                return tweet;
            }
            else {
                tweet.liked = err[0].message;
                return tweet;
            }
        }

    },
    async retweet(tweet) {
        try {
            let T = new Twitter(config);
            let id = {id: tweet.id};
            let response = await  T.post(`statuses/retweet/${id.id}`);
            return (`Rewtweeted: https://twitter.com/${response.user.screen_name}/status/${id.id}`)
        } catch (err) {
            return (err[0].message)
        }
    },
    async search(screenName, query) {
        const params = {
            screen_name: screenName,
            count: 50,
            tweet_mode: 'extended'
        };
        let T = new Twitter(config);
        try {
            let tweets = await T.get("/statuses/user_timeline", params);
            let tweetData = {
                name: tweets[0].user.name,
                screenName: tweets[0].user.screen_name,
                tweets: []
            };
            for (let i = 0; i < tweets.length; i++) {
                if (matchQeury(tweets[i], query)) {
                    tweetData.tweets.push({
                        content: tweets[i].full_text,
                        id: tweets[i].id_str
                    });
                }
            }
            return tweetData;
        } catch (err) {
            console.log(err);
        }
    }
}
;