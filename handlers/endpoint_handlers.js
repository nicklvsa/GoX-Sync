const { four0Four, generalError, generalResponse } = require('./error_endpoint_handlers');
const GoxCache = require('../models/Goxcache');
const express = require('express');
const router = express.Router();

exports.start = (port) => {
    console.log(`Backend started on port ${port}.`);
};

router.get('/', (req, res) => {
    console.error('404 not found!');
    return res.status(404).json(four0Four());
});

router.post('/sync', async (req, res) => {
    const apiKey = req.headers.authorization || '';
    if (apiKey.length <= 0 || apiKey === '' || apiKey === undefined) {
        return res.status(403).json(generalError('Request missing Authorization header!', 403));
    }

    const cacheID = req.body.cache_id;
    const cacheName = req.body.cache_name;
    const cacheData = req.body.cache_data;
    const cacheExpiration = req.body.cache_expiration;

    console.log(`Cache syncing: ${cacheID} with name "${cacheName}" using key: "${apiKey}"`);
    
    try {
        const findCache = await GoxCache.findOne({
            id: cacheID,
            name: cacheName,
            key: apiKey,
        });

        if (findCache.length <= 0) {
            const cache = new GoxCache({
                id: cacheID,
                name: cacheName,
                key: apiKey,
                data: cacheData,
                expiration: cacheExpiration,
            });
            const addCache = await cache.save();
            console.log(`Cachced Added: ${addCache}`);
            return res.status(201).json(generalResponse('New cache created', 201));
        } else {
            const newData = {...findCache.data, ...cacheData};
            const newExpiration = {...findCache.expiration, ...cacheExpiration};
            console.log(newData);
            findCache.data = newData;
            findCache.expiration = newExpiration;
            findCache.save();
            return res.status(200).json(generalResponse(findCache, 200));
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(generalError('An error occurred while attempting cache add / search.', 500));
    }
});

router.post('/delete', async (req, res) => {
    const apiKey = req.headers.authorization || '';
    if (apiKey.length <= 0 || apiKey === '' || apiKey === undefined) {
        return res.status(403).json(generalError('Request missing Authorization header!', 403));
    }

    const cacheID = req.body.cache_id;
    const cacheName = req.body.cache_name;
    const items = req.body.items;

    try {

        const findCache = await GoxCache.findOne({
            id: cacheID,
            name: cacheName,
            key: apiKey,
        });

        if (findCache.length > 0) {
            console.log(items);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json(generalError('An error occurred while attempting cache add / search.', 500));
    }
});

router.post('/get', (req, res) => {
    const apiKey = req.headers['Authorization'];
    if (apiKey.length <= 0 || apiKey === '') {
        return res.status(403).json(generalError('Request missing Authorization header!', 403));
    }
});

exports.router = router;