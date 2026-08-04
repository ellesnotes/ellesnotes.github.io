const field = document.getElementById("starField");
const starPath =
  "M12 1.5 L14.8 8.6 L22.5 9.2 L16.6 14.1 L18.5 21.6 L12 17.4 L5.5 21.6 L7.4 14.1 L1.5 9.2 L9.2 8.6 Z";

const isMobile = window.innerWidth < 480;
const pairCount = isMobile ? 12 : 24;
const edgeOffsetMin = isMobile ? 3 : 8;     // closest a star can sit to the edge (%)
const edgeOffsetRange = isMobile ? 20 : 28; // how far into the screen the band extends (%)

const rand = (min, range) => min + Math.random() * range;

function makeStar(xPercent, yPercent, size, floatDelay, twinkleDelay, minOpacity) {
  const floatDur = rand(3, 2.5);
  const twinkleDur = rand(1.2, 2);

  const wrap = document.createElement("div");
  Object.assign(wrap.style, {
    position: "absolute",
    left: xPercent + "%",
    top: yPercent + "%",
  });
  wrap.style.setProperty("--minOpacity", minOpacity);
  wrap.style.animation =
    `floatStar ${floatDur}s ease-in-out ${floatDelay}s infinite, ` +
    `twinkleStar ${twinkleDur}s ease-in-out ${twinkleDelay}s infinite`;

  wrap.innerHTML = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24">
      <path d="${starPath}" fill="#FFFFFF" stroke="#8A8A8A" stroke-width="1.2" stroke-linejoin="round"/>
    </svg>`;
  field.appendChild(wrap);
}

for (let i = 0; i < pairCount; i++) {
  const leftXPercent = rand(edgeOffsetMin, edgeOffsetRange);
  const yPercent = rand(4, 92);
  const size = rand(10, 8);
  const minOpacity = rand(0.35, 0.4);
  const floatDelay = rand(0, 2.5);
  const twinkleDelay = rand(0, 2.5);

  const rightXPercent = 100 - leftXPercent;

  makeStar(leftXPercent, yPercent, size, floatDelay, twinkleDelay, minOpacity);
  makeStar(rightXPercent, yPercent, size, floatDelay + 0.3, twinkleDelay + 0.3, minOpacity);
}