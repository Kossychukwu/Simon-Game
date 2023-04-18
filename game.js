//var
var 
buttonColours = ["red", "blue", "green", "yellow"],

gamePattern = [],

userClickedPattern = [];

var start = false;

var level = 0;

$(document).keypress(function () { 
    if (!start){
        $("#level-title").text("level " + level);

        nextSequence();

        start = true;
    } 
 });

var btn = $(".btn");

btn.click(function () {  
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});


//check answer

function checkAnswer(currentLevel){

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function () {
                    nextSequence();
                }, 1000);
            }
        }else{
            playSound("wrong")

            $("body").addClass("game-over");

            $("h1").text("Game Over, press any key to Restart!")
            setTimeout(() => {
                $("body").removeClass("game-over")
            }, 200);

            startOver();

        }

}


function nextSequence(){

    userClickedPattern = [];

    level++;

    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour =  buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);

    playSound(randomChosenColour);

}

//add sound to button click

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");

    audio.play();

}


//add animation

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
} 