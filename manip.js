var possibleGoals = [0,1];  // All the Goals in the game (0 and 1)

var team1= {
    name:'Argentina',
    goals: [],
    score: 0
};
var team2= {
    name:'Portugal',
    goals: [],
    score: 0
};

var turn;

window.onload = ()=>{
    selectTurn(); // Decide who is going to start playing first
    updateButtonText(); // Update the text inside the button
    updateScore(); // Initialize the score board with 0;
    updateNames(); // Update the team names
}
// Function to decide who plays first
var selectTurn = ()=>{
    turn = Math.round(Math.random())+1;
    console.log(turn);
}

var updateButtonText = ()=>{
    var button = document.getElementById("strike-button");
    console.log(button);
    var result = document.getElementById("result");
    result.style.visibility = "";
    // check if the game is over 
    if(team1.goals.length == 5 && team2.goals.length == 5){
        button.remove(); //delete the strike button
        // check if match is draw
        result.textContent = team1.score === team2.score? `It is a draw`:`${team1.score>team2.score?team1.name:team2.name} Wins`;
    }else{
        // Interchanging the teams for playing 
        turn = team1.goals.length === 5? 2: team2.goals.length === 5?1 : turn;
        button.textContent = `Strike (${turn===1?team1.name:team2.name})`;
    }
}

// function to update the team score
var updateScore =()=>{
    //updating the team1 score
    document.getElementById("team-1-score").textContent = team1.score;
    //updating the team2 score
    document.getElementById("team-2-score").textContent = team2.score;
    updateGoals();
}

var updateGoals=()=>{
var teamOneGoalsElement = document.getElementById("team-1-round-goals").children;
var teamTwoGoalsElement = document.getElementById("team-2-round-goals").children;
team1.goals.forEach((goal,index)=>{
    teamOneGoalsElement[index].textContent = goal;
});
team2.goals.forEach((goal,index)=>{
    teamTwoGoalsElement[index].textContent = goal;
});
}

// function to update team names
var updateNames=()=>{
    document.getElementById("team-1-name").textContent = team1.name;
    document.getElementById("team-2-name").textContent = team2.name;
}

var handleStrikeButtonClick = ()=>{
    // select a random goal from list of possible goals
    var goal = possibleGoals[Math.floor(Math.random()*possibleGoals.length)];
    console.log(goal);
    if(turn ===1){
        team1.goals.push(goal); // update goals
        team1.score = calculateScore(team1.goals);
      //  console.log(team1.score);
    }
    else{
        team2.goals.push(goal); // updating goals
        team2.score = calculateScore(team2.goals);
       // console.log(team2.score);
    }
    updateButtonText();
    updateScore();

}
var calculateScore = (goals)=>{
    // calculating the total scores of each team 
    return goals.reduce((total,goal)=>total+goal,0);
}; 
