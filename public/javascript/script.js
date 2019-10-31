function getStarted() {
    location.href = "login.html";
}

window.onload = onloader();

function onloader() {
    console.log("loading..");
    setTimeout(loaderFadeOut, 3000);
}

function loaderFadeOut() {
    console.log("loaded");
    document.getElementById('loader').style.opacity = "0";
    document.getElementById('loader').style.zIndex = "-1";
}