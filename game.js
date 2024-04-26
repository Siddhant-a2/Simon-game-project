//variables used
var gamePattern=[];
var userClickedPattern=[];
var arr=["red","blue","green","yellow"];
var level=0;
var flag=0;
//button click
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});
//function for next sequence
function nextSequence(){

    level++;
    $("h1").text("level "+level);

    randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=arr[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
}
//function for sound
function playSound(name){
    var a=new Audio("sounds/"+name+".mp3");
    a.play();
}

//function for animation
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

//keypress
$(document).on("keydown",function(){
    if(flag==0){
        $("h1").text("level "+level);
        nextSequence();
        flag=1;
    }
});
//function to check answer
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to Restart!");
        startOver();
    }

}
//function to startover
function startOver(){
    level=0;
    gamePattern = [];
    userClickedPattern=[];
    flag = 0;
}