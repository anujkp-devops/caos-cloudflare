const BASE_TITLE = "CAOS IS LIFE";
const TITLE_SEPARATOR = " • ";

const buildTitleFrame = (offset) => {
  if (!BASE_TITLE.length) return "";
  const normalized = ((offset % BASE_TITLE.length) + BASE_TITLE.length) % BASE_TITLE.length;
  const leading = BASE_TITLE.slice(normalized);
  const trailing = BASE_TITLE.slice(0, normalized);
  return trailing ? `${leading}${TITLE_SEPARATOR}${trailing}` : leading;
};

document.addEventListener("DOMContentLoaded", () => {
  const heading = document.querySelector("h1");
  if (heading) {
    heading.style.letterSpacing = "0.08em";
  }

  document.title = BASE_TITLE;

  let tick = 0;
  setInterval(() => {
    tick += 1;
    document.title = buildTitleFrame(tick);
  }, 1200);
});
