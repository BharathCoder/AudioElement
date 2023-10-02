let audioElement = new Audio("music/1.mp3")
let songIndex = 0;
let music = [
    {title:"Vendetta", src:"./music/1.mp3", over:"./covers/sigma.png"},
    {title:"Drive Forever", src:"./music/2.mp3", cover:"./covers/veyron.jpg"},
    {title:"Believer", src:"./music/3.mp3", cover:"./covers/believer.jpg"},
    {title:"Enemy", src:"./music/4.mp3", cover:"./covers/enemy.jpg"},
    {title:"Gangsta\'s Paradise", src:"./music/5.mp3", cover:"./covers/gangsta.png"},
    {title:"Bones", src:"./music/6.mp3", cover:"./covers/bones.jpg"},
    {title:"We Rollin", src:"./music/7.mp3", cover:"./covers/rollin.jpg"},
    {title:"NEON BLADE", src:"./music/8.mp3", cover:"./covers/neon.jpg"},
    {title:"Warriors", src:"./music/9.mp3", cover:"./covers/warriors.jpg"},
    {title:"Hey Mama", src:"./music/10.mp3", cover:"./covers/heymama.png"},
    {title:"Fearless", src:"./music/11.mp3", cover:"./covers/fearless.jpeg"},
    {title:"Mask Off", src:"./music/12.mp3", cover:"./covers/vendetta.jpg"}
]
// Welcome note
console.log("Welcome to AudioElement");

// Elements
let mPlay = document.getElementById("mPlay")
let prev = document.getElementById("prev")
let next = document.getElementById("next")
let title = Array.from(document.getElementsByClassName("title"))
let progressBar = document.getElementById("seekBar")
let timing = document.getElementById("time");
let musicItem = Array.from(document.getElementsByClassName("music-card"))
let musicItem2 = Array.from(document.getElementsByClassName("music-card-2"))
let musicItem3 = Array.from(document.getElementsByClassName("music-card-3"))
let songPlay = Array.from(document.getElementsByClassName("songPlay"));
let main = document.getElementById("maintitle")
let imgcover = document.getElementById("img")
let rocker = document.getElementById("volume")
let vol = document.querySelector(".vol")

// Handle Play/Pause
mPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play()
        mPlay.classList.remove("bi-play-fill")
        mPlay.classList.add("bi-pause-fill") 
    }
    else{
        audioElement.pause()
        mPlay.classList.remove("bi-pause-fill")
        mPlay.classList.add("bi-play-fill")
    }
});

// Update Seekbar on time
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    progressBar.value = progress
});
// Change timing on clicking seekbar at some point
progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (progressBar.value*audioElement.duration)/100
})

// Add songNames
musicItem.forEach((element, i)=>{
    span = element.getElementsByClassName('title')[0]
    span.innerText = music[i].title
})
musicItem2.forEach((element, i)=>{
    span = element.getElementsByClassName('title')[0]
    span.innerText = music[i+4].title
})
musicItem3.forEach((element, i)=>{
    span = element.getElementsByClassName('title')[0]
    span.innerText = music[i+8].title
})
// Automatic loop
if ((audioElement.currentTime/audioElement.duration)==1){
    songIndex+=1
    audioElement.src = `music/${songIndex+1}.mp3`
}

// Fuck knows
const makeAllPlays = ()=>{
    songPlay.forEach((element)=>{
        element.classList.remove('bi-pause-fill');
        element.classList.add('bi-play-fill');
    })

}

// Click on individual buttons
songPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{
            songIndex = parseInt(e.target.id)
            makeAllPlays()
            e.target.classList.remove("bi-play-fill")
            e.target.classList.add("bi-pause-fill")
            audioElement.src = `music/${songIndex+1}.mp3`
            audioElement.currentTime = 0;
            main.innerText = music[songIndex].title
            img.src = music[songIndex].cover
            audioElement.play()
            mPlay.classList.remove("bi-play-fill")
            mPlay.classList.add("bi-pause-fill")
    })
})

prev.addEventListener('click',()=>{
    if (songIndex>0) {
        songIndex -=1
    }
    else{
        songIndex = 0
    }
        audioElement.src = `music/${songIndex+1}.mp3`
        audioElement.currentTime = 0;
        main.innerText = music[songIndex].title
        img.src = music[songIndex].cover
        audioElement.play()
        mPlay.classList.remove("bi-play-fill")
        mPlay.classList.add("bi-pause-fill")

        makeAllPlays()
})

next.addEventListener('click',()=>{
    if (songIndex==11) {
        songIndex = 11
    }
    else{
        songIndex +=1
    }
        audioElement.src = `music/${songIndex+1}.mp3`
        audioElement.currentTime = 0;
        main.innerText = music[songIndex].title
        img.src = music[songIndex].cover
        audioElement.play()
        mPlay.classList.remove("bi-play-fill")
        mPlay.classList.add("bi-pause-fill")

        makeAllPlays()
})

// volume rocker
vol.addEventListener('click', ()=>{
    audioElement.volume = 0
    rocker.value = 0
    vol.classList.remove("bi-volume-up-fill")
    vol.classList.add("bi-volume-mute-fill")
})
rocker.addEventListener('change', ()=>{
    audioElement.volume = (rocker.value)/100;
    console.log(audioElement.volume)

    if (rocker.value == 0 || audioElement.volume == 0) {
        vol.classList.remove("bi-volume-up-fill")
        vol.classList.add("bi-volume-mute-fill")
    }
    else if (rocker.value<=50 || audioElement.volume <= 0.5) {
        vol.classList.remove("bi-volume-up-fill")
        vol.classList.add("bi-volume-down-fill")
    }
    else if(rocker.value >= 0 && rocker.value <= 50){
        vol.classList.remove("bi-volume-mute-fill")
        vol.classList.add("bi-volume-down-fill")
    }
    else{
        vol.classList.add("bi-volume-up-fill")
        vol.classList.remove("bi-volume-mute-fill")
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    if(audioElement.currentTime = audioElement.duration){
        songIndex+=1
        audioElement.src = `music/${songIndex+1}.mp3`
        audioElement.currentTime = 0;
        if(songIndex>=12){
            songIndex = 0
        }
    }
})
