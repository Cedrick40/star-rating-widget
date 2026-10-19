// ===== State =====
// The selected rating and the hover value are kept separately.
// Hovering only changes "hover"; only a click (or arrow key) changes "rating".
const state = {
  rating: 0,   // 0 means no rating yet
  hover: 0,    // 0 means the mouse is not over a star
};

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

// ===== Elements =====
const starsEl = document.getElementById("stars");
const stars = Array.from(starsEl.querySelectorAll(".star"));
const textEl = document.getElementById("rating-text");
const resetBtn = document.getElementById("reset");

// Each star stores its value in a data attribute (data-value="3"), read with dataset
const valueOf = (star) => Number(star.dataset.value);

// ===== Rendering =====
function render() {
  const shown = state.hover || state.rating;     // preview wins while hovering

  stars.forEach((star) => {
    const value = valueOf(star);
    star.classList.toggle("filled", value <= shown);
    star.setAttribute("aria-checked", String(value === state.rating));
    // Only one star is in the tab order (roving tabindex): the selected one, or the first
    star.tabIndex = value === (state.rating || 1) ? 0 : -1;
  });

  starsEl.classList.toggle("previewing", state.hover > 0);

  textEl.textContent = state.rating
    ? "Your rating: " + state.rating + " out of 5 (" + LABELS[state.rating] + ")"
    : "No rating yet. Click a star.";

  resetBtn.disabled = state.rating === 0;
}

// ===== Events =====
// Event delegation: one listener on the container handles all five stars
starsEl.addEventListener("click", (e) => {
  const star = e.target.closest(".star");
  if (!star) return;
  state.rating = valueOf(star);
  render();
});

starsEl.addEventListener("mouseover", (e) => {
  const star = e.target.closest(".star");
  if (!star) return;
  state.hover = valueOf(star);
  render();
});

starsEl.addEventListener("mouseleave", () => {
  state.hover = 0;
  render();
});

// Keyboard: arrow keys change the rating, like a radio group
starsEl.addEventListener("keydown", (e) => {
  let next = state.rating;
  if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(5, (state.rating || 0) + 1);
  else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(1, (state.rating || 2) - 1);
  else return;

  e.preventDefault();
  state.rating = next;
  render();
  stars[next - 1].focus();
});

// Reset the rating
resetBtn.addEventListener("click", () => {
  state.rating = 0;
  state.hover = 0;
  render();
});

render();