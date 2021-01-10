
// creating the Array to store names and url's for images
var cardsArray = [
    {   'name': 'python',     'image': './images/python.png',},
    {   'name': 'css3',     'image': './images/css3.png',},
    {   'name': 'html',     'image': './images/html.png',},
    {   'name': 'javascript',     'image': './images/javascript.png',},
    {   'name': 'java',     'image': './images/java.png',},
    {   'name': 'react',     'image': './images/react.png',},
    {   'name': 'angular',     'image': './images/angular.png',},
    {   'name': 'vuejs',     'image': './images/vuejs.png',}
];

// dupilicating the cards
var gameGrid = cardsArray.concat(cardsArray); // will concat the array to itselft => doubles the array
gameGrid.sort(function() {    // function to randomize the array
    return 0.5 - Math.random();
})

// Variables for first and second guess of the user
var firstGuess = '';
var secondGuess = '';

var count = 0; // will count the guess
var previousTarget = null;  // storing the previous guess
var delay = 1200;   // delay for convenience and better application

// match function will be used to match guess, when the same images are found
var match = function() {
    var selected = document.querySelectorAll('.selected')   	// grabbing selected elements
    for( let i=0; i < selected.length; i++) {   // iteration through selected
        selected[i].classList.add('match');     // adding the class match to them
    }
}

// reset funktion will clear guesses, count and the prev target
var reset = function () {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');  // grabbing selected elements
    for( i=0;i< selected.length; i++) { //iterationg over selected
        selected[i].classList.remove('selected');   // removing the class selected
    }
}

// setting the div as variable game
var game = document.getElementById('game-board');
// Set a grid variable and create an element section
var grid = document.createElement('section');
// Set class of the section element to grid
grid.classList.add('grid');
// Append the grid to the gameboard
game.appendChild(grid);

// Loop over the elements in the gamegrid array, this will create a div for every image
for(let i=0; i < gameGrid.length;i++){
    // create a div element with the variable card
    var card = document.createElement('div');
    // setting the class
    card.classList.add('card');
    // set the data-name to the name value
    card.dataset.name = gameGrid[i].name;
    // front view element
    var front = document.createElement('div');
    front.classList.add('front');
    // back view element
    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].image})`; // back view background is the image in the array, onyl shows when selected (css)
    // front and back element added to card and card added to grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}

// EventListener to handel clicks
grid.addEventListener('click', function(event) {
    var clicked = event.target; // will grab the clicked element
    if( clicked.nodeName == 'SECTION' || clicked == previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected') ){
        return; // Nothing should happen, when Section is clicked or prev element is click or already matched elements are click or already selected elements are clicked
    }
    if( count < 2) { // count unter 2
        count++ // incrementing count
        if(count == 1){ // should be the first guess
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');   // setting first guess as selected
            // parentNode because we target the element front and want to change the class of card
        }else{
            secondGuess = clicked.parentNode.dataset.name; // should happen when second click
            clicked.parentNode.classList.add('selected');   // adding class selected
        }
        
        if(firstGuess != '' && secondGuess != '') {
            if( firstGuess == secondGuess) {
                setTimeout(match, delay);
                setTimeout(reset, delay);
            } else {
                setTimeout(reset, delay);
            }
        }
        previousTarget = clicked;
    }

})
