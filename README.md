# Bargain-Hunter
Telerik Academy Team Project

Requirements: https://github.com/TelerikAcademy/Node.js-Course/tree/master/Teamwork

## Project Description
    * Bargain Hunter is a place where consumers can sell items to other consumers and buy from them. 
    * Registered users can post advertisments and leave comments to other people ads. 
    * Visitors can only read the advertisments.

### Routes

* **/users/register** - GET, POST
* **/users/login** - GET, POST
* **/users/logout** - POST
* **/users/profile** - GET, POST
* **admin/users**
* **admin/users/edit/:id** - GET, POST
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
* ...	

### UI
* Bootstrap
