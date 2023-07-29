console.log("Welcome to Spotify");

//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let ProgressBar = document.getElementById('ProgressBar')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))


let songs = [
    {songname: "letmeloveyou" , filepath: "songs/1.mp3" , coverpath: "covers/cover1.jpg"},
    {songname: "faded" , filepath: "songs/2.mp3" , coverpath: "covers/cover2.jpg"},
    {songname: "dildara" , filepath: "songs/3.mp3" , coverpath: "covers/cover3.jpg"},
    {songname: "gozadera" , filepath: "songs/4.mp3" , coverpath: "covers/cover4.jpg"},
    {songname: "hello" , filepath: "songs/1.mp3" , coverpath: "covers/cover1.jpg"},
    {songname: "helli" , filepath: "songs/1.mp3" , coverpath: "covers/cover1.jpg"},
    {songname: "hellu" , filepath: "songs/1.mp3" , coverpath: "covers/cover1.jpg"}
]


songItems.forEach((element,i)=>{
    console.log(element,i)
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})
//audioElement.play;

//Listen to events

//Handle play/pause click
masterPlay.addEventListener('click', ()=> {
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    }else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');   
    }
})

audioElement.addEventListener('timeupdate' ,()=> {
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log('progress');
    ProgressBar .value = progress;
});

ProgressBar.addEventListener('change', ()=> {
    audioElement.currentTime = ProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-play-circle');
        element.classList.remove('fa-pause-circle');    
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songname;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex >= 4){
        songIndex = 1;
    }
    else {
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex <= 1){
        songIndex = 4;
    }
    else {
        songIndex-=1;
    }
    
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
