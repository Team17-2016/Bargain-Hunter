'use strict';

let mongoose = require('mongoose');
let thirtyDaysInMilliseconds = 30*24*60*60*1000;

let OwnerSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
});

let CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        trim: true,
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    publishDate: {
        type: Date,
        default: new Date()
    }
});

let AdSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    publishDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    expireDate: {
        type: Date,
        required: true,
        default: function(){ return +new Date() + thirtyDaysInMilliseconds }
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    owner: OwnerSchema,
    imageUrl: {
        type: String,
        trim: true,
        default: 'https://git.reviewboard.kde.org/media/uploaded/files/2015/07/18/a70d8ab6-1bbf-4dcc-b11f-524c2f56b14a__picture_default_cover.jpg'
    },
    comments: [CommentSchema]
});

let Ad = mongoose.model('Ad', AdSchema);
let Comment = mongoose.model('Comment', CommentSchema);
let Owner = mongoose.model('Owner', OwnerSchema);

module.exports = function() {
    return {
        Ad: Ad,
        Comment: Comment,
        Owner: Owner
    }
};