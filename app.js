const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".movingOutline circle");
  const video = document.querySelector(".videoContainer video");

  // Sounds
  const sounds = document.querySelectorAll(".soundSelector button");

  // Time display
  const timeDisplay = document.querySelector(".timeDisplay");
  const timeSelect = document.querySelectorAll(".timeSelector button");

  // Get circle outline length
  const outlineLength = outline.getTotalLength();

  // Duration
  let duration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkIfPlaying(song);
    });
  });

  // Play sounds
  play.addEventListener("click", () => {
    checkIfPlaying(song);
  });

  // Select sound
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      duration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`;
    });
  });

  // Function to stop/play sounds
  const checkIfPlaying = song => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "svg/play.svg";
    }
  };

  // Time
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsedTime = duration - currentTime;
    let seconds = Math.floor(elapsedTime % 60);
    let minutes = Math.floor(elapsedTime / 60);

    // Animate circle
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = "svg/play.svg";
      video.pause();
    }
  };
};

app();
