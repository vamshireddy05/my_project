console.log("Welcome to Melody Mix");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(); // Initialize outside the DOMContentLoaded event
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Ignite", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Lean On", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Hey Mama", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Shape Of You", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Girls Like You", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Sunn Beliya", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Yeh Raaten Yeh Mausam", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Aajkal Tere Mere Pyar", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Chhaila", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Khoobsurat", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "A Mawa Ninna Magala", filePath: "songs/11.mp3", coverPath: "covers/11.jpg"},
    {songName: "Ava Kottana Anta", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Bangara Hattedena Ninagena", filePath: "songs/13.mp3", coverPath: "covers/13.jpg"},
    {songName: "Bittu Hontyalla", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
    {songName: "Chendulla Chaluvi", filePath: "songs/15.mp3", coverPath: "covers/15.jpg"},
    {songName: "Kallava Kela Mallava", filePath: "songs/16.mp3", coverPath: "covers/16.jpg"},
    {songName: "Kunitallo", filePath: "songs/17.mp3", coverPath: "covers/17.jpg"},
    {songName: "Naa Drivera", filePath: "songs/18.mp3", coverPath: "covers/18.jpg"},
    {songName: "Nanna Gelati", filePath: "songs/19.mp3", coverPath: "covers/19.jpg"},
];

// Set song items dynamically
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    element.addEventListener('click', () => {
        playSong(i); // Play the song on click
    });
});

// Function to play song
function playSong(index) {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    gif.style.opacity = 1;
}

// Play/Pause button logic
let isPlaying = false;
masterPlay.addEventListener('click', () => {
    if (isPlaying) {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
        isPlaying = false;
        masterSongName.innerText = ''; // Clear song name when paused
    } else {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
        isPlaying = true;
        masterSongName.innerText = songs[songIndex].songName;
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress || 0;
});

// Seek functionality
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Handle when audio ends
audioElement.addEventListener('ended', () => {
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    gif.style.opacity = 0;
    isPlaying = false;
    masterSongName.innerText = ''; // Clear song name when audio ends
});

// Next/Previous buttons logic
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to the first song
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length; // Loop to the last song if at the first
    playSong(songIndex);
});

// Toggle visibility functions
const playlistButton = document.getElementById('playlistButton');
const favoritesButton = document.getElementById('favoritesButton');
const playlistDropdown = document.getElementById('playlistDropdown');
const favoritesDropdown = document.getElementById('favoritesDropdown');

// Toggle dropdown visibility
function toggleDropdownVisibility(target) {
    target.style.display = target.style.display === 'none' || target.style.display === '' ? 'block' : 'none';
}

playlistButton.addEventListener('click', () => {
    toggleDropdownVisibility(playlistDropdown);
    favoritesDropdown.style.display = 'none'; // Close Favorites dropdown if open
});

favoritesButton.addEventListener('click', () => {
    toggleDropdownVisibility(favoritesDropdown);
    playlistDropdown.style.display = 'none'; // Close Playlists dropdown if open
});

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
    if (!playlistButton.contains(event.target) && !playlistDropdown.contains(event.target)) {
        playlistDropdown.style.display = 'none';
    }
    if (!favoritesButton.contains(event.target) && !favoritesDropdown.contains(event.target)) {
        favoritesDropdown.style.display = 'none';
    }
});
