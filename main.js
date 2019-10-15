var items = document.querySelectorAll('.item');
var squares = Array.from(items);
var emojiTag = document.querySelectorAll('.back');
var emojis = ['🦄', '🐨', '🐼', '🐶', '🐙', '🦀', '🦄', '🐨', '🐼', '🐶', '🐙', '🦀'];
var emojisArray = [];
var clickedArray = [];
var emojisCount = 0;
var count = 0;
var matched = [];

init();

function init () {
    setupGame();
    openAndMatch();
}

function setupGame () {
    for (var i = 0; i < squares.length; i++) {
        if (i % 2 === 0) {
            emojisCount++;
        }
        emojisArray.push ({
            content: emojis[emojisCount],
            id: squares[i],
            key: "square " + i,
            clicked: false,
            // solved: true
        });
    }
    shuffle(emojisArray); 
    //INSERT EMOJI IN THE BLOCK
    for (var i = 0; i < emojiTag.length; i++) {
        emojiTag[i].innerText = emojisArray[i].content;
        emojiTag[i].key = emojisArray[i].key;
    }
};

//function the rotates and matches squares on click
function openAndMatch (e) {
    squares.forEach(function (square) {
      square.addEventListener('click', function () {  
        ++count;     
//ROTATE THE SQUARE
        square.style.transform = "rotateY(180deg)";
        square.classList.add('clicked');
// ADD THE CLICKED SQUARE TO THE ARRAY TO CHECK IF THEY MATCH
        clickedArray.push(square);
        if (count === 1) {
            timer();
        }
        if (clickedArray.length === 2) {
            checkMatch();
        }
        else if (clickedArray.length === 3) {
            delete square.solved;
            reset();
            clickedArray.push(square);
        }
      })
    })
}

function reset () {
    clickedArray.forEach(function (element) {
        if (element.solved === false) {
            element.style.transform = "rotateY(0)";
            element.classList.remove('clicked');
            element.lastElementChild.style.backgroundColor = "white";
            element.lastElementChild.style.backgroundColor = "white";
            clickedArray = [];
        }
    })
}

function checkMatch () {
    if (clickedArray.length === 2) {
        var clicked1 = clickedArray[0];
        var clicked2 = clickedArray[1];
        
        if(clicked1.innerText === clicked2.innerText) {
            clicked1.solved = true;
            clicked2.solved = true;
            matched.push(clicked1);
            matched.push(clicked2);

            clicked2.lastElementChild.style.backgroundColor = "#5ad66f";
            clicked1.lastElementChild.style.backgroundColor = "#5ad66f";
            clickedArray = [];
        } else {
            clicked1.solved = false;
            clicked2.solved = false;
            
            clicked2.lastElementChild.style.backgroundColor = "#f44336";
            clicked1.lastElementChild.style.backgroundColor = "#f44336";
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}
// --------- TIMER --------------//
function timer () {
    var timeLeft = 60;
    var setTimer = setInterval(function() {
        minutes = parseInt(timeLeft / 60, 10);
        seconds = parseInt(timeLeft % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
            document.querySelector('.timer').textContent = minutes + ":" + seconds;
            timeLeft -= 1;
        if (timeLeft === 0) {
            clearInterval(setTimer);
            document.querySelector('.looseOrWinBlockWindow').style.display = 'block';
            document.querySelector('.looseOrWinText').innerHTML = "Loose";
        }
        else if (timeLeft > 0 && matched.length === 12) {
            clearInterval(setTimer);
            document.querySelector('.looseOrWinBlockWindow').style.display = 'block';
            document.querySelector('.looseOrWinText').innerHTML = "Win";
        }
    }, 1000);
}

document.querySelector('.playAgain').addEventListener('click', function () {
    window.location.reload(true);
})


