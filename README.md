# Bargain-Hunter
Telerik Academy Team Project

Requirements: https://github.com/TelerikAcademy/Node.js-Course/tree/master/Teamwork

## Initial Project Description
### Models
#### User
	* _id - auto-generated from db 
	* username - String required
	* password - String required
	* token - String auto-generated
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

* **api/users/register**
	* GET - register form
	* POST - register user
* **api/users/login**
	* GET - login form
	* POST - login user	
* **api/users/logout** 	
	* POST - to delete token ?
* **api/users/profile**
	* GET - personal user info
	* POST/PUT - update profile
* **api/users**
	* GET - all, without details
* **api/users/:id**
	* GET - user details
	

### UI
* Bootstrap?

#### Feel free to make changes and add suggestions :)
