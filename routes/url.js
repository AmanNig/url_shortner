const express = require('express');
const { generateNewSortUrl } = require('../controller/url');

const router = express.Router();

router.post("/", generateNewSortUrl)

module.exports = router