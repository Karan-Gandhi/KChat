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

function toFUpperCase(namearray) {
    var finalname = "";
    for (i = 0; i <= namearray.length - 1; i++) {
        if (i == 0) {
            finalname += namearray[i].toUpperCase();
            // document.getElementById('avatar_txt').innerHTML = namearray[i].toUpperCase();
        } else {
           finalname += namearray[i];
        }
    }
    return finalname;
}

var users;
var userDOM = [];
var userEU = [];

function createRegisteredUsersList() {
    var colours = [{bgc: "#3F51B5", c: "white"}, {bgc: "#B71C1C", c: "white"}, {bgc: "#0D47A1", c: "white"}, {bgc: "#1B5E20", c: "white"}, {bgc: "#F57F17", c: "white"}, {bgc: "#cacdd1", c: "black"}]
    firebase.database().ref("users").once("value").then(data => {
        var users_keys = Object.keys(data.val());
        users = Object.values(data.val());
        users.forEach(user => {
            if (user.Email !== udata.email) {
                userEU.push(user);
                var list_item = document.createElement('div');
                list_item.innerHTML = `<div class="t">${toFUpperCase(user.Name)}</div>`;
                list_item.id = "uli";
                var i = colours[Math.floor(Math.random() * colours.length)];
                var avatar = `<div id="avatar-t" class="avatar" style="background-color: ${i.bgc}; color: ${i.c};"><div id="avatar_txt">${user.Name[0].toUpperCase()}</div></div>`
                list_item.innerHTML += avatar;
                list_item.innerHTML += `<div class="c-txt">${user.Status}</div><div class="c-date">${"00:00"}</div>`;
                document.getElementById('chat-list').append(list_item);
                userDOM.push(list_item);
                list_item.addEventListener("click", (e) => {
                    e.preventDefault();
                    console.log(user);
                    var activebar = document.getElementById("activeUserHead");
                    activebar.innerHTML = `<div id="avatar-a" class="avatar" style="background-color: ${i.bgc}; color: ${i.c};"><div id="avatar_txt">${user.Name[0].toUpperCase()}</div></div><div class="active-headder-name-text">${toFUpperCase(user.Name)}</div><div class="active-headder-status-text">${user.Status}</div>`;                    
                });
            }
        });
    });
}

function createMessage(message) {
    mess = document.createElement("div");
    mess.innerHTML = message;
    mess.id = "message";
    document.getElementById("chatRoom").append(mess);
}

function createYourMessage(message) {
    mess = document.createElement("div");
    mess.innerHTML = message;
    mess.align = "left";
    mess.id = "your-message";
    document.getElementById("chatRoom").append(mess);
}   

async function getEmojiCodeFormCSV() {
    const response = await fetch('emoji.csv');
    const data = await response.text();
                                
    const table = await data.split(/\n/);
    
    createEmojiDropdown(table);
}

function createEmojiDropdown(table) {
    var i = 0;
    table.forEach(e => {
        var a = 0;
        var row = document.createElement('tr');
        row.id = "e-row"
        while (a < 8) {
            var cols = "&#" + table[i];
            if (table[i] == undefined) {
                return;
            }
            var cell = document.createElement('td');
            cell.id = "e-cell";
            cell.innerHTML = cols;
            row.append(cell);
            cell.addEventListener('click', (event) => {
                document.getElementById('message').value += event.target.innerHTML;
            });
            a++;
            i++;
        }
        document.getElementById('emojis').append(row);
    });    
}

getEmojiCodeFormCSV();

function closeETab() {
    var emoji = document.getElementById('emojis-container');
    emoji.style.display = "none";
}

function openEmojiTab() {
    var emoji = document.getElementById('emojis-container');
    if (emoji.style.display === "none") {
        emoji.style.display = "block";
    } else if (emoji.style.display === "block") {
        emoji.style.display = "none";
    } else {
        emoji.style.display = "block";
    }
}