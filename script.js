console.log('lets write some java script');
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
const playMusic = (track)=>{
    currentSong.src = "/songs/"+track
    currentSong.play();
 
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
                                        <div class="card-title"> ${song }</div>
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
        e.addEventListener("click",element=>{
         playMusic(e.querySelector(".card-title").innerHTML.trim())
        })
        
    });
}
main()   