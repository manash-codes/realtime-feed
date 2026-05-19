const Feed = require("../model/feed.model");
const { getIO } = require("../config/socket");
const { deleteCache, getCache, setCache } = require("../utils/cache");
const { KEYS } = require("../constants/cache");

const FEEDKEY = KEYS.FEED;

async function createFeed(req, res) {
    try {
        const { title, content, author } = req.body;

        const newFeed = new Feed({ title, content, author });
        await newFeed.save();

        await deleteCache(FEEDKEY);

        // Emit the new feed to all connected clients
        getIO().emit('newFeed', newFeed);

        return res.status(201).json({ success: true, message: 'Feed created successfully', feed: newFeed });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error creating feed', error: error.message });
    }
}

async function getFeeds(req, res) {
    try {
        const cache = await getCache(FEEDKEY);
        if (cache) {
            return res.status(200).json({ success: true, message: 'Feeds fetched successfully', feeds: cache });
        }
        const feeds = await Feed.find().sort({ createdAt: -1 });

        await setCache(FEEDKEY, feeds, 60);

        return res.status(200).json({ success: true, message: 'Feeds fetched successfully', feeds: feeds });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error fetching feeds', error: error.message });
    }
}

module.exports = { createFeed, getFeeds };
