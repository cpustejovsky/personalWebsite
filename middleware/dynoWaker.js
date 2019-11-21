const fetch = require("node-fetch");
const moment = require("moment");

const dynoWaker = () => {
    let now = moment();
    if (now.hours() === 6 && (now.minutes() <= 0 || now.minutes() >= 2) && now.format("A") === "AM") {
        fetch("https://cpustejovsky-estuary.herokuapp.com/")
    } else {
        setTimeout(dynoWaker, 1000 * 60);
    }
}

module.exports = dynoWaker;