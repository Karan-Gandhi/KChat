var udata = "";

function onload() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
            document.location.href = "login.html"
        }
    });
    socket = io.connect('http://localhost:3000');
    firebase.database().ref("users").once("value").then(data => {
        var uid;
        if (firebase.auth().currentUser != null) {
			uid = firebase.auth().currentUser.uid;
        }
        udata = {
            uid: uid,
            name: Object.values(data.val()[uid]["Name"]),
            uname: Object.values(data.val()[uid]["Email"]),
            password: Object.values(data.val()[uid]["Password"]),
        }
        eud();
        socket.on("join", (data) => {
            console.log(merge(data) + " joined");
            
        });
    });
    
    // setTimeout(2000, () => eud());
    
    console.log(udata);
    
}

function merge(namearray) {
    var finalname = "";

    for (i = 0; i <= namearray.length - 1; i++) {
        if (i == 0) {
            finalname += namearray[i].toUpperCase();
            document.getElementById('avatar_txt').innerHTML = namearray[i].toUpperCase();
        } else {
           finalname += namearray[i];
        }
    }
    return finalname;
}

function eud() {
    socket.emit('start', udata);
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        document.location.href = "login.html"
    }).catch(function(error) {
        // An error happened.
    });
}

// function getUserDetails() {
//     var name = sessionStorage.getItem("name");
//     var email = sessionStorage.getItem("email");
//     var password = sessionStorage.getItem("password");
//     console.log(name, email, password);
// }

// setTimeout(getUserDetails, 3000);
setTimeout(createHedder, 3000);
setTimeout(onload, 3000);
setTimeout(createChatList, 3000);