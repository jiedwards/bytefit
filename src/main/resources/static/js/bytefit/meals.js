import { api_key } from './credentials.js'

function generate_simple_mealplan() {

  let calories = document.getElementById("calories").value;
  let time_frame = document.getElementById("time_frame").value;
  let url = 'https://api.spoonacular.com/recipes/mealplans/generate?timeFrame=' + time_frame + '&targetCalories=' + calories + '&apiKey=' + api_key;

  fetch(url)
    .then(data => { return console.log(data.json()) })
    .then(res => { console.log(res) })
}