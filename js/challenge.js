// Initialize variables
let count = 0;
let timer;
let isPaused = false;
let likes = {};
const counterDisplay = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const heartButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentList = document.getElementById('list');

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    if (!isPaused) {
      count++;
      counterDisplay.textContent = count;
    }
  }, 1000);
}

plusButton.addEventListener('click', () => {
  count++;
  counterDisplay.textContent = count;
});

minusButton.addEventListener('click', () => {
  count--;
  counterDisplay.textContent = count;
});

heartButton.addEventListener('click', () => {
  likes[count] = (likes[count] || 0) + 1;
  updateLikesDisplay();
});

function updateLikesDisplay() {
  likesList.innerHTML = '';
  for (const [number, likeCount] of Object.entries(likes)) {
    const listItem = document.createElement('li');
    listItem.textContent = `${number} has been liked ${likeCount} time(s)`;
    likesList.appendChild(listItem);
  }
}

pauseButton.addEventListener('click', () => {
  if (isPaused) {
    isPaused = false;
    pauseButton.textContent = 'pause';
    startTimer();
    enableButtons();
  } else {
    isPaused = true;
    pauseButton.textContent = 'resume';
    clearInterval(timer);
    disableButtons();
  }
});

function disableButtons() {
  minusButton.disabled = true;
  plusButton.disabled = true;
  heartButton.disabled = true;
}

function enableButtons() {
  minusButton.disabled = false;
  plusButton.disabled = false;
  heartButton.disabled = false;
}

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const comment = commentInput.value.trim();
  if (comment) {
    const commentItem = document.createElement('p');
    commentItem.textContent = comment;
    commentList.appendChild(commentItem);
    commentInput.value = '';  
  }
});
window.onload = startTimer;
