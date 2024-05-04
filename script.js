const playButton = document.querySelector(".button-play-image");
const backButton = document.querySelector(".button-back");
const nextButton = document.querySelector(".button-next");
const songImage = document.querySelector(".song-image");
const songName = document.querySelector(".song-name");
const authorName = document.querySelector(".author-name");

const song = new Audio();
song.src = "resources/music/saluki-song.mp3";

let id = 0;

const songsList = [
  {
    song: "resources/music/saluki-song.mp3",
    songImage: "resources/images/saluki-image.jpeg",
    songName: "ВЫЛЕЧИМ",
    songAuthor: "Saluki",
  },
  {
    song: "resources/music/redbone-song.mp3",
    songImage: "resources/images/redbone-image.png",
    songName: "Redbone",
    songAuthor: "Childish Gambino",
  },
  {
    song: "resources/music/lady-song.mp3",
    songImage: "resources/images/lady-image.jpeg",
    songName: "Lady",
    songAuthor: "Modjo",
  },
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
  song.src = songsList[id].song;
  songImage.src = songsList[id].songImage;
  songName.innerHTML = songsList[id].songName;
  authorName.innerHTML = songsList[id].songAuthor;
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
