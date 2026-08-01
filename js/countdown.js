const target = new Date("2025-12-31T00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  const d = target - now;

  const days = Math.floor(d / (1000*60*60*24));
  const h = Math.floor((d / (1000*60*60)) % 24);
  const m = Math.floor((d / (1000*60)) % 60);
  const s = Math.floor((d / 1000) % 60);

  document.getElementById("countdown").textContent =
    `⏳ ${days} يوم ${h} س ${m} د ${s} ث`;
}, 1000);
const intro = document.getElementById("intro");
const skip = document.getElementById("skipBtn");

if (localStorage.getItem("introSeen")) {
  intro.remove();
} else {
  setTimeout(closeIntro, 30000);
}

skip.onclick = closeIntro;

function closeIntro() {
  localStorage.setItem("introSeen", "1");
  intro.style.opacity = "0";
  setTimeout(()=>intro.remove(), 1000);
}
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const flakes = Array.from({length:150},()=>({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*3+1,
  d: Math.random()+1
}));

function snow() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();

  flakes.forEach(f=>{
    ctx.moveTo(f.x,f.y);
    ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
  });

  ctx.fill();

  flakes.forEach(f=>{
    f.y += f.d;
    if (f.y > canvas.height) {
      f.y = 0;
      f.x = Math.random()*canvas.width;
    }
  });

  requestAnimationFrame(snow);
}

snow();
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const skip = document.getElementById("skipBtn");

  if (!intro) return;

  if (localStorage.getItem("introSeen")) {
    intro.classList.add("hidden");
  } else {
    setTimeout(() => closeIntro(), 30000);
  }

  skip.onclick = closeIntro;

  function closeIntro() {
    localStorage.setItem("introSeen", "1");
    intro.classList.add("hidden");
  }

  // Snow Canvas
  const canvas = document.getElementById("snow");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const flakes = Array.from({length:150},()=>({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*3+1,
      d: Math.random()+1
    }));

    function snow() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "white";
      ctx.beginPath();

      flakes.forEach(f=>{
        ctx.moveTo(f.x,f.y);
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      });

      ctx.fill();

      flakes.forEach(f=>{
        f.y += f.d;
        if (f.y > canvas.height) {
          f.y = 0;
          f.x = Math.random()*canvas.width;
        }
      });

      requestAnimationFrame(snow);
    }

    snow();
  }
});