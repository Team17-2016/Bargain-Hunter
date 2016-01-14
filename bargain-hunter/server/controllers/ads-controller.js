'use strict';

let mongoose = require('mongoose'),
    Ad = mongoose.model('Ad'),
    Comment = mongoose.model('Comment'),
    Owner = mongoose.model('Owner'),
    moment = require('moment');

const DEFAULT_ADS_FILTER_OPTIONS = {isActive: true};

function getAllAds(req, res, next) {
    let filterOptions = {};

    if(req.query.category) {
        filterOptions.category = req.query.category;
    }

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

        let isAuthorized = (req.user && req.user.isAdmin) || false;
        let data = {
            isAuthenticated: req.user,
            isAuthorized: isAuthorized,
            ads: advertisements
        };

        res.render('all-ads', data);
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

        let data = {
            isAuthenticated: req.user,
            ad: advertisement
        };

        console.log(data);
        res.status(201).render('ad-details', data)
    });
}

function postAdvertisement(req, res, next) {
    let owner = new Owner({
        username: req.user.username,
        rating: req.user.votesSum/req.user.votesCount
    });

    let formBody = req.body;
    formBody.owner = owner;
    formBody.price = parseFloat(formBody.price);

    let ad = new Ad(req.body);

    ad.save(function(err) {
        if(err) {
            console.log('Error posting ad');
            next(err);
        } else {
            res.status(200).redirect('ads/');
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

function commentAdvertisement(req, res, next) {
    let advertisementId = req.params.id;
    let commentBody = {
        author: req.user.username,
        content: req.body.comment,
        publishDate: moment().format('MMMM Do YYYY, h:mm:ss A')
    };

    let comment = new Comment(commentBody);

    let query = { _id: advertisementId };
    let update = {
        $push: {
            comments: comment
        }
    };

    let options = {};
    Ad.findOneAndUpdate(query, update, options, function(err, ad) {
        if(err) {
            res.status(404).json({
                result: {
                    message: 'Comment insertion failed.'
                }
            })
        }

        res.redirect('/ads/'+ad._id);
    });
}

function createAdvertisement(req,res, next) {
    let data = {
        isAuthenticated: req.user || false
    };

    res.render('post-advertisement', data);
}

function getCopy(advertisement) {
    var copy = {
        title: advertisement.title,
        description: advertisement.description,
        category: advertisement.category,
        price: advertisement.price,
        publishDate: advertisement.publishDate,
        expireDate: advertisement.expireDate,
        isActive: advertisement.isActive,
        owner: advertisement.owner,
        imageUrl: advertisement.imageUrl,
        comments: []
    };

    for(var i = 0; i< advertisement.comments.length; i++) {
        copy.comments[i].author = advertisement.comments[i].author;
        copy.comments[i].content = advertisement.comments[i].content;
        copy.comments[i].publishDate = advertisement.comments[i].publishDate;
    }

    return copy;
}

module.exports = {
    getAllAdsByFilter: getAllAds,
    getAdvertisementById: getAdvertisementById,
    postAdvertisement: postAdvertisement,
    removeAdvertisement: removeAdvertisementById,
    createAdvertisement: createAdvertisement,
    commentAdvertisement: commentAdvertisement
};