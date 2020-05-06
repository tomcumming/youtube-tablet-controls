import parseUrl from "./url.js";

/** @type {Promise<any>} */
//@ts-ignore
const YT = window.youTubeApiReady.then(() => window.YT);

function init() {
  const form = document.querySelector(".video-selector");
  const urlInput = document.querySelector("#video-url");

  if (form instanceof HTMLFormElement && urlInput instanceof HTMLInputElement) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      onSelectVideo(form, urlInput.value);
    });
  } else {
    throw new Error(`Can't find elements`);
  }
}

async function onSelectVideo(
  /** @type {HTMLElement} */ form,
  /** @type {string} */ url
) {
  const videoId = parseUrl(url);
  console.log("selected", url, videoId);
  const yt = await YT;

  const playerHolder = document.querySelector(".player");
  const playerPlaceholder = document.querySelector(".player__placeholder");

  if (
    playerHolder instanceof HTMLElement &&
    playerPlaceholder instanceof HTMLElement
  ) {
    playerHolder.style.display = "flex";
    form.style.display = "none";

    const player = new yt.Player(playerPlaceholder, { videoId });

    const btnSkipBack = document.querySelector("#btn-skip-back");
    const btnSkipFw = document.querySelector("#btn-skip-forward");
    const btnPlay = document.querySelector("#btn-toggle-play");
    const btnSlower = document.querySelector("#btn-slower");
    const btnFaster = document.querySelector("#btn-faster");

    if (
      btnSkipBack instanceof HTMLButtonElement &&
      btnSkipFw instanceof HTMLButtonElement &&
      btnPlay instanceof HTMLButtonElement &&
      btnSlower instanceof HTMLButtonElement &&
      btnFaster instanceof HTMLButtonElement
    ) {
      setupPlayer(
        player,
        btnSkipBack,
        btnSkipFw,
        btnPlay,
        btnSlower,
        btnFaster
      );
    } else {
      throw new Error(`Could not find buttons`);
    }
  } else {
    throw new Error(`Can't find player element`);
  }
}

function setupPlayer(
  /** @type {any} */ player,
  /** @type {HTMLButtonElement} */ btnSkipBack,
  /** @type {HTMLButtonElement} */ btnSkipFw,
  /** @type {HTMLButtonElement} */ btnPlay,
  /** @type {HTMLButtonElement} */ btnSlower,
  /** @type {HTMLButtonElement} */ btnFaster
) {
  btnSkipFw.addEventListener("click", () => {
    player.seekTo(player.getCurrentTime() + 5, true);
  });
  btnSkipBack.addEventListener("click", () => {
    player.seekTo(player.getCurrentTime() - 5, true);
  });
  btnPlay.addEventListener("click", () => {
    if (player.getPlayerState() === 2) player.playVideo();
    else if (player.getPlayerState() === 1) player.pauseVideo();
  });
  btnSlower.addEventListener("click", () => {
    player.setPlaybackRate(player.getPlaybackRate() - 0.25);
  });
  btnFaster.addEventListener("click", () => {
    player.setPlaybackRate(player.getPlaybackRate() + 0.25);
  });
}

window.addEventListener("DOMContentLoaded", init);
if (document.readyState === "complete") init();
