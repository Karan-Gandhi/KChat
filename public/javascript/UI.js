var recents;

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
    
    createEmojiDropdown(table, "emojis");
}

function createEmojiDropdown(table, div) {
    var i = 0;
    table.forEach(e => {
        var a = 0;
        var row = document.createElement('tr');
        var Rrow = document.createElement('tr');
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
                recents.unshift(event.target.innerHTML);
                createERDropdown(recents, "recents");
                console.log(recents);
            });
            a++;
            i++;
        }
        document.getElementById(div).append(row);
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

setTimeout(() => {
    document.getElementById("ab2").classList.toggle('active');
    document.getElementById("all").addEventListener("click", (e) => {
        if(document.getElementById("ab1").classList.contains('active')) {
            document.getElementById("ab1").classList.toggle('active');
            document.getElementById("ab2").classList.toggle('active');
            var all = document.getElementById('emojis');
            var recent = document.getElementById('recents');
            all.style.opacity = "1";
            recent.style.opacity = "0";
            recent.style.zIndex = "-1";            
            all.style.zIndex = "1";            
        }
    });

    document.getElementById("recent").addEventListener("click", (e) => {
        if(document.getElementById("ab2").classList.contains('active')) {
            document.getElementById("ab2").classList.toggle('active');
            document.getElementById("ab1").classList.toggle('active');
            var all = document.getElementById('emojis');
            var recent = document.getElementById('recents');
            all.style.opacity = "0";
            recent.style.opacity = "1";
            all.style.zIndex = "-1";            
            recent.style.zIndex = "1";            
        }
    });
}, 2000);

function createRecentList() {
    if (localStorage.getItem("recent_emojis") === null) {
        recents = [];
    } else {
        recents = localStorage.getItem("recent_emojis");
    }
}

createRecentList();

function createERDropdown(array, div) {
    var table = document.getElementById('recents');
    var cnt = 0;

    var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
    var duplicates = findDuplicates(recents);
    
    for (var i = 0; i < duplicates.length; i++) {
        recents.splice(recents.indexOf(duplicates[i]), 1);
    }

    if (recents.length > 64) {
        recents.splice(0, recents.length - 64)
    }

    localStorage.setItem("recent_emojis", recents);

    for (var i = 0; i < table.rows.length; i++) {
        for (var x = 0; x < table.rows[i].cells.length; x++) {
            if (array[cnt] === undefined) {
                return;
            }
            table.rows[i].cells[x].innerHTML = array[cnt];
            table.rows[i].cells[x].addEventListener('click', (event) => {
                document.getElementById('message').value += event.target.innerHTML;
                recents.unshift(event.target.innerHTML);
                createERDropdown(recents, "recents");
            });
            cnt++;
        }
    }
}

// update recent list
setInterval(() => {
    // document.getElementById("recents").innerHTML = "";
    // console.log("s");
}, 33);