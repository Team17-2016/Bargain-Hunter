'use strict';

let mongoose = require('mongoose');
let thirtyDaysInMilliseconds = 30*24*60*60*1000;

let CommentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

let AdSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
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
        default: Date.now
    },
    expireDate: {
        type: Date,
        required: true,
        default: function(){ return +new Date() + thirtyDaysInMilliseconds }
    },
    isActive: {
        type: Boolean,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    imagePath: {
        type: String
    },
    comments: [CommentSchema]
});

let Ad = mongoose.model('Ad', AdSchema);
let Comment = mongoose.model('Comment', CommentSchema);

module.exports = function() {
    return {
        Ad: Ad,
        Comment: Comment
    }
};