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
  