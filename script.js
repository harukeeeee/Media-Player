const playButton = document.querySelector(".button-play-image");
const backButton = document.querySelector(".button-back");
const nextButton = document.querySelector(".button-next");
const songImage = document.querySelector(".song-image");

const song = new Audio();
song.src = "resources/music/saluki-song.mp3";

let id = 0;
const allSongs = [
  "resources/music/saluki-song.mp3",
  "resources/music/redbone-song.mp3",
  "resources/music/lady-song.mp3",
];
const allSongsImages = [
  "resources/images/saluki-image.jpeg",
  "resources/images/redbone-image.png",
  "resources/images/lady-image.jpeg",
];

playButton.addEventListener("click", function () {
  if (song.paused === true) {
    song.play();
    playButton.src = "resources/buttons/stop-button.png";
  } else {
    song.pause();
    playButton.src = "resources/buttons/play-button.png";
  }
});

function songChange() {
  song.src = allSongs[id];
  songImage.src = allSongsImages[id];
  song.play();
  playButton.src = "resources/buttons/stop-button.png";
}

nextButton.addEventListener("click", function () {
  id++;
  songChange();
});

backButton.addEventListener("click", function () {
  id--;
  songChange();
});
