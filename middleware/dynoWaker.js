const fetch = require("node-fetch");
const moment = require("moment");

const dynoWaker = () => {
    let now = moment();
    if (now.hours() === 6 && now.minutes() === 0 && now.format("A") === "AM") {
        fetch("https://cpustejovsky-estuary.herokuapp.com/")
    } else {
        setTimeout(dynoWaker, 1000 * 30);
    }
}

module.exports = dynoWaker;