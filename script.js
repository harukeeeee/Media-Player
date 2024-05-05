const playButton = document.querySelector(".button-play-image");
const backButton = document.querySelector(".button-back");
const nextButton = document.querySelector(".button-next");
const songImage = document.querySelector(".song-image");
const songName = document.querySelector(".song-name");
const authorName = document.querySelector(".author-name");
const currentTimeNode = document.querySelector(".current-time");
const durationSongNode = document.querySelector(".duration-song");

const song = new Audio();
song.src = "resources/music/saluki-song.mp3";

let id = 0;

const songsList = [
  {
    song: "resources/music/saluki-song.mp3",
    songImage: "resources/images/saluki-image.jpeg",
    songName: "ВЫЛЕЧИМ",
    songAuthor: "Saluki",
    color: "rgba(252, 252, 252, 0.178)",
    duration: "2:59",
  },
  {
    song: "resources/music/redbone-song.mp3",
    songImage: "resources/images/redbone-image.png",
    songName: "Redbone",
    songAuthor: "Childish Gambino",
    color: "rgba(0, 132, 255, 0.178)",
    duration: "5:27",
  },
  {
    song: "resources/music/lady-song.mp3",
    songImage: "resources/images/lady-image.jpeg",
    songName: "Lady",
    songAuthor: "Modjo",
    color: "rgba(255, 238, 0, 0.178)",
    duration: "4:41",
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
  songImage.style = `box-shadow: 0 0 100px ${songsList[id].color}`;
  durationSongNode.innerHTML = songsList[id].duration;
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

function formatingTime(time) {
  let s = Math.floor(time % 60);
  return Math.floor(time / 60) + ":" + (s < 10 ? "0" + s : s);
}

song.ontimeupdate = function () {
  currentTimeNode.innerHTML = formatingTime(song.currentTime);
};
