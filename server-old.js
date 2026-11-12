const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "AURORA Backend Connected!",
        status: "Online"
    });
});

app.listen(PORT, () => {
    console.log(`AURORA running at http://localhost:${PORT}`);
});