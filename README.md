# Bargain-Hunter
Telerik Academy Team Project

Requirements: https://github.com/TelerikAcademy/Node.js-Course/tree/master/Teamwork

## Initial Project Description
### Models
#### User
	* _id - auto-generated from db 
	* username - required
	* usernameLowered - ?
	* password - required
	* token - auto-generated
	* votes - type number ?
	* offers - array of offers created by user
	* favourites - array of offers watched by user ?
	* comments ?
	* isAdmin - type Boolean ?
	* city - optional
	* firstName - optional
	* lastName - optional
	* age - optional
	* phone - optional
	* email - optional
#### Offer/Ad or something similar
	* title - required
	* description - required
	* price - required, minValue = 0
	* datePublished - required
	* category - required ?
	* active - type Boolean
	* user - creator
	* image - optional
	* comments
	* expirationDate ?
#### Comment ?
	* user
	* offer
	* date


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
