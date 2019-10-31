function createHedder() {
    var uid;
    firebase.database().ref("users").once("value").then(data => {
        if (firebase.auth().currentUser != null) {
			uid = firebase.auth().currentUser.uid;
	
			firebase.auth().onAuthStateChanged(function(user) {
				if (user) {
					// User is signed in.
				} else {
					// No user is signed in.
				}
			});
        }
        var namearray = Object.values(data.val()[uid]["Name"]);
        var finalname = "";

        for (i = 0; i <= namearray.length - 1; i++) {
            if (i == 0) {
                finalname += namearray[i].toUpperCase();
                document.getElementById('avatar_txt').innerHTML = namearray[i].toUpperCase();
            } else {
                finalname += namearray[i];
            }
        }

        document.getElementById("name").innerHTML = finalname;
    });
}

function dropdown() {
    var dpdn = document.getElementById('dropdown');
    // dpdn.style.right = "0";
    if (dpdn.style.right !== "0px") {
        dpdn.style.right = "0px";
    } else {
        dpdn.style.right = "-300px";
    }
}

// function createChatList() {
//     firebase.database().ref("users").once("value").then(data => {
//         const keys = Object.keys(data.val());

//         for (var i = 0; i < keys.length; i++) {
//             if (firebase.auth().currentUser != null) {
//                 uid = firebase.auth().currentUser.uid;
                
//                 if (uid === keys[i]) {
//                     keys.splice(i);
//                 }
//             }
//             // console.log(keys);
//         }
//         for (var i = 0; i < keys.length; i++) {
//             // console.log(Object.values(data.val()[keys[i]]["Name"]));
//         }
//     });
// }

function createMessage(message) {
    mess = document.createElement("div");
    mess.innerHTML = message;
    mess.id = "message";
    document.getElementById("chatRoom").append(mess);
}