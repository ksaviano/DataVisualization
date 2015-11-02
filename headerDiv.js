function readyHeaderDiv() {
	console.log("mainDiv load: readyHeaderDiv()");
	var holddiv = $("#newuserInterface");		//	used to check if newaccountBtn is avaialble for click
		holddiv.data("UNcheck", false);
		holddiv.data("PWcheck", false);

	$("#loginBtn").click(function(evt) {
console.log("Login Button clicked.");
		var un = $("#unBox").val();
		var pw = $("#pwBox").val();
		var usersarray = users;
		if(un != undefined) {			
			for(var i = 0; i < usersarray.length; i++) {
				if(usersarray[i].username == un && usersarray[i].password == pw) {
					var loggedinUser = usersarray[i];
					loggedinUser.login();
					return loggedinUser;
				} else {
			}
		}
		alert("Username and password combination not found.");
		$("#unBox").val("");
		$("#pwBox").val("");
		}
	});
	
	$("#newuserBtn").click(function(evt) {
console.log("New User Button clicked.");
		$("#newuserInterface").show();
		$("#loginBtn").hide();
		$("#newuserBtn").hide();
		$("#confirmLbl").show();
		$("#confirmBox").show();
		$("#newaccountBtn").show();
		$("#backBtn").show();
		$("#newaccountBtn").activate = false;
	});
	
	$("#backBtn").click(function(evt) {
console.log("Back Button clicked.");
		$("#newuserInterface").hide();
		$("#loginBtn").show();
		$("#newuserBtn").show();
		$("#confirmLbl").hide();
		$("#confirmBox").hide();
		$("#newaccountBtn").hide();
		$("#backBtn").hide();		
		$("#unBox").val("");
		$("#unBox").css("border", "");
		$("#pwBox").val("");
		$("#pwBox").css("border", "");
	});
	
	$("#unBox").blur(function(evt) {
		$("#unBox").css("border", "");
		if($("#confirmBox").is(":visible")) {
			var un = $("#unBox").val();
			for(var i = 0; i < users.length; i++) {
				if(un == users[i].username) {
					$("#unBox").css("border", "red solid 2px");
					alert("Username is already taken, please select another");
					$("#newuserInterface").data("UNcheck", false);
					break;
				} else {
					$("#unBox").css("border", "green solid 2px");
					$("#newuserInterface").data("UNcheck", true);
				}
			}
		}
	});

	$("#confirmBox").keyup(function(evt) {
		var c = evt.target.value;
		var orig = $("#pwBox").val();
		if(c.length > 3 && c.length <= orig.length) {
			$("#confirmBox").css("border", "yellow solid 2px");
			var osub = orig.substring(0, c.length);
			if(c == osub) {
				if(c.length == orig.length) {
					$("#pwBox").css("border", "green solid 2px");
					$("#confirmBox").css("border", "green solid 2px");
					holddiv.data("PWcheck", true);
				} else {
				}
			} else {
				$("#confirmBox").css("border", "red solid 2px");
				holddiv.data("PWcheck", false);
			}
		} 
	});
	
	$("#newaccountBtn").click(function(evt) {
console.log("New Account Button clicked.")
		var unchk = holddiv.data("UNcheck");
		var pwchk = holddiv.data("PWcheck");

		if(unchk == true && pwchk == true) {
			var newuser = new User(); 
			newuser.newaccount($("#unBox").val(), $("#pwBox").val());
			users.push(newuser);
			$("#loginBtn").click();
		} else {
			alert("Please complete username and password fields.");
		}
	});
	
	function fortesting() {
		$("#unBox").val("ksaviano")
		$("#pwBox").val("password");
		$("#loginBtn").click();
	}
	
	fortesting();
	
}	//	end of document ready



