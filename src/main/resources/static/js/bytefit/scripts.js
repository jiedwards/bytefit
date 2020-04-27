function navigateToMealPlanGenerator() {
    let userCalorieValue = document.getElementById("navigateToMealPlanButton").value;
    window.location.href = "/" + '#' + userCalorieValue;
}

function caloricVerification() {
    var userCalorieValue = window.location.hash.substring(1)
    if (userCalorieValue) {
        document.getElementById("calories").value = userCalorieValue;
    }
    else {
        document.getElementById("calories").value = 2000;
    }
}

// Displays more information on certain area's of the page when scrolled over.
function moreInfo(choice) {

    tippy('#goalTooltip', {
        placement: 'bottom',
        content: "Why we need this data? <br><h7>If <u>lose weight</u> is chosen, a calorie defecit of 500 calories is applied with the aim to lose 1lb per week</h7><br><h7>If <u>gain weight</u> is chosen, a calorie surplus of 500 calories is applied with the aim to gain 1lb per week</h7><br><h7>If <u>maintain weight</u> is chosen, no calorie defecit/surplus is applied</h7>",
    })

    tippy('#activityTooltip', {
        placement: 'bottom',
        content: "Why we need this data? <br><h7>To provide you with an accurate calorie reading, it's important to know how active you are on a daily basis as this factor contributes to your daily calorie allowance.</h7> <br> <h7><u>Sedentary</u>: Very little exercise weekly </h7><br><h7><u>Lightly Active</u>: Light Exercise: 1-3 days per week </h7><br><h7><u>Moderately Active</u>: A good amount of exercise, 5-7 times per week </h7><br><h7><u>Very Active</u>: Hard Exercise Daily: 2x's per day </h7><br><h7><u>Extremely Active</u>: Hard Exercise: Twice or more daily, marathon training, triathalon etc. </h7>",
    })

    tippy('#dietaryTooltip', {
        placement: 'bottom',
        content: "<u>Dietary Options</u><br>" +
            "<ul><li><b>Vegetarian</b>: A vegetarian is someone who doesn’t eat meat and fish.</li>" +
            "<li><b>Vegan</b>: No animal products, meaning no meat and fish like vegetarians, but also cut out all animal products e.g. dairy.</li>" +
            "<li><b>Ketogenic</b>: Low-carb diet. The idea is to get more calories from protein and fat and less from carbohydrates.</li></ul>" +
            "<li><b>Pescetarian</b>: Diet is mostly vegetarian but includes fish and seafood.</li>"
    })

    tippy('#signupTooltip', {
        placement: 'bottom',
        content: "<ul>" +
            "<li>Save meal plans to PDF</li>" +
            "<li>Dietary choices</li>" +
            "<li>Save caloric calculations</li>" +
            "</ul>" +
            "<p> Sign up for an account to take advantage of these benefits </p>"
    })
}