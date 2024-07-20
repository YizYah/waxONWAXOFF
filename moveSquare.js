import {
  square,
  leftInnerThreshold,
  rightInnerThreshold,
  bottomInnerThreshold,
  topInnerThreshold,
  bottomThreshold,
  lowerThreshold,
  upperThreshold,
  topThreshold,
} from '.';

export function moveSquare() {
  const maxWidth = window.innerWidth - square.offsetWidth * 2; // Adjust for growth
  const maxHeight = window.innerHeight - square.offsetHeight * 2; // Adjust for growth
  const randomX = Math.random() * maxWidth;
  const randomY = Math.random() * maxHeight;

  square.style.left = `${randomX}px`;
  square.style.top = `${randomY}px`;
  square.style.display = 'block';
  square.classList.remove('grow-and-fade'); // Reset the animation

  setTimeout(() => {
    square.classList.add('grow-and-fade'); // Start the grow and fade animation

    // Determine the location of the square and display "upper left", "upper right", "lower left", or "lower right"
    const squareRect = square.getBoundingClientRect();
    let positionText = '';

    if (
      squareRect.left >= leftInnerThreshold &&
      squareRect.left <= rightInnerThreshold &&
      squareRect.top <= bottomInnerThreshold &&
      squareRect.top >= topInnerThreshold
    ) {
      positionText = 'inner';
    } else {
      // Determine the vertical position text based on thresholds
      if (squareRect.top > bottomThreshold) {
        positionText = 'bottom outer';
      } else if (
        squareRect.top <= bottomThreshold &&
        squareRect.top > lowerThreshold
      ) {
        positionText = 'low outer';
      } else if (
        squareRect.top <= lowerThreshold &&
        squareRect.top > upperThreshold
      ) {
        positionText = 'low outer';
      } else if (
        squareRect.top <= topThreshold &&
        squareRect.top > upperThreshold
      ) {
        positionText = 'high outer';
      } else if (squareRect.top <= upperThreshold) {
        positionText = 'upper outer';
      }
    }
    // if (squareRect.top < window.innerHeight * 0.55) {
    //   positionText += "upper ";
    // } else {
    //   positionText += "lower ";
    // }
    if (squareRect.left < window.innerWidth / 2) {
      positionText += ' left';
    } else {
      positionText += ' right';
    }

    // displayPositionText(positionText);
  }, 500); // After initial display time
}
