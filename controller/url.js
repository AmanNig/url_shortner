const shortid = require("shortid"); // ✅ CommonJS import
const Url = require("../model/url");

async function generateNewSortUrl(req, res) {
    try {
        console.log("body", req.body);

        const body = req.body;
        if (!body.Url) {
            return res.status(400).json({ error: "Url is required" });
        }

        const shortId = shortid()

        const url = await Url.create({ 
            redirectUrl: body.Url, 
            shortUrl: shortId, 
            visitHistory: [] 
        });

        res.status(200).json({ id: url });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to generate short URL" });
    }
}

module.exports = { generateNewSortUrl };
