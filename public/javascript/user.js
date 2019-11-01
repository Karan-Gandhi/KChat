var udata = "";
socket = io.connect('http://localhost:3000');

function onload() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
            document.location.href = "login.html"
        }
    });
    firebase.database().ref("users").once("value").then(data => {
        var uid;
        if (firebase.auth().currentUser != null) {
			uid = firebase.auth().currentUser.uid;
        }
        udata = {
            uid: uid,
            name: merge(Object.values(data.val()[uid]["Name"])),
            uname: merge(Object.values(data.val()[uid]["Email"])),
            password: merge(Object.values(data.val()[uid]["Password"])),
        }
        eud();
        socket.on("join", (data) => {
            console.log(udata.name + " joined");
            createMessage(udata.name + " joined");
            // udata.name = "you";
        });
    });
    
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

function send_message() {
    var m = document.getElementById("message").value;
    var message = {
        body: m,
        sender: udata.name,
    }
    socket.emit('sendMessage', message);
}
socket.on("getMessage", (data) => {
    if (data.sender === udata.name) {
        createMessage(`${"You"} : ${data.body}`);
    } else {
        createMessage(`${data.sender} : ${data.body}`);
    }
    // createMessage(`${data.sender} : ${data.body}`);
});