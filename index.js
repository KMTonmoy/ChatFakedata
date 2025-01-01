const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8000;

app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
    })
);

app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://tonmoyahamed2009:chatapp@cluster0.c0je1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        console.log("Connected to MongoDB");

        const couponsCollection = client.db("test").collection("messages");


        app.get("/allMessages", async (req, res) => {
            const coupons = await couponsCollection.find().toArray();
            res.send(coupons);
        });


        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } finally {
        process.on("SIGINT", async () => { });
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("ChatIng is sitting");
});