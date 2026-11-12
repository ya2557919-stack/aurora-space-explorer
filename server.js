
require("dotenv").config();

const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// Supabase connection
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY
);

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

app.get("/api/supabase-test", (req, res) => {
    res.json({
        success: true,
        message: "Supabase client initialized!",
        connected: true
    });
});


app.get("/api/videos", async (req, res) => {
    const { data, error } = await supabase
        .from("video")
        .select("*");

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json(data);
});


app.listen(PORT, () => {
    console.log(`AURORA running at http://localhost:${PORT}`);
    console.log("Supabase client initialized!");
});
