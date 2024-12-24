// Define prices and categories
var trainingPlanPrices = {
    Beginner: 25.00,
    Intermediate: 30.00,
    Elite: 35.00
};

var privateCoachingRate = 9.50;
var competitionFee = 22.00;

var weightCategories = {
    Heavyweight: 100,
    "Light-Heavyweight": 100,
    Middleweight: 90,
    "Light-Middleweight": 81,
    Lightweight: 73,
    Flyweight: 66
};

// Main calculation function
function calculateAthleteCosts() {
    // Get values from the form
    var athleteName = document.getElementById("athleteName").value;
    var trainingPlan = document.getElementById("trainingPlan").value;
    var currentWeight = parseFloat(document.getElementById("currentWeight").value);
    var competitionCategory = document.getElementById("competitionCategory").value;
    var competitions = parseInt(document.getElementById("competitions").value);
    var privateHours = parseInt(document.getElementById("privateHours").value);

    // Validate inputs
    if (!trainingPlanPrices[trainingPlan]) {
        alert("Invalid training plan selected.");
        return;
    }

    if (privateHours > 5) {
        alert("Private coaching hours cannot exceed 5 hours per week.");
        return;
    }

    if (trainingPlan === "Beginner" && competitions > 0) {
        alert("Beginners are not eligible for competitions.");
        return;
    }

    // Calculate costs
    var weeklyFee = trainingPlanPrices[trainingPlan];
    var monthlyFee = weeklyFee * 4;
    var privateCoachingCost = privateHours * privateCoachingRate * 4;
    var competitionCost = competitions * competitionFee;

    var totalCost = monthlyFee + privateCoachingCost + competitionCost;

    // Display results in the results div
    var resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
  <h2>Monthly Summary</h2>
  <p><strong>Athlete Name:</strong> ${athleteName}</p>
  <p><strong>Monthly Training Fee:</strong> £${monthlyFee.toFixed(2)}</p>
  <p><strong>Private Coaching Cost:</strong> £${privateCoachingCost.toFixed(2)}</p>
  <p><strong>Competition Cost:</strong> £${competitionCost.toFixed(2)}</p>
  <p><strong>Total Monthly Cost:</strong> £${totalCost.toFixed(2)}</p>
`;

    // Compare weight
    if (currentWeight > weightCategories[competitionCategory]) {
        resultsDiv.innerHTML += `<p style="color: red;">Note: Current weight (${currentWeight}kg) exceeds the competition category limit (${weightCategories[competitionCategory]}kg).</p>`;
    } else {
        resultsDiv.innerHTML += `<p style="color: green;">Current weight (${currentWeight}kg) is within the competition category limit (${weightCategories[competitionCategory]}kg).</p>`;
    }
}