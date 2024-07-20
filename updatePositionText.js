import { LEFT_INNER, RIGHT_INNER, BOTTOM_INNER, TOP_INNER, UPPER } from '.';

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
