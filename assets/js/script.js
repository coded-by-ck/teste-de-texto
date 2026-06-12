const startDate = new Date("2023-02-23T00:00:00");
const ACCESS_KEY = "meuLugarFavoritoAcessoLiberado";
const BG_MUSIC_START_TIME = 50;
const BG_MUSIC_END_TIME = 90;
const GIFT_MUSIC_START_TIME = 16;
const GIFT_MUSIC_END_TIME = 35;
const SPICY_GIFT_DELAY = 1800;
const MEMORY_VIDEO_START_TIME = 0;
const MEMORY_VIDEO_END_TIME = 22;

const body = document.body;
const accessGate = document.querySelector("#accessGate");
const splash = document.querySelector("#splash");
const site = document.querySelector("#site");
const topbar = document.querySelector(".topbar");
const accessForm = document.querySelector("#accessForm");
const accessMessage = document.querySelector("#accessMessage");
const dateAnswer = document.querySelector("#dateAnswer");
const nameAnswer = document.querySelector("#nameAnswer");
const openGiftButton = document.querySelector("#openGift");
const cinemaOpening = document.querySelector("#cinematicIntro");
const cinemaSlidesContainer = document.querySelector("#cinemaSlides");
let cinemaSlides = [];
const cinemaDots = document.querySelector("#cinemaDots");
const cinemaProgress = document.querySelector("#cinemaProgress");
const cinemaPrevButton = document.querySelector("#cinemaPrev");
const cinemaNextButton = document.querySelector("#cinemaNext");
const cinemaSkipButton = document.querySelector("#cinemaSkip");
const openSecretButton = document.querySelector("#openSecret");
const secretContent = document.querySelector("#secretContent");
const memoryVideoBlock = document.querySelector("#memoryVideoBlock");
const memoryVideo = document.querySelector("#memoryVideo");
const backTopButton = document.querySelector("#backTop");
const finalButton = document.querySelector("#finalButton");
const finalMessage = document.querySelector("#finalMessage");
const openGiftVaultBtn = document.querySelector("#openGiftVaultBtn");
const closeGiftVaultBtn = document.querySelector("#closeGiftVaultBtn");
const giftVault = document.querySelector("#giftVault");
const giftMusic = document.querySelector("#giftMusic");
const bgMusic = document.querySelector("#bgMusic");
const musicToggle = document.querySelector("#musicToggle");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const closeLightboxButton = document.querySelector("#closeLightbox");
let currentSong = null;
let currentSongCard = null;
let currentSongButton = null;
let bgMusicWasPlayingBeforeGift = false;
let giftMusicStarted = false;
let previousBgVolume = 0.45;
let spicyGiftObserver = null;
let spicyGiftTimer = null;
let cinemaIndex = 0;
let cinemaTimer = null;
let cinemaProgressTimer = null;
let cinemaStartedAt = 0;
let cinemaTouchStartX = 0;
let memoryVideoStarted = false;
const openingImages = [
  "assets/img/opening/opening-01.jpg",
  "assets/img/opening/opening-02.jpg",
  "assets/img/opening/opening-03.jpg",
  "assets/img/opening/opening-04.jpg",
  "assets/img/opening/opening-05.jpg",
  "assets/img/opening/opening-06.jpg",
  "assets/img/opening/opening-07.jpg",
  "assets/img/opening/opening-08.jpg",
  "assets/img/opening/opening-09.jpg",
  "assets/img/opening/opening-10.jpg",
  "assets/img/opening/opening-11.jpg",
  "assets/img/opening/opening-12.jpg",
  "assets/img/opening/opening-13.jpg",
  "assets/img/opening/opening-14.jpg",
  "assets/img/opening/opening-15.jpg",
  "assets/img/opening/opening-16.jpg",
  "assets/img/opening/opening-17.jpg",
  "assets/img/opening/opening-18.jpg",
  "assets/img/opening/opening-19.jpg",
  "assets/img/opening/opening-20.jpg",
  "assets/img/opening/opening-21.jpg",
  "assets/img/opening/opening-22.jpg"
];
const openingLegacyImages = openingImages.map((src) =>
  src.replace("assets/img/opening/", "assets/img/")
);
const cinematicSequence = [
  { type: "image", src: openingImages[0], fallback: openingLegacyImages[0], text: "Alguns momentos não passam…", duration: 3200 },
  { type: "image", src: openingImages[1], fallback: openingLegacyImages[1], duration: 1100 },
  { type: "image", src: openingImages[2], fallback: openingLegacyImages[2], duration: 950 },
  { type: "image", src: openingImages[3], fallback: openingLegacyImages[3], text: "Eles ficam.", duration: 2600 },
  { type: "image", src: openingImages[4], fallback: openingLegacyImages[4], duration: 900 },
  { type: "image", src: openingImages[5], fallback: openingLegacyImages[5], duration: 1000 },
  { type: "image", src: openingImages[6], fallback: openingLegacyImages[6], duration: 950 },
  { type: "image", src: openingImages[7], fallback: openingLegacyImages[7], duration: 900 },
  { type: "video", src: "assets/video/momento-02.mp4", poster: openingImages[8], fallback: openingImages[0], text: "Em foto, em movimento…", duration: 3000 },
  { type: "image", src: openingImages[9], fallback: openingLegacyImages[9], duration: 950 },
  { type: "image", src: openingImages[10], fallback: openingLegacyImages[10], duration: 900 },
  { type: "image", src: openingImages[11], fallback: openingLegacyImages[11], duration: 1100 },
  { type: "image", src: openingImages[12], fallback: openingLegacyImages[12], duration: 900 },
  { type: "image", src: openingImages[13], fallback: openingLegacyImages[13], text: "E principalmente em sentimento.", duration: 3400 },
  { type: "image", src: openingImages[14], fallback: openingLegacyImages[14], duration: 900 },
  { type: "image", src: openingImages[15], fallback: openingLegacyImages[15], duration: 950 },
  { type: "image", src: openingImages[16], fallback: openingLegacyImages[16], duration: 900 },
  { type: "image", src: openingImages[17], fallback: openingLegacyImages[17], duration: 950 },
  { type: "image", src: openingImages[18], fallback: openingLegacyImages[18], text: "Foi por isso que eu fiz isso pra você.", duration: 3600 },
  { type: "image", src: openingImages[19], fallback: openingLegacyImages[19], duration: 1000 },
  { type: "image", src: openingImages[20], fallback: openingLegacyImages[20], duration: 950 },
  { type: "image", src: openingImages[21], fallback: openingLegacyImages[21], text: "Agora vem conhecer o meu lugar favorito.", duration: 5000, final: true }
];

body.classList.add("no-scroll");
clearStoredAccess();

accessForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const isDateCorrect = normalizeDate(dateAnswer.value) === "23022023";
  const isNameCorrect = normalizeText(nameAnswer.value) === "isack";

  if (!isDateCorrect || !isNameCorrect) {
    accessMessage.textContent = "Quase, meu amor... tenta de novo.";
    accessMessage.classList.remove("is-success");
    return;
  }

  accessMessage.textContent = "Bem-vinda ao meu lugar favorito.";
  accessMessage.classList.add("is-success");
  storeAccess();

  setTimeout(() => showIntro(), 650);
});

openGiftButton?.addEventListener("click", () => {
  showCinemaOpening();
  playBackgroundMusic();
});

function normalizeDate(value) {
  return value.replace(/\D/g, "");
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function storeAccess() {
  try {
    localStorage.setItem(ACCESS_KEY, "true");
  } catch {
    // A página continua funcionando mesmo quando o navegador bloqueia storage.
  }
}

function clearStoredAccess() {
  try {
    localStorage.removeItem(ACCESS_KEY);
  } catch {
    // A tela de acesso continua obrigatória mesmo sem acesso ao storage.
  }
}

function showIntro(options = {}) {
  splash.removeAttribute("hidden");

  if (options.skipAccessAnimation) {
    accessGate.setAttribute("hidden", "");
    return;
  }

  accessGate.classList.add("is-hidden");
  setTimeout(() => {
    accessGate.setAttribute("hidden", "");
  }, 850);
}

function unlockSite() {
  site.classList.remove("is-locked");
  topbar.classList.remove("is-locked");
  body.classList.remove("no-scroll");

  splash.classList.add("is-hidden");
  setTimeout(() => {
    splash.setAttribute("hidden", "");
  }, 850);
}

function showCinemaOpening() {
  cinemaOpening?.removeAttribute("hidden");
  cinemaOpening?.classList.add("is-active");
  splash.classList.add("is-hidden");
  setTimeout(() => {
    splash.setAttribute("hidden", "");
  }, 850);
  startCinema();
}

function enterSiteFromCinema() {
  stopCinemaTimers();
  cinemaOpening?.classList.add("is-hidden");
  setTimeout(() => {
    cinemaOpening?.setAttribute("hidden", "");
    cinemaOpening?.classList.remove("is-active");
    cinemaOpening?.classList.remove("is-hidden");
  }, 720);
  site.classList.remove("is-locked");
  topbar.classList.remove("is-locked");
  body.classList.remove("no-scroll");
}

function startCinema() {
  renderCinemaSlides();

  if (!cinemaSlides.length) {
    enterSiteFromCinema();
    return;
  }

  buildCinemaDots();
  setCinemaSlide(0);
}

function renderCinemaSlides() {
  if (!cinemaSlidesContainer || cinemaSlidesContainer.children.length) {
    cinemaSlides = Array.from(document.querySelectorAll(".cinema-slide"));
    return;
  }

  const fragment = document.createDocumentFragment();

  cinematicSequence.forEach((item, index) => {
    const slide = document.createElement("article");
    slide.className = `cinematic-slide cinema-slide${index === 0 ? " is-active" : ""}${item.final ? " cinema-slide--final" : ""}`;
    slide.dataset.duration = String(item.duration);

    if (item.type === "video") {
      const fallback = createCinemaImage(item.poster, item.fallback);
      fallback.classList.add("cinema-fallback");
      slide.appendChild(fallback);

      const video = document.createElement("video");
      video.className = "cinema-video";
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = item.poster;

      const source = document.createElement("source");
      source.src = item.src;
      source.type = "video/mp4";
      video.appendChild(source);
      slide.appendChild(video);
    } else {
      slide.appendChild(createCinemaImage(item.src, item.fallback));
    }

    if (item.text || item.final) {
      const content = document.createElement("div");
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      content.appendChild(number);

      if (item.text) {
        const title = document.createElement("h2");
        title.textContent = item.text;
        content.appendChild(title);
      }

      if (item.final) {
        const button = document.createElement("button");
        button.className = "btn btn--primary";
        button.id = "cinemaEnter";
        button.type = "button";
      button.textContent = "Entrar no meu lugar favorito";
        button.addEventListener("click", enterSiteFromCinema);
        content.appendChild(button);
      }

      slide.appendChild(content);
    }

    fragment.appendChild(slide);
  });

  cinemaSlidesContainer.appendChild(fragment);
  cinemaSlides = Array.from(document.querySelectorAll(".cinema-slide"));
  attachCinemaVideoErrors();
}

function createCinemaImage(src, fallback) {
  const image = document.createElement("img");
  image.src = src;
  image.alt = "";
  image.dataset.fallback = fallback || "assets/img/hero-capa.jpg";
  image.addEventListener("error", handleCinemaImageError);
  return image;
}

function handleCinemaImageError(event) {
  const image = event.currentTarget;
  const fallback = image.dataset.fallback;

  if (fallback && image.src.indexOf(fallback) === -1) {
    image.src = fallback;
    image.dataset.fallback = "assets/img/hero-capa.jpg";
    return;
  }

  image.src = "assets/img/hero-capa.jpg";
}

function attachCinemaVideoErrors() {
  document.querySelectorAll(".cinema-video").forEach((video) => {
    const handleVideoError = () => {
      const slide = video.closest(".cinema-slide");
      slide?.classList.add("has-video-error");

      if (slide?.classList.contains("is-active")) {
        nextCinemaSlide();
      }
    };

    video.addEventListener("error", handleVideoError);

    video.querySelectorAll("source").forEach((source) => {
      source.addEventListener("error", handleVideoError);
    });
  });
}

function buildCinemaDots() {
  if (!cinemaDots || cinemaDots.children.length) {
    return;
  }

  cinemaSlides.forEach(() => {
    const dot = document.createElement("span");
    cinemaDots.appendChild(dot);
  });
}

function setCinemaSlide(index) {
  cinemaIndex = (index + cinemaSlides.length) % cinemaSlides.length;

  cinemaSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === cinemaIndex);
  });
  syncCinemaVideos();

  cinemaDots?.querySelectorAll("span").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === cinemaIndex);
  });

  startCinemaTimers();
}

function startCinemaTimers() {
  stopCinemaTimers();
  const slideDuration = getCinemaSlideDuration();
  cinemaStartedAt = Date.now();
  updateCinemaProgress();

  cinemaProgressTimer = setInterval(updateCinemaProgress, 120);
  cinemaTimer = setTimeout(() => {
    if (cinemaIndex >= cinemaSlides.length - 1) {
      enterSiteFromCinema();
      return;
    }

    setCinemaSlide(cinemaIndex + 1);
  }, slideDuration);
}

function stopCinemaTimers() {
  clearTimeout(cinemaTimer);
  clearInterval(cinemaProgressTimer);
}

function updateCinemaProgress() {
  if (!cinemaProgress) {
    return;
  }

  const elapsed = Date.now() - cinemaStartedAt;
  const slideProgress = Math.min(elapsed / getCinemaSlideDuration(), 1);
  const totalProgress = ((cinemaIndex + slideProgress) / cinemaSlides.length) * 100;
  cinemaProgress.style.width = `${totalProgress}%`;
}

function getCinemaSlideDuration() {
  return Number(cinemaSlides[cinemaIndex]?.dataset.duration) || 7000;
}

function syncCinemaVideos() {
  cinemaSlides.forEach((slide, slideIndex) => {
    const video = slide.querySelector("video");
    if (!video) {
      return;
    }

    video.muted = true;
    video.playsInline = true;

    if (slideIndex !== cinemaIndex) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.play().catch(() => {
      slide.classList.add("has-video-error");
      nextCinemaSlide();
    });
  });
}

function nextCinemaSlide() {
  if (cinemaIndex >= cinemaSlides.length - 1) {
    enterSiteFromCinema();
    return;
  }

  setCinemaSlide(cinemaIndex + 1);
}

function prevCinemaSlide() {
  setCinemaSlide(cinemaIndex - 1);
}

async function playMemoryVideoSnippet() {
  if (!memoryVideo || memoryVideoStarted) {
    return;
  }

  try {
    memoryVideoStarted = true;
    memoryVideo.muted = false;
    memoryVideo.volume = 0.85;
    memoryVideo.currentTime = MEMORY_VIDEO_START_TIME;
    await memoryVideo.play();
  } catch (error) {
    memoryVideoStarted = false;
    console.warn("O vídeo do momento vivo não pôde iniciar automaticamente.", error);
  }
}

function updateLoveCounter() {
  const now = new Date();
  const diff = Math.max(now - startDate, 0);

  const totalSeconds = Math.floor(diff / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.querySelector("[data-counter='days']").textContent = totalDays;
  document.querySelector("[data-counter='hours']").textContent = String(hours).padStart(2, "0");
  document.querySelector("[data-counter='minutes']").textContent = String(minutes).padStart(2, "0");
  document.querySelector("[data-counter='seconds']").textContent = String(seconds).padStart(2, "0");
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".gallery-item button").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.full;
    lightboxImage.alt = button.querySelector("img").alt;
    lightboxCaption.textContent = button.dataset.caption;
    lightbox.removeAttribute("hidden");
    body.classList.add("no-scroll");
  });
});

function closeLightbox() {
  lightbox.setAttribute("hidden", "");
  lightboxImage.src = "";
  body.classList.remove("no-scroll");
}

closeLightboxButton?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !lightbox.hasAttribute("hidden")) {
    closeLightbox();
  }
});

musicToggle?.addEventListener("click", () => {
  toggleBackgroundMusic();
});

bgMusic?.addEventListener("pause", () => {
  musicToggle?.classList.remove("is-playing");
  updateMusicIcon();
});

bgMusic?.addEventListener("play", () => {
  musicToggle?.classList.add("is-playing");
  updateMusicIcon();
});

bgMusic?.addEventListener("ended", () => {
  musicToggle?.classList.remove("is-playing");
  updateMusicIcon();
});

bgMusic?.addEventListener("error", () => {
  musicToggle?.classList.remove("is-playing");
  updateMusicIcon();
  console.warn("A música principal não pôde ser carregada.");
});

bgMusic?.addEventListener("timeupdate", () => {
  if (bgMusic.currentTime >= BG_MUSIC_END_TIME) {
    bgMusic.pause();
    bgMusic.currentTime = BG_MUSIC_START_TIME;
    musicToggle?.classList.remove("is-playing");
    updateMusicIcon();
  }
});

memoryVideo?.addEventListener("error", () => {
  memoryVideoBlock?.setAttribute("hidden", "");
});

memoryVideo?.addEventListener("loadedmetadata", () => {
  memoryVideo.muted = false;
  memoryVideo.volume = 0.85;
  if (memoryVideo.currentTime < MEMORY_VIDEO_START_TIME) {
    memoryVideo.currentTime = MEMORY_VIDEO_START_TIME;
  }
});

memoryVideo?.addEventListener("play", () => {
  if (
    memoryVideo.currentTime < MEMORY_VIDEO_START_TIME ||
    memoryVideo.currentTime >= MEMORY_VIDEO_END_TIME
  ) {
    memoryVideo.currentTime = MEMORY_VIDEO_START_TIME;
  }
});

memoryVideo?.addEventListener("timeupdate", () => {
  if (memoryVideo.currentTime >= MEMORY_VIDEO_END_TIME) {
    memoryVideo.pause();
    memoryVideo.currentTime = MEMORY_VIDEO_START_TIME;
  }
});

if (memoryVideo && memoryVideoBlock) {
  const memoryVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
        playMemoryVideoSnippet();
      }
    });
  }, { threshold: [0.45] });

  memoryVideoObserver.observe(memoryVideoBlock);
}

giftMusic?.addEventListener("timeupdate", () => {
  if (giftMusic.currentTime >= GIFT_MUSIC_END_TIME) {
    giftMusic.pause();
    giftMusic.currentTime = GIFT_MUSIC_START_TIME;
    restoreBackgroundMusicVolume();
  }
});

cinemaNextButton?.addEventListener("click", nextCinemaSlide);
cinemaPrevButton?.addEventListener("click", prevCinemaSlide);
cinemaSkipButton?.addEventListener("click", enterSiteFromCinema);

cinemaOpening?.addEventListener("click", (event) => {
  const isControl = event.target.closest("button, .cinema-controls");
  if (!isControl) {
    nextCinemaSlide();
  }
});

cinemaOpening?.addEventListener("touchstart", (event) => {
  cinemaTouchStartX = event.touches[0]?.clientX ?? 0;
});

cinemaOpening?.addEventListener("touchend", (event) => {
  const endX = event.changedTouches[0]?.clientX ?? cinemaTouchStartX;
  const distance = endX - cinemaTouchStartX;

  if (Math.abs(distance) < 42) {
    return;
  }

  if (distance < 0) {
    nextCinemaSlide();
  } else {
    prevCinemaSlide();
  }
});

document.querySelectorAll(".song-card .song-play").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".song-card");
    toggleSongCard(card, button);
  });
});

document.querySelectorAll(".song-card a[href='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

openSecretButton?.addEventListener("click", () => {
  secretContent.removeAttribute("hidden");
  openSecretButton.setAttribute("hidden", "");
});

window.addEventListener("scroll", () => {
  backTopButton.classList.toggle("is-visible", window.scrollY > 620);
});

backTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

finalButton?.addEventListener("click", () => {
  finalMessage.removeAttribute("hidden");
  createHearts(finalButton);
});

openGiftVaultBtn?.addEventListener("click", () => {
  openGiftVault();
});

closeGiftVaultBtn?.addEventListener("click", () => {
  closeGiftVault();
});

giftVault?.addEventListener("click", (event) => {
  if (event.target.classList.contains("gift-vault-backdrop")) {
    closeGiftVault();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && giftVault && !giftVault.hidden) {
    closeGiftVault();
  }
});

document.querySelectorAll(".coupon-detail-btn").forEach((button) => {
  button.addEventListener("click", () => {
    toggleCouponDetails(button);
  });
});

function createHearts(originElement) {
  const rect = originElement.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  for (let index = 0; index < 18; index += 1) {
    const heart = document.createElement("span");
    const drift = `${(Math.random() - 0.5) * 170}px`;

    heart.className = "heart";
    heart.textContent = "♥";
    heart.style.left = `${originX + (Math.random() - 0.5) * 80}px`;
    heart.style.top = `${originY + (Math.random() - 0.5) * 30}px`;
    heart.style.setProperty("--x", drift);
    heart.style.animationDelay = `${Math.random() * 220}ms`;
    heart.style.fontSize = `${0.85 + Math.random() * 1.05}rem`;

    document.body.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

async function openGiftVault() {
  if (!giftVault) {
    return;
  }

  giftVault.hidden = false;
  body.classList.add("modal-open");
  if (openGiftVaultBtn) {
    openGiftVaultBtn.textContent = "Presente liberado ❤️";
    openGiftVaultBtn.closest(".final-gift")?.classList.add("is-revealed");
  }
  createGiftConfetti();
  giftMusicStarted = false;

  if (giftMusic) {
    giftMusic.pause();
    giftMusic.currentTime = GIFT_MUSIC_START_TIME;
  }

  setTimeout(() => {
    setupSpicyGiftObserver();
  }, 400);
}

function closeGiftVault() {
  if (!giftVault) {
    return;
  }

  giftVault.hidden = true;
  body.classList.remove("modal-open");

  if (giftMusic) {
    giftMusic.pause();
    giftMusic.currentTime = GIFT_MUSIC_START_TIME;
  }

  if (bgMusic && bgMusicWasPlayingBeforeGift) {
    const previousVolume = Number(bgMusic.dataset.previousVolume || 0.45);
    bgMusic.volume = previousVolume;
  }

  bgMusicWasPlayingBeforeGift = false;
  giftMusicStarted = false;
  disconnectSpicyGiftObserver();
}

function toggleCouponDetails(button) {
  const coupon = button.closest(".gift-coupon");
  if (!coupon) {
    return;
  }

  document.querySelectorAll(".gift-vault .gift-coupon.is-open").forEach((openCoupon) => {
    if (openCoupon !== coupon) {
      openCoupon.classList.remove("is-open");
      const openButton = openCoupon.querySelector(".coupon-detail-btn");
      if (openButton) {
        openButton.textContent = "Ver detalhes";
      }
    }
  });

  const isOpen = coupon.classList.toggle("is-open");
  button.textContent = isOpen ? "Fechar detalhes" : "Ver detalhes";
}

function setupSpicyGiftObserver() {
  disconnectSpicyGiftObserver();

  const spicyGift = document.querySelector('[data-gift="spicy"]');
  const giftVaultPanel = document.querySelector(".gift-vault-panel");

  if (!spicyGift || !giftVaultPanel) {
    return;
  }

  spicyGiftObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
          startSpicyGiftTimer();
        } else {
          cancelSpicyGiftTimer();
        }
      });
    },
    {
      root: giftVaultPanel,
      threshold: [0.45]
    }
  );

  spicyGiftObserver.observe(spicyGift);
}

function startSpicyGiftTimer() {
  if (giftMusicStarted || spicyGiftTimer) {
    return;
  }

  spicyGiftTimer = setTimeout(() => {
    playGiftMusicSnippet();
    spicyGiftTimer = null;
  }, SPICY_GIFT_DELAY);
}

function cancelSpicyGiftTimer() {
  if (spicyGiftTimer) {
    clearTimeout(spicyGiftTimer);
    spicyGiftTimer = null;
  }
}

function disconnectSpicyGiftObserver() {
  cancelSpicyGiftTimer();

  if (spicyGiftObserver) {
    spicyGiftObserver.disconnect();
    spicyGiftObserver = null;
  }
}

async function playGiftMusicSnippet() {
  if (!giftMusic || giftMusicStarted) {
    return;
  }

  try {
    giftMusicStarted = true;
    disconnectSpicyGiftObserver();

    if (bgMusic) {
      bgMusicWasPlayingBeforeGift = !bgMusic.paused;

      if (bgMusicWasPlayingBeforeGift) {
        previousBgVolume = bgMusic.volume || 0.45;
        bgMusic.dataset.previousVolume = String(previousBgVolume);
        bgMusic.volume = 0.10;
      }
    }

    giftMusic.currentTime = GIFT_MUSIC_START_TIME;
    giftMusic.volume = 0.55;
    await giftMusic.play();
  } catch (error) {
    giftMusicStarted = false;
    restoreBackgroundMusicVolume();
    console.warn("Não foi possível tocar o trecho do último presente.", error);
  }
}

function restoreBackgroundMusicVolume() {
  if (bgMusic && bgMusicWasPlayingBeforeGift) {
    bgMusic.volume = previousBgVolume || Number(bgMusic.dataset.previousVolume || 0.45);
  }

  bgMusicWasPlayingBeforeGift = false;
}

function createGiftConfetti() {
  const emojis = ["❤️", "💋", "🔥", "♥", "😼"];
  const total = 60;

  for (let index = 0; index < total; index += 1) {
    const particle = document.createElement("span");

    particle.className = "gift-confetti";
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.animationDelay = `${Math.random() * 0.8}s`;
    particle.style.fontSize = `${16 + Math.random() * 16}px`;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 4500);
  }
}

async function toggleBackgroundMusic() {
  if (!bgMusic) {
    return;
  }

  try {
    if (bgMusic.paused) {
      await playBackgroundMusic();
    } else {
      bgMusic.pause();
    }
  } catch (error) {
    console.warn("A música não pôde ser iniciada automaticamente.", error);
  }
}

async function playBackgroundMusic() {
  if (!bgMusic) {
    return;
  }

  try {
    bgMusic.volume = 0.45;
    if (bgMusic.currentTime < BG_MUSIC_START_TIME) {
      bgMusic.currentTime = BG_MUSIC_START_TIME;
    }
    await bgMusic.play();
    musicToggle?.classList.add("is-playing");
    updateMusicIcon();
  } catch (error) {
    musicToggle?.classList.remove("is-playing");
    updateMusicIcon();
    console.warn("A música não pôde ser iniciada automaticamente.", error);
  }
}

function updateMusicIcon() {
  const icon = musicToggle?.querySelector("span");
  if (!icon || !bgMusic) {
    return;
  }

  icon.textContent = bgMusic.paused ? "♪" : "❚❚";
}

async function toggleSongCard(card, button) {
  const audioSrc = card?.dataset.audio;
  if (!audioSrc) {
    return;
  }

  if (currentSong && currentSongCard === card && !currentSong.paused) {
    stopCurrentSong();
    return;
  }

  stopCurrentSong();

  currentSong = new Audio(audioSrc);
  currentSong.volume = 0.75;
  currentSongCard = card;
  currentSongButton = button;

  card.classList.add("is-playing");
  button.textContent = "Pausar";

  currentSong.addEventListener("ended", stopCurrentSong);
  currentSong.addEventListener("error", () => {
    console.warn("A música do card não pôde ser carregada:", audioSrc);
    stopCurrentSong();
  });

  try {
    await currentSong.play();
  } catch (error) {
    console.warn("A música do card não pôde ser iniciada:", error);
    stopCurrentSong();
  }
}

function stopCurrentSong() {
  if (currentSong) {
    currentSong.pause();
    currentSong.currentTime = 0;
  }

  if (currentSongCard) {
    currentSongCard.classList.remove("is-playing");
  }

  if (currentSongButton) {
    currentSongButton.textContent = "Ouvir trecho";
  }

  currentSong = null;
  currentSongCard = null;
  currentSongButton = null;
}
