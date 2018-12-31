var allCards = document.querySelectorAll(".card");
var deck = document.querySelector(".deck");
var matched=  document.getElementsByClassName("match");
var OpenCards = [];//storing open and show cards in array
var matchFound = 0;

var moves = 0;
var movescounter = document.querySelector(".moves");


var allstar = document.querySelectorAll(".stars li");
var stars = document.querySelectorAll(".fa-star");
var matchedCard = [];
var clickoff = true;
var xintervals;
var sec = 0;
var  Timer = document.querySelector(".timer");

  var modal = document.querySelector(".modal-background");
  var content = document.querySelector(".modal-content");
  var body =document.querySelector("modal-body");
  var replaybtn =  document.getElementById("replay-game");
  var closebtn = document.querySelector(".closebtn");
  var modalbutton = document.querySelector(".modal-buttons");

//A restart button allows the player to reset the game board, the timer, and the star rating.
$(document).ready(function(){
  $('.restart').click(function(){
      location.reload();
  });
});

//Pushing nodelist yo array and The game randomly shuffles the cards. 
function shuffleDeck(){
const nodelist = document.querySelectorAll('.deck li');
var myArray = []; // empty Array
for (var i = 0; i < nodelist.length; i++) {
    var nodetoarray = nodelist[i];
     myArray.push(nodetoarray);
     shuffle(myArray);
     [].forEach.call(shuffle(myArray), function(item){
        deck.appendChild(item);
   });
 }
}
shuffleDeck();
//Card shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//2. Add the function to handle clicks
allCards.forEach(function(cards) {
cards.addEventListener( 'click', ()=> {//  console.log(event);
  if (clickoff) {
         startTimer();
         clickoff= false;
     }
  if (OpenCards.length < 2){
     cards.classList.add("open","show","disable");
    OpenCards.push(cards);//pushing click (cards)

    if(OpenCards.length === 2) {
//3.  The matching logic
       if (OpenCards[0].firstElementChild.className === OpenCards[1].firstElementChild.className){
         OpenCards[0].classList.add( "match","disable");
         OpenCards[1].classList.add( "match","disable");
        $(OpenCards[0]).off('click');
        $(OpenCards[1]).off('click');
        matchFound+=1;

         matchedCard.push(OpenCards[0],OpenCards[1]);


       OpenCards =[];
       Gameover();
}else {
  OpenCards[0].classList.add("open","show", "unmatch");
  OpenCards[1].classList.add("open","show", "unmatch");
         setTimeout(function(){
           OpenCards[0].classList.remove("open", "show","unmatch","disable");
           OpenCards[1].classList.remove("open", "show", "unmatch","disable");
           $(OpenCards[0]).off('click');
           $(OpenCards[1]).off('click');
           OpenCards = [];

       }, 1100);
}

//adding new moves
moveCount();


}
}

})
});
//winning condition
function Gameover(){
if(matchedCard.length === allCards.length){
  Congratulation();

}
}
// The number of moves the player has made
function moveCount() {

  moves++;
  // movescounter.textContent = `${moves} Moves`;
    movescounter.innerHTML = moves;

  if (moves == 1) {




}

Rating();


}
//The player should begin with a certain number of stars displayed on the screen.
//The number of moves made during the game should visually decrease this star rating
  function Rating (){
   if (moves > 10 && moves < 17){
        for( i= 0; i < allstar.length; i++){
            if(i > 1){
                stars[stars.length-1].style.visibility = "hidden";

            }
        }
    }
    else if (moves > 18){
        for( i= 0; i < allstar.length; i++){
            if(i > 0){
                stars[stars.length-1].style.visibility = "hidden";

            }
        }
    }
  }

//This timer should start when the player starts a game, and end when the player wins the game
  function startTimer() {
       xintervals = setInterval(ShowTime,1000);
  }
  function ShowTime() {
    sec++;
    function add(i) {
          return (i < 10) ? `0` + i : i;
      }
      var minutes = add(Math.floor(sec / 60));
      var seconds = add(sec % 60);
    Timer.innerHTML = `${minutes}:${seconds}`;
  }

  function stopTimer() {
      clearInterval(xintervals);
  }
//pop-up card shows after you match 
  function Congratulation() {
stopTimer();
moveCount();
  content.style.visibility ="visible";

  var starcount = document.querySelector(".stars").innerHTML;
    document.getElementById("total-moves").innerHTML = `Awesome! Your total moves is  ${moves+1}.`;
    document.getElementById("total-time").innerHTML = `It took you  ${Timer.innerHTML} time.`;
    document.getElementById("total-star").innerHTML=` Out of 3 stars you got  ${starcount}`;

closeModal();


}
//When you click in closebtn, y
function closeModal(){
closebtn.addEventListener('click', () => {
content.style.visibility = "hidden";

})
}


replaybtn.addEventListener('click',replayGame);
function replayGame(){
  location.reload();
content.style.visibility = "hidden";

}
