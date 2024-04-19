console.log("welcome");

// Initialize the variables
let songIndex = 0;
let audioEliment = new Audio("songs/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Ai Obelai",
    filePath: "songs/0.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "Alada Alada",
    filePath: "songs/1.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "Dil Na Tarunga",
    filePath: "songs/2.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "Lal Ishq",
    filePath: "songs/3.mp3",
    coverPath: "covers/4.jpg",
  },
  {
    songName: "Sukriya",
    filePath: "songs/4.mp3",
    coverPath: "covers/5.jpg",
  },
  {
    songName: "Tum Itna Jo",
    filePath: "songs/5.mp3",
    coverPath: "covers/6.jpg",
  },
  {
    songName: "Humdard",
    filePath: "songs/6.mp3",
    coverPath: "covers/7.jpg",
  },
  {
    songName: "Mahabharat",
    filePath: "songs/7.mp3",
    coverPath: "covers/8.jpg",
  },
  {
    songName: "Pehele Bhi Main",
    filePath: "songs/8.mp3",
    coverPath: "covers/9.jpg",
  },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioEliment.play();

// lHandle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioEliment.paused || audioEliment.currentTime <= 0) {
    audioEliment.play();
    
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioEliment.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Listen to events
audioEliment.addEventListener("timeupdate", () => {
  //    Update seekbar
  progress = parseInt((audioEliment.currentTime / audioEliment.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioEliment.currentTime =
    (myProgressBar.value * audioEliment.duration) / 100;
});

makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      if(audioEliment.paused){
      gif.style.opacity = 1;
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioEliment.currentTime = 0;
      audioEliment.src = `songs/${songIndex}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioEliment.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    }
    else{
      gif.style.opacity = 0;
      makeAllPlays();
      e.target.classList.remove("fa-circle-pause");
      e.target.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
      audioEliment.pause();
    }

    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 8) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioEliment.currentTime = 0;
  audioEliment.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioEliment.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioEliment.currentTime = 0;
  audioEliment.src = `songs/${songIndex}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioEliment.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
