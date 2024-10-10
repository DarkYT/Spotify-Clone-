console.log('lets write some java script');
// minuts to second 
function convertSecondsToMinutes(seconds) {
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad minutes and seconds with leading zeros if necessary
    const minutesString = minutes.toString().padStart(2, '0');
    const secondsString = remainingSeconds.toString().padStart(2, '0');

    // Return in "MM:SS" format
    return `${minutesString}:${secondsString}`;
}


let currentSong = new Audio()
async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let responce = await a.text();
    // console.log(responce);
    let div = document.createElement("div")
    div.innerHTML = responce;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}
const playMusic = (track) => {
    currentSong.src = "/songs/" + track
    currentSong.play();
    play.src = "svg/pause.svg"
    document.querySelector(".songinfo").innerHTML = track
    document.querySelector(".songtime").innerHTML = "00:00/00:00"
}
async function main() {

    let songs = await getSongs()
    // console.log(songs)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `<li class=" m-1 p-1">  <div class="song-card ">
                                <div class="card-info">
                                    <img src="svg/music.svg" class="" alt="song" class="card-img">
                                    <div class="info">
                                        <div class="card-title"> ${song}</div>
                                        <div class="card-text">Spandan</div>
                                    </div>
                                </div> 
                                <span>Play Now</span>
                                <div class="playnow ">
                                    <img src="svg/play.svg" class="invert" alt="">
                                </div>
                            </div></li>`;
    }
    // play the first song
    // var audio = new Audio(songs[0]);
    // // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)

    // });

    // Add event listener to each song 
    Array.from(document.querySelector(".songlists").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            playMusic(e.querySelector(".card-title").innerHTML.trim())
        })

    });

    // attach event to seekbar 
    play.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play()
            play.src = "svg/pause.svg"
        }
        else {
            currentSong.pause()
            play.src = "svg/playbutton.svg"
        }
    })

    // time update event 
    currentSong.addEventListener("timeupdate", () => {
        console.log(currentSong.currentTime,);
        document.querySelector(".songtime").innerHTML = `
        ${convertSecondsToMinutes(Math.floor(currentSong.currentTime))} /
        ${convertSecondsToMinutes(Math.floor(currentSong.duration))}`
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    })

    // add event listner to move seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        const rect = document.querySelector(".seekbar").getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = (clickX / rect.width) * 100;
        currentSong.currentTime = currentSong.duration * (percentage / 100);

    })
}

main()   