window.onload = function() {
    document.getElementById("my_audio").play();
}
document.addEventListener("DOMContentLoaded", function () {
const images = [
    'url(/images/backgroundimage6.jpg)',
    'url(/images/backgroundimage5.jpg)',
    'url(/images/Backgroundimage3.jpg)',
    'url(/images/backgroundimage2.jpg)',
    'url(/images/Backgroundimage1.jpg)',
    'url(/images/Backgroundimage0.jpg)'
];

const randomImage = images[Math.floor(Math.random() * images.length)];
document.getElementById('back').style.backgroundImage = randomImage;
});