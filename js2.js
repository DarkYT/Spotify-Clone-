console.log('lets write some java script');

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs;
}

const playMusic = (track) => {
    currentSong.src = "/songs/" + track;
    currentSong.play();
}

async function main() {
    let songs = await getSongs();
    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUL.innerHTML += `<li class="m-1 p-1">
                                <div class="song-card">
                                    <div class="card-info">
                                        <img src="svg/music.svg" class="card-img" alt="song">
                                        <div class="info">
                                            <div class="card-title">${song.split("__")[0]}</div>
                                            <div class="card-text">Spandan</div>
                                        </div>
                                    </div>
                                    <span>Play Now</span>
                                    <div class="playnow">
                                        <img src="svg/play.svg" class="invert" alt="">
                                    </div>
                                </div>
                            </li>`;
    }

    // Add event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            const songName = songs.find(song => song.split("__")[0].trim() === e.querySelector(".card-title").innerHTML.trim());
            if (songName) {
                playMusic(songName);
            }
        });
    });
}

const currentSong = document.getElementById("currentSong");

main();
