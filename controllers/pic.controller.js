const express = require('express');
const picService = require('../sevices/pic.service');
const picRouter = express.Router();

const { resHandler } = require('../middlewares/middlewares');

// fetch gallery
picRouter.get('/', async (req, res, next) => {
    try {
        const picsRes = await picService.fetchPics();
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

module.exports = picRouter;