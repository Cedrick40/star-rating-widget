# Star Rating Widget

A static, responsive star rating component where users click to choose a rating from 1 to 5. Built for Task 19 (Star Rating Widget) of my Web Development internship.

**Live page:** https://cedrick40.github.io/star-rating-widget/

## About the project
The page shows five stars. Moving the mouse over a star previews that rating in a lighter blue, and clicking it selects the rating in solid blue. The page then shows the current rating as text, for example "Your rating: 4 out of 5 (Very good)". A Clear rating button resets everything, and the stars can also be used with the keyboard.

## Objective
To practice DOM events, dynamic class toggling and simple UI state.

## Tools used
- HTML5
- CSS3
- JavaScript
- VS Code
- Git and GitHub (free)

## My approach
- **Planning:** I decided what the widget needs to remember (the selected rating and the hover value), what the user can do (hover, click, clear) and what should change on screen after each action.
- **Data attributes:** Each star is a `<button>` with a `data-value` attribute from 1 to 5. In JavaScript I read it with `star.dataset.value`, so the code does not depend on the star's position or text.
- **State kept separately:** A `state` object holds `rating` (the selected value) and `hover` (the value under the mouse). Hovering changes only `hover`, and clicking changes only `rating`. The stars shown are `state.hover || state.rating`, so the preview wins while the mouse is over the stars and the real rating comes back when it leaves.
- **Dynamic class toggling:** A single `render()` function runs after every change. It uses `classList.toggle("filled", value <= shown)` on each star, so the class always matches the state. A `previewing` class on the container makes preview stars lighter blue than selected ones, so the two states look different.
- **DOM events:** One `click` listener, one `mouseover` listener and one `mouseleave` listener sit on the container instead of on each star. This is event delegation, and `e.target.closest(".star")` finds the star that was used.
- **Resetting:** The Clear rating button sets `rating` and `hover` back to `0` and calls `render()`. It is disabled while there is no rating.
- **Showing the current rating:** A text line shows the selected rating and a short label (Poor, Fair, Good, Very good, Excellent). It uses `aria-live="polite"`, so screen readers announce changes.
- **Accessibility:** The stars form a `radiogroup`, each star is a `radio` button with an `aria-label` and `aria-checked`, and only one star is in the tab order. The arrow keys change the rating, and keyboard focus is clearly visible.
- **Layout and responsive design:** Flexbox centres the stars, and `clamp()` sizes them so they stay easy to tap on small screens. Stars are inline SVG, so they stay sharp at any size and take their colour from CSS.
- **Design:** The interface uses blue only, with a pale blue for empty stars, a lighter blue for the hover preview and a solid blue for the selected rating.
- **Testing:** I simulated hovering, clicking, leaving, using the arrow keys and clearing, and checked that the number of filled stars, the text and the Clear button matched the state each time. I also tried it on a narrow screen.

## Project structure
```
star-rating-widget/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Outcome
The result is a clean, accessible star rating widget with five clickable stars, a hover preview, a stored rating and a display of the current rating. This project taught me how to keep state in one place and redraw the page from it, how data attributes link HTML to JavaScript, and why a preview and a selection must be stored separately.

## Interview questions
- **How would you differentiate hover state from selected state?** Store them as two separate values. `hover` changes on mouseover and is cleared on mouseleave, while `rating` changes only on click. Show `hover || rating`, and use a different style (here a lighter blue through a `previewing` class) so users can tell a preview from a real choice.
- **What are data attributes used for?** They attach custom data to an HTML element using `data-*` attributes, such as `data-value="3"`. JavaScript reads them through `element.dataset`, and CSS can select on them. They avoid parsing text or guessing positions, and they keep data close to the element it describes.
- **How would you reset the rating?** Set the stored rating (and hover) back to `0`, then re-render so every star loses its `filled` class, the text goes back to "No rating yet" and the Clear button is disabled. I would also reset any `aria-checked` values so assistive technology matches the screen.

## Credits
Data attributes and class toggling follow the MDN documentation for `data-*` attributes and `Element.classList`. The font is Manrope from Google Fonts. The star shape is a simple SVG polygon.

## Author
Cedrick Niyibikora