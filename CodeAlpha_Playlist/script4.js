const audio = document.getElementById("song");
const progress = document.getElementById("progress");
const ctrlIcon = document.getElementById("ctrlIcon");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const songs = [
    {
        title: "Yumabaibesa",
        artist: "Sai Abhyankkar, Sem.III",
        src: "zYumabaibesa.m4a",
        img: "thumbnail.jpg"
    },
    {
        title: "Trouble",
        artist: "Frank Ocean",
        src: "zTrouble.m4a",
        img: "thumbnail2.jpg"
    },
    {
        title: "Not You Too",
        artist: "Drake ft. Chris Brown",
        src: "zNot You Too - Drake ft. Chris Brown.m4a",
        img: "thumbnail3.jpg"
    }
];

let currentSongIndex = 0;

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    title.innerHTML = "<b>" + song.title + "</b>";
    artist.innerText = song.artist;
    cover.src = song.img;
}
loadSong(currentSongIndex);

function playPause() {
    if (audio.paused) {
        audio.play();
        ctrlIcon.classList.remove("fa-play");
        ctrlIcon.classList.add("fa-pause");
    } else {
        audio.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    audio.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    audio.play();
    ctrlIcon.classList.remove("fa-play");
    ctrlIcon.classList.add("fa-pause");
}

audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = audio.currentTime;

    let value = (progress.value / progress.max) * 100;

    progress.style.background =
        `linear-gradient(to right, #efebce ${value}%, #a3a380 ${value}%)`;

    currentTimeEl.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

audio.addEventListener("ended", nextSong);

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return mins + ":" + (secs < 10 ? "0" + secs : secs);
}
const volumeSlider = document.getElementById("volume");
audio.volume = 1;
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
});
const volumeIconLow = document.querySelector(".fa-volume-low");
const volumeIconHigh = document.querySelector(".fa-volume-high");

volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;

    let volume = parseFloat(volumeSlider.value);

    if (volume === 0) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
    } 
    else if (volume < 0.5) {
        volumeIcon.className = "fa-solid fa-volume-low";
    } 
    else {
        volumeIcon.className = "fa-solid fa-volume-high";
    }

    let value = volume * 100;
    volumeSlider.style.background =
        `linear-gradient(to right, #efebce ${value}%, #a3a380 ${value}%)`;

});
