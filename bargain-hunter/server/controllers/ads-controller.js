'use strict';

let mongoose = require('mongoose'),
    Ad = mongoose.model('Ad'),
    Comment = mongoose.model('Comment');

const DEFAULT_ADS_FILTER_OPTIONS = {isActive: true};

function getAllAds(req, res, next) {
    let filterOptions = req.body.filterOptions || DEFAULT_ADS_FILTER_OPTIONS;

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

        res.status(201).json(advertisements);

        //res.status(201).render('ads', advertisements);
    })
}

function getAdvertisementById(req, res, next) {
    let id = req.params.id;

    Ad.findById(id, function(err, advertisement) {
        if(err) {
            next(err);
            return;
        }

        if(!advertisement) {
            res.status(404).json({
                result: {
                    message: 'Advertisement with the provided ID does not exist.'
                }
            });

            return;
        }

        res.status(201).json(advertisement);
        //res.status(201).render('advertisement-details', advertisement)
    });
}

function postAdvertisement(req, res, next) {
    let ad = new Ad(req.body);

    ad.save(function(err) {
        if(err) {
            console.log('Error posting ad');
            next(err);
        } else {
            res.status(200).json({
                result: {
                    message: 'Advertisement successfully added!',
                    id: ad.id
                }
            });
        }
    });
}

function removeAdvertisementById(req, res, next) {
    let id = req.params.id;

    // TODO: Get current user and match if he is the owner of the advertisement marked for removal.
    // TODO: Temporary fix is to expose the Remove button in the UI only for the users that match the username of the owner

    if(!id) {
        res.status(404).json({
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
                res.status(404).json({
                    result: {
                        message: 'Advertisement with the provided ID does not exist.'
                    }
                })
            } else {
                res.status(200).json({
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
    getAdvertisementById: getAdvertisementById,
    postAdvertisement: postAdvertisement,
    removeAdvertisement: removeAdvertisementById
};