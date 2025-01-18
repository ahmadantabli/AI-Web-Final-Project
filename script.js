// Change the background color of header when scrolling
const head = document.getElementById('header');

window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
        head.classList.add("scrolled-header");
    } else {
        head.classList.remove("scrolled-header");
    }
});




// Quiz page
let currentQuestion = 1; // Track the current question number
const totalQuestions = 10; // Total number of questions in the quiz

// Correct answers for each question
const correctAnswers = {
    q1: "A",
    q2: "D",
    q3: "A",
    q4: "B",
    q5: "A",
    q6: "D",
    q7: "B",
    q8: "C",
    q9: "D",
    q10: "D",
};

// Store the user's answers
let userAnswers = {};

// Get references to various DOM elements for easy access
const nextButton = document.getElementById('next-btn'); // "Next" button element
let restartButton = document.getElementById('restart-btn'); // "Restart" button element
const feedbackDiv = document.getElementById('feedback'); // Feedback message area
const resultDiv = document.getElementById('result'); // Result display area
const quiz_introduction = document.getElementById('quiz-intro'); // Introduction section

// Event listener for restart button
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

// Event listener for the "Next" button when a user selects an answer
nextButton.addEventListener('click', () => {
    // Get the selected answer for the current question
    const selectedAnswer = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    // If no answer is selected, show an error message and return
    if (!selectedAnswer) {
        feedbackDiv.innerText = "Please select an answer before proceeding!";
        return; // Stop further execution if no answer is selected
    }

    // Store the selected answer in the userAnswers object
    userAnswers[`q${currentQuestion}`] = selectedAnswer.value;

    // Check if the selected answer matches the correct answer
    const correctAnswer = correctAnswers[`q${currentQuestion}`];
    if (selectedAnswer.value === correctAnswer) {
        feedbackDiv.innerText = "✅ Correct!"; // Show feedback if the answer is correct
    } else {
        feedbackDiv.innerText = "❌ Incorrect."; // Show feedback if the answer is incorrect
    }
    feedbackDiv.style.display = 'block';


    setTimeout(() => {
        feedbackDiv.style.display = 'none';
        // Hide the current question after the user selects an answer
        document.getElementById(`q${currentQuestion}`).style.display = 'none';
        currentQuestion++; // Increment the question number

        // Get the next question element by ID
        const nextQuestion = document.getElementById(`q${currentQuestion}`);

        // If there is a next question, show it
        if (nextQuestion) {
            nextQuestion.style.display = 'flex';
            nextQuestion.style.justifyContent = 'center';
            nextQuestion.style.alignItems = 'center';
            nextQuestion.style.flexDirection = 'column';
        } else {
            // If no more questions, show the result
            showResult();
        }

    }, 1200)



});

// Function to calculate and display the final result
function showResult() {
    let score = 0;

    // Compare each of the user's answers with the correct answers
    for (const question in correctAnswers) {
        if (userAnswers[question] === correctAnswers[question]) {
            score++; // Increment the score if the answer is correct
        }
    }

    // Hide the quiz introduction section once the quiz is completed
    quiz_introduction.style.display = 'none';
    // Display the user's score on the result section
    resultDiv.innerText = `Quiz completed! You scored ${score} out of ${totalQuestions}.`;

    // Hide the Next button since the quiz is finished
    nextButton.style.display = 'none';
    // Show the Restart button for the user to retake the quiz
    restartButton.style.display = 'block';
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 1; // Reset the current question to 1 (start the quiz)
    userAnswers = {}; // Clear the user's answers

    // Reset the display for each question
    for (let i = 1; i <= totalQuestions; i++) {
        const questionDiv = document.getElementById(`q${i}`);
        if (questionDiv) {
            questionDiv.style.display = 'none'; // Hide the question div
            const selectedOption = questionDiv.querySelector('input[name="q' + i + '"]:checked');
            if (selectedOption) selectedOption.checked = false; // Clear any previously selected answer
        }
    }

    // Show the first question
    document.getElementById('q1').style.display = 'block';

    // Reset UI elements (feedback, result, etc.)
    resultDiv.innerText = ''; // Clear the result text
    feedbackDiv.innerText = ''; // Clear the feedback text
    quiz_introduction.style.display = 'flex'; // Show the introduction again
    quiz_introduction.style.flexDirection = 'column'; // Ensure the correct flex direction
    nextButton.style.display = 'block'; // Show the Next button
    document.getElementById('restart-btn').style.display = 'none'; // Hide the Restart button
}
