'use strict';

let mongoose = require('mongoose'),
    Ad = mongoose.model('Ad'),
    Comment = mongoose.model('Comment');

function getAllAds(req, res, next) {
    let filterOptions = req.body.filterOptions || {};

    Ad.find(filterOptions, function(err, advertisements) {
        if(err) {
            next(err);
            return;
        }

        if(!advertisements) {
            res.status(404).json({
                result: {
                    message: 'No advertisements found.'
                }
            });

            return;
        }

        res.status(201).render('ads', advertisements)
    })
}

function getAdById(req, res, next) {
    let id = req.params.id;

    Ad.find({id: id}, function(err, advertisement) {
        if(err) {
            next(err);
            return;
        }

        if(!advertisement) {
            res.statusCode(404).json({
                result: {
                    message: 'Advertisement with the provided ID does not exist.'
                }
            });

            return;
        }

        res.statusCode(201).render('advertisement-details', advertisement)
    });
}

function postAdvertisement(req, res, next) {
    let ad = new Ad()
}

module.exports = {
    getAllAdsByFilter: getAllAds,
    getAdvertisementById: getAdById,
    postAdvertisement: postAdvertisement,
    removeAdvertisement: removeAdvertisement
};
