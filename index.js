// height - Reversed meanings
const TOP = 10; // Was BOTTOM, now represents the topmost part
const UPPER = 25; // Was LOW, now represents the upper middle part
const LOWER = 50; // Was HIGH, now represents the lower middle part
const BOTTOM = 75; // Was UPPER, now represents the bottommost part
const TOP_INNER = 60; // Adjusted to represent an inner upper threshold
const BOTTOM_INNER = 90; // Adjusted to represent an inner bottom threshold

// width
const LEFT_INNER = 25;
const RIGHT_INNER = 75;

// Calculate actual pixel values based on percentages of the screen dimensions
const topThreshold = window.innerHeight * (TOP / 100); // Now top
const upperThreshold = window.innerHeight * (UPPER / 100); // Now upper
const lowerThreshold = window.innerHeight * (LOWER / 100); // Now lower
const bottomThreshold = window.innerHeight * (BOTTOM / 100); // Now bottom
const topInnerThreshold = window.innerHeight * (TOP_INNER / 100); // Adjusted
const bottomInnerThreshold = window.innerHeight * (BOTTOM_INNER / 100); // Adjusted

const leftInnerThreshold = window.innerWidth * (LEFT_INNER / 100);
const rightInnerThreshold = window.innerWidth * (RIGHT_INNER / 100);

// Assuming the existence of a function to update position text and variables for current horizontal and vertical positions
function updatePositionText(horizontalPosition, verticalPosition) {
  let positionText = '';

  // Check if the position is within the inner bounds
  if (
    horizontalPosition >= LEFT_INNER &&
    horizontalPosition <= RIGHT_INNER &&
    verticalPosition >= BOTTOM_INNER &&
    verticalPosition <= TOP_INNER
  ) {
    positionText = 'inner';
  } else {
    // Determine the vertical position text
    if (verticalPosition > UPPER) {
      positionText = 'upper outer';
    } else if (verticalPosition > HIGH && verticalPosition <= UPPER) {
      positionText = 'high outer';
    } else if (verticalPosition >= LOW && verticalPosition <= HIGH) {
      positionText = 'low outer';
    } else if (verticalPosition < LOW) {
      positionText = 'bottom outer';
    }

    // Append " left" or "right" based on the horizontal position
    if (horizontalPosition < LEFT_INNER) {
      positionText += ' left';
    } else if (horizontalPosition > RIGHT_INNER) {
      positionText += ' right';
    }
  }

  // Assuming a function exists to actually update the position text on the page or console
  console.log(positionText); // Replace this with the actual function to update the position text
}

function displayPositionText(position) {
  const textElement = document.createElement('div');
  textElement.classList.add('text-display');
  textElement.textContent = position;
  document.body.appendChild(textElement);

  // Show the text
  textElement.style.display = 'block';

  // Hide the text after 1 second
  setTimeout(() => {
    textElement.style.display = 'none';
    document.body.removeChild(textElement);
  }, 1000);
}

const square = document.querySelector('.red-square');

const TENTH_OF_SECOND = 100; // 1/10th of a second
let minimalTimeBetweenPunches = TENTH_OF_SECOND * 25; // Initially 2.5 seconds
let maximumTimeBetweenPunches = TENTH_OF_SECOND * 40; // Initially 4 seconds
let intervalID; // Store the interval ID for clearing

function moveSquare() {
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

function startMovingSquare() {
  clearInterval(intervalID); // Clear existing interval
  intervalID = setInterval(
    moveSquare,
    Math.random() * (maximumTimeBetweenPunches - minimalTimeBetweenPunches) +
      minimalTimeBetweenPunches
  );
}

document.getElementById('minTimeInput').addEventListener('change', function () {
  minimalTimeBetweenPunches = TENTH_OF_SECOND * this.value * 10;
  startMovingSquare(); // Restart with new min time
});

document.getElementById('maxTimeInput').addEventListener('change', function () {
  maximumTimeBetweenPunches = TENTH_OF_SECOND * this.value * 10;
  startMovingSquare(); // Restart with new max time
});

startMovingSquare(); // Initial call to start moving the square

// Calculate the top and height for the black rectangle
const topPosition = window.innerHeight * 0.4; // 40% from the top
const rectangleHeight = window.innerHeight * 0.6; // Extends to the bottom, hence 60% of the window's height

// Access the black rectangle element
const blackRectangle = document.getElementById('blackRectangle');

// Set the style properties for the black rectangle
blackRectangle.style.left = `${leftInnerThreshold}px`;
blackRectangle.style.width = `${rightInnerThreshold - leftInnerThreshold}px`;
blackRectangle.style.top = `${topPosition}px`;
blackRectangle.style.height = `${rectangleHeight}px`;
