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
            email: merge(Object.values(data.val()[uid]["Email"])),
            password: merge(Object.values(data.val()[uid]["Password"])),
        }
        eud();
        socket.on("join", (data) => {
            console.log(data + " joined");
            createMessage(data + " joined");
            // udata.name = "you";
        });
    });
    
}

function merge(namearray) {
    var finalname = "";

    for (i = 0; i <= namearray.length - 1; i++) {
        if (i == 0) {
            finalname += namearray[i];
            document.getElementById('avatar_txt').innerHTML = namearray[i];
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
        console.log(error);
    });
}

setTimeout(createHedder, 3000);
setTimeout(onload, 3000);
setTimeout(createRegisteredUsersList, 3300);

function send_message() {
    var m = document.getElementById("message").value;
    var message = {
        body: m,
        sender: udata,
    }
    socket.emit('sendMessage', message);
    document.getElementById("message").value = "";
}

socket.on("getMessage", (data) => {
    if (data.sender.uid === udata.uid) {
        createYourMessage(`${"You"} : ${data.body}`);
    } else {
        createMessage(`${data.sender.name} : ${data.body}`);
    }
});

function searchForUsers() {
    // FIXME: other username shown even when specific username typed.
    input = document.getElementById("chat-search").value;
    console.log(input);
    userEU.forEach((user) => {
        if (udata.email !== user.Email) {
            // console.log(user);
            for(var i = 0; i < user.Name.length; i++) {
                if (input !== "") {
                    if (user.Name[i].toUpperCase() === input[0].toUpperCase()) {
                        console.log(userEU.indexOf(user));
                        console.log(userDOM[userEU.indexOf(user)]);
                        userDOM[userEU.indexOf(user)].style.display = "block";
                        break;
                    } else {
                        userDOM[userEU.indexOf(user)].style.display = "none";
                    }
                } else {
                    userDOM[userEU.indexOf(user)].style.display = "block";
                }
            }
        }
    });
    // console.log(userEU);
    
    // for (var i = 0; i < userEU.length; i++) {

    // }
}