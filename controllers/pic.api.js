const express = require('express');
const picService = require('../sevices/pic.service');
const picRouter = express.Router();

const { resHandler, validateQueryParams } = require('../middlewares/middlewares');

// fetch pics
picRouter.get('/', validateQueryParams, async (req, res, next) => {
    try {
        const picsRes = await picService.fetchPics(req.query);
        resHandler(picsRes, req, res);
    } catch (e) {
        next(e);
    }
});

// get pic by id
picRouter.get('/:id', async (req, res, next) => {
    try {
        const pic = await picService.fetchPicById(req.params.id);
        resHandler(pic, req, res);
    } catch (e) {
        next(e);
    }
});

// get pic details by id
picRouter.get('/:id/details', async (req, res, next) => {
    try {
        const pic = await picService.fetchPicById(req.params.id, 'resolution picWeight');
        resHandler(pic, req, res);
    } catch (e) {
        next(e);
    }
});

module.exports = picRouter;