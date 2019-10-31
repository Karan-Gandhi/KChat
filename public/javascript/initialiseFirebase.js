async function setFirebaseConfig() {
                
    var config = `/getFirebaseData`;
    var response = await fetch(config);
    firebaseConfig = await response.json();

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
}

setFirebaseConfig();