var users = [];

function User() {
	this.userID = User.counter++;
	this.username;
	this.password;
}

User.counter = 0;

User.prototype.login = function() {
	$("#loginInterface").hide();
	$("#newuserInterface").hide();
	$("#loggedInInterface").show();
	$("#username").html(this.username + "!");
	$("#loggedInInterface").data("user", this);
}

User.prototype.newaccount = function(un, pw) {
	this.username = un;
	this.password = pw;
	
	users.push(this);
}



User.prototype.serialize = function() {
	
} 