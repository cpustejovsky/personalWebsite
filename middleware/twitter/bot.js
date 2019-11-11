require("dotenv").config();
const Twitter = require("twitter");
const config = require("./config");

//TODO: create object with name/username and an array of tweets; push tweets that have been liked and retweeted into array


module.exports = {
    likeAndRetweet(username) {
        let T = new Twitter(config);

        function verifyEngTweet(tweet) {
            for (let j = 0; j < tweet.full_text.length; j++) {
                if (tweet.full_text.charCodeAt(j) >= 945 && tweet.full_text.charCodeAt(j) <= 1023) {
                    return false;
                }
                return tweet
            }
        }

        const params = {
            screen_name: username,
            count: 4,
            tweet_mode: 'extended'
        };
        console.log(T.options.consumer_key)
        T.get("/statuses/user_timeline", params, (err, data, response) => {
            if (err) throw err;
            for (var i = 0; i < data.length; i++) {
                //verify that tweet is in English
                let tweet = verifyEngTweet(data[i]);
                if (tweet) {
                    console.log(data[i].full_text);                // Get the tweet Id from the returned data
                    // let id = {id: data[i].id_str};
                    // T.post('favorites/create', id, function (err, response) {
                    //     if (err) throw err;
                    //     else {
                    //         console.log('Favorited: ', `https://twitter.com/${response.user.screen_name}/status/${id.id}`)
                    //         T.post(`statuses/retweet/${id.id}`, function (err, response) {
                    //             if (err) throw err;
                    //             else {
                    //                 console.log('Rewtweeted: ', `https://twitter.com/${response.user.screen_name}/status/${id.id}`)
                    //             }
                    //         })
                    //     }
                    // });
                }
            }
        });
    }
};