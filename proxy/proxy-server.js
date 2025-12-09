const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/signin", async (req, res) => {
    try {
        const resp = await axios.post(
            "https://api-node.themesbrand.website/auth/signin",
            req.body
        );
        res.json(resp.data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Proxy Server Error" });
    }
});

app.listen(5000, () => console.log("Proxy running on port 5000"));
