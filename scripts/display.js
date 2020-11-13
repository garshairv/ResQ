let navStart = '<nav class="navbar navbar-expand-lg navbar-dark nav-bg">'
	+ '<a class="navbar-brand" href="index.html">ResQ</a>'
	+ '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02">'
	+ '<span class="navbar-toggler-icon"></span></button>'
	+ '<div class="collapse navbar-collapse" id="navbarTogglerDemo02">'
	+ '<ul class="navbar-nav ml-auto">';

let navEnd = '</ul></div></nav>';

let noLoginNav = navStart
	+ '<li class="nav-item"><a class="nav-link" href="login.html">Login/Signup</a></li>'
	+ '<li class="nav-item"><a class="nav-link" href="main.html">QR Scanner</a></li>'
	+ '<li class="nav-item"><a class="nav-link" href="#">Settings</a></li>'
	+ navEnd;

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		let loginNav = navStart
			+ '<li class="nav-item"><a class="nav-link" href="login.html">Signed in as ' + user.displayName + '</a></li>'
			+ '<li class="nav-item"><a class="nav-link" href="main.html">QR Scanner</a></li>'
			+ '<li class="nav-item"><a class="nav-link" href="#">Settings</a></li>'
			+ '<li class="nav-item"><a class="nav-link" href="#">Settings</a></li>'
			+ navEnd;

		$("nav").remove()
		$(document.body).prepend(loginNav);
	} else {
		// User is signed out.
		$("nav").remove();
		$(document.body).prepend(noLoginNav);
	}
});