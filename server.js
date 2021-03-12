require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;
const host = "http://localhost";

app.use(express.static("public"));

const getJSON = (start, size, filter = false) => {
    let { key, contactName, messages } = require(process.env.JSON_PATH);
    if (start == undefined) {
        start = Math.floor(Math.random() * (messages.length - 50));
    }
    if (size == undefined) {
        size = 50;
    }

    start = Number(start);
    size = Number(size);
    console.log(
        `getting ${filter ? "filtered" : ""} messages from index ${start} to ${
            start + size
        }`
    );
    if (filter) {
        let filteredMessages = [];
        let i;
        for (i = start; filteredMessages.length < size; i++) {
            if (messages[i].type != "text" || messages[i].text != "") {
                filteredMessages.push(messages[i]);
            }
        }
        console.log(`After filtering sending messages ${start} - ${i}`);
        return { key, contactName, messages: filteredMessages };
    }
    return { key, contactName, messages: messages.slice(start, start + size) };
};

// app.get("/", (req, res) => {
//     res.sendFile("./public/chat.html", { root: __dirname });
// });

app.get("/messages", (req, res) => {
    // `${host}:${port}/messages?start=${start}&size=${size}&filter=${1}`
    // returns array of size `size` containing messages from index `start`
    // with empty messages filtered out. filter = anything except one will
    // return unfiltered messages.

    console.log(req.query);
    let { start, size, filter } = req.query;
    // console.log("here", start, size, filter);
    let json = getJSON(start, size, filter == 1 ? true : false);
    res.json(json);
    // console.log(`key => ${key}`);
    // console.log(`contactName => ${contactName}`);
    // console.log(`messages => ${messages}`, messages.length);
});

app.listen(port, () => {
    console.log(`app listening at ${host}:${port}`);
});
