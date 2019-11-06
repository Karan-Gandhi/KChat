var name, email, password; 

function login() {
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;

	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
				
		var err = document.getElementById('error');
		var errtxt = document.getElementById('errtxt');
		var body = document.getElementById('login_form');
		var shift = document.getElementById('register');
		var logintxt = document.getElementById('logintxt');
		var cnt = document.getElementById('cnt');

		err.style.display = "block";
		err.style.color = "#bf360c";

		errtxt.innerHTML = "Username or Password is incorrect.";
		console.log(errorMessage);
		
		
		shift.style.marginTop = '10px'
		
		logintxt.style.position = "relative";
		logintxt.style.top = "-40px";
		
		cnt.style.top = "100px";
	
		if (screen.width > 900) {
			body.style.height = "450px";
		}
	});

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			document.location.href = "user.html";
		} else {
			// No user is signed in.
		}
	});
}

async function register() {
	name = document.getElementById("uname").value;
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;
	var confirm_password = document.getElementById("confirm_password").value;

	sessionStorage.setItem("name", name);
	sessionStorage.setItem("email", email);
	sessionStorage.setItem("password", password);

	if (password === confirm_password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(async function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			var err = document.getElementById('error');
			var errtxt = document.getElementById('errtxt');
			var body = document.getElementById('resister_form');
			var shift = document.getElementById('register');
			var logintxt = document.getElementById('logintxt');
			var cnt = document.getElementById('cnt');

			err.style.display = "block";
			err.style.color = "#bf360c";

			errtxt.innerHTML = errorMessage;
			
			shift.style.marginTop = '10px'
			
			logintxt.style.position = "relative";
			logintxt.style.top = "-40px";
			
			cnt.style.top = "100px";
		
			if (screen.width > 900) {
				body.style.height = "580px";
			}
		});
		// console.log("hello");


			setTimeout(registerUserInDatabase, 3000);
			setTimeout(checkForAlreadyLoggedInUsers, 5000);
		
			// await firebase.auth().onAuthStateChanged(function(user) {
			// 	if (user) {
			// 		// User is signed in.
			// 		document.location.href = "user.html";
			// 	} else {
			// 		// No user is signed in.
			// 	}
			// });
		// } else {
		// 	console.log("hmm");
			
		// }
	}
}

async function createData() {

}

function checkForAlreadyLoggedInUsers() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			document.location.href = "user.html";
		} else {
			// No user is signed in.
		}
	});
}

async function registerUserInDatabase() {
	var user = await firebase.auth().currentUser;
		
	// if (user != null) {
	var uid = user.uid;

	await firebase.database().ref('users/' + uid).set({
			Name : name,
			Email : email,
			Password : password,
			Status: "Hey, I am using KChat",
	});
}

// setTimeout(checkForAlreadyLoggedInUsers, 20000);