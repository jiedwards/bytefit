import { api_key } from './credentials.js'
const meal_parameters = {
  'title': 'Recipe Name',
  'dishTypes': 'Meal Type',
  'analyzedInstructions': 'Instructions',
  'image': '',
  'nutrition': 'Nutritional Data',
  'readyInMinutes': 'Time to prepare'
};
const desired_nutrient_data = new Set(['Calories', 'Fat', 'Carbohydrates', 'Protein']);

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
  document.getElementById("recipeButton").innerHTML = "Re-generate";
  let table_row_headers = Object.keys(table_data[0]);
  generateTableHead(table, single_data_object);
  generateTableData(table, table_data);
}


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let property_header of data) {
    if (meal_parameters.hasOwnProperty(property_header)) {
      let th = document.createElement("th");
      let text = document.createTextNode(meal_parameters[property_header]);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

}

function generateTableData(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      if (meal_parameters.hasOwnProperty(key)) {
        if (key == 'image') {
          let imageCell = row.insertCell();
          var img = document.createElement('img');
          img.src = element[key];
          imageCell.appendChild(img);
        }
        else {
          let cell = row.insertCell();
          let cell_text = document.createTextNode(element[key])
          cell.appendChild(cell_text);
          break;
        }
      }
    }
  }
}

