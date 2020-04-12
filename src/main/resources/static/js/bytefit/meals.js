import { api_key } from './credentials.js'

function generate_simple_mealplan() {

  let calories = document.getElementById("calories").value;
  let time_frame = document.getElementById("time_frame").value;
  let url = 'https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=' + time_frame + '&targetCalories=' + calories + '&apiKey=' + api_key;

  fetch(url)
    .then(data => { return console.log(data.json()) })
    .then(res => { console.log(res) })
}

async function generate_complex_mealplan() {
  const calories = document.getElementById("calories").value;
  const num_meals = document.getElementById("num_meals").value;

  const url = 'https://api.spoonacular.com/recipes/complexSearch?sort=random&maxCalories=' + calories + '&instructionsRequired=true&addRecipeNutrition=true&number=' + num_meals + '&apiKey=' + api_key;

  var response = await fetch(url);
  var data = await response.json();
  console.log(data);

}