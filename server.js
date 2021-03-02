const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = "http://localhost";

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("./public/chat.html", { root: __dirname });
});

app.listen(port, () => {
    console.log(`app listening at ${host}:${port}`);
});
