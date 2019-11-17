var udata = "";
var emailVerified
socket = io.connect(document.location.href.replace("/user.html", "/"));

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
            emailVerified = firebase.auth().currentUser.emailVerified;
        }

        var user = firebase.auth().currentUser;
        if (!emailVerified) {
            var verification_page = document.createElement('div');
            verification_page.id = 'verification_page';
            verification_page.innerHTML = `<div class="evic"><img class="evi" src="https://www.mailerlite.com/assets/integration/mailercheck-icon.png"></div><div class="evth">Almost there</div><div class="evt">An Email has been sent to your inbox for verification</div>`;
            document.body.append(verification_page);
            sendEmailVerification();
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
setTimeout(onload, 3300);
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
    input = document.getElementById("chat-search").value;    
    for (var i = 0; i < userEU.length; i++) {
        var txtValue = userEU[i].Name;
        if (txtValue.toUpperCase().indexOf(input.toUpperCase()) > -1) {
            userDOM[i].style.display = "";
        } else {
            userDOM[i].style.display = "none";
        }
    }
}

function sendEmailVerification() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
        // Email sent.
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
}