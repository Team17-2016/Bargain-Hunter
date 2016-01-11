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
    let ad = new Ad(req.body);

    //TODO:Test
    console.log(req.body);

    ad.save(function(err) {
        if(err) {
            next(err);
        } else {
            res.statusCode(200).json({
                result: {
                    message: 'Advertisement successfully added!'
                }
            });
        }
    });
}

function removeAdvertisementById(req, res, next) {
    let id = req.params.id;

    if(!id) {
        res.statusCode(404).json({
            result: {
                message: 'ID must be provided for an advertisement to be removed.'
            }
        });
    } else {
        Ad.findByIdAndRemove(id, function(err, advertisement){
            if(err) {
                next(err);
                return;
            }

            if(!advertisement) {
                res.statusCode(404).json({
                    result: {
                        message: 'Advertisement with id: ' + advertisement.id + ' has not been found.'
                    }
                })
            } else {
                res.statusCode(200).json({
                    result: {
                        message: 'Advertisement with id: ' + advertisement.id + ' successfully removed.'
                    }
                });
            }
        })
    }
}

module.exports = {
    getAllAdsByFilter: getAllAds,
    getAdvertisementById: getAdById,
    postAdvertisement: postAdvertisement,
    removeAdvertisement: removeAdvertisementById
};
