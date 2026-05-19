var express = require('express');
const { getFeeds, createFeed } = require('../controller/feed.controller');
var router = express.Router();


router.get('/', getFeeds);

router.post('/', createFeed);

module.exports = router;
