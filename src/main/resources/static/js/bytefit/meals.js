import { api_key } from './credentials.js'
const meal_parameters = {
  'title': 'Recipe Name',
  'dishTypes': 'Meal Type',
  'analyzedInstructions': 'Instructions',
  'image': '',
  'nutrition': 'Nutritional Data',
  'readyInMinutes': 'Time to prepare'
};

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

  let table_data = data.results;
  let table = document.querySelector("table");
  //Ensures that table is reset after second button click.
  table.innerHTML = "";
  let table_row_headers = Object.keys(table_data[0]);
  generateTableHead(table, single_data_object);
}


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    if (meal_parameters.hasOwnProperty(key)) {
      let th = document.createElement("th");
      let text = document.createTextNode(meal_parameters[key]);
      console.log(meal_parameters[key])
      th.appendChild(text);
      row.appendChild(th);
    }
  }

}