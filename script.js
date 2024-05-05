const playButton = document.querySelector(".button-play-image"), // добавляем нужные элементы html
  backButton = document.querySelector(".button-back"),
  nextButton = document.querySelector(".button-next"),
  songImage = document.querySelector(".song-image"),
  songName = document.querySelector(".song-name"),
  authorName = document.querySelector(".author-name"),
  currentTimeNode = document.querySelector(".current-time"),
  durationSongNode = document.querySelector(".duration-song"),
  progressBarNode = document.querySelector(".input-song-range");

const song = new Audio(); // создаем элемент аудио для того чтобы с его помощью включать музыку
song.src = "resources/music/saluki-song.mp3"; // добавляем изначальный путь к песне которая будет изначально стоять
song.setAttribute("loop", true); // задаем атрибут loop со значением true, он добавляет повторение песни

let id = 0; // создаем переменную id для того чтобы по нему переключаться между песнями

const songsList = [
  // создаем список песен
  {
    song: "resources/music/saluki-song.mp3", // путь к файлу песни
    songImage: "resources/images/saluki-image.jpeg", // путь к обложке песни
    songName: "ВЫЛЕЧИМ", // название песни
    songAuthor: "Saluki", // исполнитель песни
    color: "rgba(252, 252, 252, 0.178)", // цвет подсветки обложки песни
    duration: "2:59", // длина трека
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
  // создаем функциб нажатия кнопки старт стоп
  if (song.paused === true) {
    // если песня остановлена
    song.play(); // включить песню
    playButton.src = "resources/buttons/stop-button.png"; // поменять картинку кнопки
  } else {
    // иначе
    song.pause(); // остановить песню
    playButton.src = "resources/buttons/play-button.png"; // поменять картинку кнопки обратно
  }
});

function songChange() {
  // функция переключения песни
  song.src = songsList[id].song; // меняем путь к песне через айди и список с объектами песен
  songImage.src = songsList[id].songImage; // меняем путь к обложке
  songName.innerHTML = songsList[id].songName; // меняем название песни
  authorName.innerHTML = songsList[id].songAuthor; // меняем имя автора
  songImage.style = `box-shadow: 0 0 100px ${songsList[id].color}`; // меняем цвет подсветки обложки
  durationSongNode.innerHTML = songsList[id].duration; // меняем текст длины песни
  song.play(); // включаем песню
  playButton.src = "resources/buttons/stop-button.png"; // меняем картинку кнопки
}

nextButton.addEventListener("click", function () {
  // функция переключения вперед
  if (id >= 2) {
    // если выбрана последняя песня
    id = 0; // поставить айди первой песни
  } else {
    // иначе
    id++; // айди больше на 1
  }
  songChange(); // обращаемся к функции для визуального изменения
});

backButton.addEventListener("click", function () {
  // функция переключения назад
  if (id <= 0) {
    // если выбрана первая песня
    id = 2; // ставим айди последней песни
  } else {
    // иначе
    id--; // айди меньше на 1
  }
  songChange(); // обращаемся к функции для визуального изменения
});

function formatingTime(time) {
  // функция форматирования времени
  let s = Math.floor(time % 60); // находим секунды от времени, находя остаток от деления на 60
  return Math.floor(time / 60) + ":" + (s < 10 ? "0" + s : s); // возвращаем минуты и секунды
}

song.ontimeupdate = function () {
  // функция обновления текущего времени
  currentTimeNode.innerHTML = formatingTime(song.currentTime); // текст текущего времени меняем на текущее время которое возвращаем прошлой функцией
};

function songTime(time) {
  // функция получения времени песни
  time = Math.floor(time); // округляем время
  let minutes = Math.floor(time / 60); // находим минуты
  let seconds = Math.floor(time - minutes * 60); // находим секунды
  let minutesVal = minutes; // переменная вывода минут
  let secondsVal = seconds; // переменная вывода секунд
  if (seconds < 10) {
    // если секунды меньше 10
    secondsVal = "0" + seconds; // то выводим с нулем перед цифрой
  }
  return minutesVal + ":" + secondsVal; // возвращаем время
}
function songProgress() {
  // функция обновления прогрессбара
  progress = Math.floor(song.currentTime) / (Math.floor(song.duration) / 100); // создаем переменную равную прогрессу
  progressBarNode.value = progress; // задаем эту переменную как значение прогрессбару
  currentTimeNode.innerHTML = songTime(song.currentTime); // изменяем текст текущего времени
}
function songChangeTime(e) {
  // функция перемотки прогрессбара
  let mouseX = Math.floor(e.pageX - progressBarNode.offsetLeft); // находим положение курсора
  let progress = mouseX / (progressBarNode.offsetWidth / 100); // задаем значение переменной прогресса
  song.currentTime = song.duration * (progress / 100); // выводим новое значение текущего времени
}

song.addEventListener("timeupdate", songProgress); // ивент обновления времени и прогресса

progressBarNode.addEventListener("click", songChangeTime); // ивент перемотки
