$(document).ready(function () {
    var options = [
        {
            question: "Who is credited as the designer of the many statues which decorated the Parthenon?", 
            choice: ["Scopas", "Hesiod", "Phidias", "Praxiteles"],
            answer: 2,
            photo: "assets/images/Phidias.jpg"
         },
         {
             question: "Which of Henri Matisse's paintings was hung upside down at the Museum of Modern Art in New York for 46 days without anyone noticing?", 
            choice: ["Le Bonheur De Vivre", "Les Capucines", "Les Toits De Collioure", "Le Bateau"],
            answer: 3,
            photo: "assets/images/La_Bateau.jpg"
         }, 
         {
             question: "What artist is best known for a painting of his mother?", 
            choice: ["Francisco Goya", "James Abbott Mcneil Whistler", "Johannes Vermeer", "Pierre-Auguste Renoir" ],
            answer: 1,
            photo: "assets/images/Whistler.jpg"
        }, 
        {
            question: "English artist Andy Brown created a portrait of Queen Elizabeth II using what?", 
            choice: ["Fish bones", "Tea bags", "Socks", "Bubblegum" ],
            answer: 1,
            photo: "assets/images/Queen.jpg"
        }, 
        {
            question: "What artist sold a balloon dog for $58.4 million?", 
            choice: ["Gerhart Richter", "Jasper Johns", "Jeff Koons", "Christopher Wool" ],
            answer: 2,
            photo: "assets/images/balloon.jpg"
        }, 
        {
            question: "How many paintings did Vincent Van Gogh sell during his lifetime?", 
            choice: ["842", "1", "27", "193" ],
            answer: 1,
            photo: "assets/images/the-red-vineyard.jpg"
        }, 
        {
            question: "What painter was married to Mexican artist Diego Rivera?", 
            choice: ["Frida Kahlo", "Clara Montalba", "Tina Modotti", "Leonora Carrington" ],
            answer: 0,
            photo: "assets/images/frida.jpg"
        }, 
        {
            question: "Who was a creator of 'Campbell's Soup Cans'", 
            choice: ["Andy Warhol", "Jeff Koons", "Jackson Pollock", "Louise Bourgeois" ],
            answer: 0,
            photo: "assets/images/andy.jpg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
  //iterate through answer array and display
     $("#questionblock").html("<h2>" + pick.question + "</h2>");
     for(var i = 0; i < pick.choice.length; i++) {
     var userChoice = $("<div>");
      userChoice.addClass("answerchoice");
     userChoice.html(pick.choice[i]);
  //assign array position to it so can check answer
    userChoice.attr("data-guessvalue", i);
     $("#answerblock").append(userChoice);
    }
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
        }
        }, 3000);
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })