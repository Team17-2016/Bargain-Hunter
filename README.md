# Bargain-Hunter
Telerik Academy Team Project

Requirements: https://github.com/TelerikAcademy/Node.js-Course/tree/master/Teamwork

## Initial Project Description
### Models
#### User
	* _id - auto-generated from db 
	* username - String required
	* password - String required
	* rating- { votesCount: Number, votesSum: Number } => Average rating can be saved in a virtual property calculated by the formula (AverageRating = votesSum/votesCount)
	* offers - array of offers created by the user
	* favourites - array of offers watched by the user (?good to have?)
	* isAdmin - Boolean required
	* city - String optional
	* firstName - String optional
	* lastName - String optional
	* age - Number optional
	* phone - String optional
	* email - String optional
#### Offer/Ad or something similar
	* title - String required
	* description - String required
	* price - Number required, minValue = 0
	* datePublished - Date required
	* category - String required
	* active - Boolean required
	* user - creator
	* image - optional
	* comments - array of comments for the current Ad
	* expirationDate - Date required
#### Comment ?
	* user - the username of the User that wrote the comment - String required
	* text - String required
	* date - Date required


### Server routes

* **/users/register - done**
	* GET - register form
	* POST - register user
* **/users/login - done**
	* GET - login form
	* POST - login user	
* **/users/logout** 	
	* POST
* **/users/profile**
	* GET - personal user info
	* PUT - update profile
* **/users**
	* GET - all, without details
* **/users/:id**
	* GET - user details
* **/ads/**
	* GET - all ads with brief description
* **/ads/:id**
	* GET - single ad with detailed description
* **/ads/**
	* POST - add new Advertisement
* **/ads/:id**
	* DELETE - delete Advertisement by id
* **/ads/comment/:id**
	* POST- add new comment to an Advertisement
	

### UI
* Bootstrap
 
### TODO
* bower should be used for client side
* js (Angular) for the logout to be fully working
* ...

#### Feel free to make changes and add suggestions :)

#### Sample request for ads/ POST: 
{
    "title": "New Castle for sale",
    "description":"A castle build for the royal family of England",
    "category": "Real estates",
    "price": 9991200,
    "isActive": true,
    "owner": "INKolev",
    "imagePath": "http://www.stton.co.uk/pict/produits/2_20150304271523.jpg",
    "comments" : [{
        "author" : "INKolev",
        "content" : "Hey that house looks really good, if the offer is still active, I would like to arrange a meeting. Here is my phone number => +3598824124, call me anytime"
    }]
}
