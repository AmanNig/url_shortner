const express = require("express");
const { connectToMongoDB } = require("./connectDB");
const urlRouter = require("./routes/url");
require("dotenv").config();

const Url = require("./model/url");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

connectToMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/shorten", urlRouter);

app.get("/:shortID", async (req, res) => {
    try {
        const shortId = req.params.shortID; 
        console.log("shortId", shortId) // Ensure case matches the schema
        const entry = await Url.findOneAndUpdate(
            { shortUrl: shortId },  // Ensure the field name matches the schema
            {
                $push: {
                    visitHistory: {
                        timestamp: new Date(),
                    },
                },
            },
            { new: true } // Ensure it returns the updated document
        );

        console.log("entry", entry)
        
        if (!entry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        console.log("entry.redirectUrl", entry.redirectUrl)
        
        res.status(200).json(entry.redirectUrl);
        
    } catch (error) {
        console.error("Error in redirect:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
