const Data = {
    "1": {
        "text": "Your owner is out the whole day on a day trip. How do you decide to spend the whole day?",
        "image" : "images/question1.PNG",
        "choices": {
            "Sit at the door, meow, and wait for them while sulking all day": [2, ["Hairless"]],
            "Who cares? I get to sleep all day!": [2, ["Black", "Tabby"]],
            "Yay!! I can do whatever I want!! I can try breaking into the Pantry!": [2, ["Gray", "Orange", "Tuxedo"]],
            "Why is it so quiet…?": [2, ["Calico", "White"]]
        }
    },
    "2": {
        "text": "Oh no!! Your owner returns with a new cat! How do you react?",
        "image" : "images/question2.PNG",
        "choices": {
            "Who the heck is this?! I’m not sharing my wet food! I’m just going to ignore them.": [3, ["Black", "Tuxedo"]],
            "Yay! I’ve been so lonely. I’m excited to have a new friend!": [3, ["White", "Hairless"]],
            "No one comes into my house! I’m going to make their life a living nightmare.": [3, ["Gray", "Orange"]],
            "I wasn’t expecting this, but I'm curious! Who knows what this new cat will be like?": [3, ["Calico", "Tabby"]]
        }
    },
    "3": {
        "text": "Hmph! This new cat decides to take your favorite spot on the cat tree! You…",
        "image" : "images/question3.PNG",
        "choices": {
            "Hiss! Make it extremely clear that this is my home and my spot!": [4, ["Gray", "Tabby", "Calico"]],
            "Whatever. I will just find another spot.": [4, ["Tuxedo"]],
            "Decide to join them and cuddle!": [4, ["Hairless", "Black"]],
            "Whine at my owner! This is not fair!!": [4, ["Orange", "White"]]
        }
    },
    "4": {
        "text": "Your owner feels bad and gives you treats to make you feel better. You decide to…",
        "image" : "images/question4.PNG",
        "choices": {
            "Take the offer! Eat the yummy treats with lots of delight.": [5, ["Black", "Tabby", "White"]],
            "I feel bad that the new cat doesn't get any. Let me give one to them!": [5, ["Hairless"]],
            "The treats are irresistible so I end up taking them, but I keep whining at my owner so they know I’m still upset": [5, ["Orange", "Calico"]],
            "Watch my owner carefully to see where they place the treats…maybe I can have a second round of treats later!!": [5, ["Gray", "Tuxedo"]],
        }
    },
    "5": {
        "text": "Eh? The front door is suddenly open. The outside world! You…",
        "image" : "images/question5.PNG",
        "choices": {
            "Stay inside. I’m sure this is a lot better than what the outside has to offer": [6, ["White", "Tabby"]],
            "Immediately go outside and explore! I’ll be back when it's time to eat!": [6, ["Orange", "Gray", "Tuxedo"]],
            "It looks fun! But scary. Let me convince the new cat to go outside with me.": [6, ["Hairless", "Calico"]],
            "Didn’t even notice. Was sleeping the entire time!": [6, ["Black"]]
        }
    },
    "6": {
        "text": "You hear the sound of the food container. It’s dinner time! You…",
        "image" : "images/question6.PNG",   
        "choices": {
            "FOOD! I immediately run over to eat as it’s poured out of the container.!": [7, ["Orange", "Calico"]],
            "I’ll wait! It will come to me all the same.": [7, ["Tuxedo", "White", "Hairless"]],
            "What’s that sound? It sounds familiar…I’ll go over to investigate.": [7, ["Calico"]],
            "It’s that time. I’m already waiting by the bowl and meowing at them to hurry up!": [7, ["Black", "Gray"]]
        }
    },
    "7": {
        "text": "It's time to go to bed! The moon is out. You…",
        "image" : "images/question7.PNG",   
        "choices": {
            "Now’s my time to get my revenge. I’m chasing that new cat around.": [8, ["Gray"]],
            "Lay down at my favorite spot on the cat tree.": [8, ["Tuxedo", "Black", "Tabby"]],
            "Cuddle with my owner, they look exhausted.": [8, ["Hairless", "White"]],
            "I still have so much energy! Let’s play! I can still play with my favorite toy!": [8, ["Orange", "Calico"]]
        }
    }
};

const kitties = { //creates counters
    "Orange": 0,
    "Tabby": 0,
    "White": 0, 
    "Gray": 0, 
    "Calico": 0, 
    "Tuxedo": 0, 
    "Hairless": 0, 
    "Black": 0
};

let currentQuestion = 1; 

function startQuiz() {
    document.querySelector(".title").style.display = "none"; // Hide the title
    document.querySelector(".subheader").style.display = "none"; // Hide the subheader
    document.querySelector(".container").style.display = "none"; // Hide the homepage container

    document.getElementById("question-container").style.display = "block"; // Show question container
    updateQuestion(); // Show the first question
}

function nextQuestion(choice) {
    const selectedChoice = Data[currentQuestion].choices[choice];
    const nextQuestionNumber = selectedChoice[0];
    const kittyTypes = selectedChoice[1];

    kittyTypes.forEach(kitty => { // Update scores
        kitties[kitty]++;
    });

    if (Data[nextQuestionNumber]) { // Move to the next question
        currentQuestion = nextQuestionNumber;
        updateQuestion();
    } else {
        showResults();
    }
}

function updateQuestion() { // Retrieve data from each question
    const questionData = Data[currentQuestion];
    document.getElementById("question-text").innerText = questionData.text;
    document.getElementById("question-image").src = questionData.image;

    const choicesContainer = document.getElementById("choices-container");
    choicesContainer.innerHTML = ""; // Clear previous choices

    Object.keys(questionData.choices).forEach(choiceText => {
        const button = document.createElement("button");
        button.className = "choice-button"; // Buttons
        button.innerText = choiceText;
        button.onclick = () => nextQuestion(choiceText);
        choicesContainer.appendChild(button);
    });
}

function showResults() {
    const maxScore = Math.max(...Object.values(kitties));
    const finalPersona = Object.keys(kitties).find(kitty => kitties[kitty] === maxScore);
    
    // Prepare results container
    const resultsContainer = document.getElementById("question-container");
    resultsContainer.innerHTML = ""; // Clear previous content

    // Create the results heading
    const resultHeading = document.createElement("h2");
    resultHeading.innerText = `Your cat persona is: ${finalPersona}!`;
    resultsContainer.appendChild(resultHeading);
    
    // Create the image element for the cat persona
    const catImage = document.createElement("img");
    catImage.src = `images/${finalPersona}.PNG`; // Assumes image files are named after the cat types
    catImage.alt = finalPersona;
    catImage.style.width = "300px"; // Adjust size as needed
    resultsContainer.appendChild(catImage);
    
    // Create a description block for each cat type
    const descriptions = {
        "Orange": "Energetic, Stubborn, and Determined.",
        "Tabby": "Intuitive, Vocal, and Adventurous.",
        "White": "Gentle, Delicate, and Affectionate.",
        "Gray": "Reserved, Curious, Fast Learner and Experimental",
        "Calico": "Assertive, Unique, and Socially Aware.",
        "Tuxedo": "Intelligent, Quirky, and Fun",
        "Hairless": "Warm, Spontaneous, Friendly, and Non-Judgemental.",
        "Black": "Independent, Mysterious, and Affectionate."
    };

    const traits = {
    "Orange": ["- Makes likes and dislikes extremely honest.",
               "- Follows their heart.",
               "- Strong willed.",
               "- Main character energy.",
               "- 'If I put my mind to it, I can do it.'"],
    "Tabby": ["- Sassy and independent.",
              "- Feisty if you challenge them.",
              "- Not afraid to let others know what they want.",
              "- Can be moody, but fun when in a good mood."],
    "White": ["- Calm & gentle with others.",
              "- 'I'll do it if you really want me to.'",
              "- Loves cuddles.",
              "- Enjoys alone time, but are very affectionate towards others."],
    "Gray": ["- Very independent and prefers to be left alone.",
             "- Sometimes a menace.",
             "- No thoughts just meow meow."],
    "Calico": ["- Unpredictable.",
               "- You will never find someone like them.",
               "- Changes personality based on occasion."],
    "Tuxedo": ["- Sophisticated.",
               "- Will silently judge you.",
               "- Really fun and outgoing when you get to know them.",
               "- The type to surprise you personality-wise."],
    "Hairless": ["- Playful and fun.",
                 "- Strong desire to impress others.",
                 "- The type to take a bullet for you.",
                 "- Clingy and needy."],
    "Black": ["- Sleepy all the time.",
              "- Tends to be introverted and prefers to spend time alone.",
              "- 'If it happens, it happens.'",
              "- Gets along with everyone, but prefers their own company.",
              "- Won't make a fuss if they dislike something."]
}

    const descriptionText = document.createElement("p");
    descriptionText.innerText = descriptions[finalPersona];
    resultsContainer.appendChild(descriptionText);

    const traitsText = document.createElement("p");
    traitsText.innerText = traits[finalPersona].join('\n'); // Join the array of traits into a single string with new lines
    resultsContainer.appendChild(traitsText);

    // Optionally, add a button to restart the quiz
    const restartButton = document.createElement("button");
    restartButton.className = "restart-button";
    restartButton.innerText = "Restart Quiz";
    restartButton.onclick = () => location.reload(); // Reloads the page to restart the quiz
    resultsContainer.appendChild(restartButton);
}

document.getElementById("startButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    startQuiz(); // Start the quiz
});
