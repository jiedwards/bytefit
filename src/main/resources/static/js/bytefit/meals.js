apiKey = '';
const mealParameters = {
  'title': 'Recipe Name',
  'analyzedInstructions': 'Instructions',
  'image': '',
  'nutrition': 'Nutritional Data',
  'readyInMinutes': 'Time to prepare'
};
const desiredNutrientData = new Set(['Calories', 'Fat', 'Carbohydrates', 'Protein']);

async function generateComplexMealplan() {
  const calories = document.getElementById("calories").value;
  const numMeals = document.getElementById("num_meals").value;
  let dietChoice = "";
  if (document.querySelector('input[name="diet"]:checked')) {
    let dietChoice = document.querySelector('input[name="diet"]:checked').value;
  }

  const url = 'https://api.spoonacular.com/recipes/complexSearch?sort=random&instructionsRequired=true&addRecipeNutrition=true&addRecipeInformation=true&maxCalories=' + calories + '&minCarbs=0&minFat=0&minProtein=0&number=' + numMeals + '&diet=' + dietChoice + '&apiKey=' + apiKey;

  var response = await fetch(url);
  var data = await response.json();
  console.log(data);

  let table_data = data.results;
  let table = document.querySelector("table");
  //Ensures that table is reset after second button click.
  table.innerHTML = "";
  document.getElementById("recipeButton").innerHTML = "Re-generate";
  let table_row_headers = Object.keys(table_data[0]);
  generateTableHead(table, table_row_headers);
  generateTableData(table, table_data);
}


function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let property_header of data) {
    if (mealParameters.hasOwnProperty(property_header)) {
      let th = document.createElement("th");
      let text = document.createTextNode(mealParameters[property_header]);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

}

function generateTableData(table, mealplan_data) {
  for (let mealplan of mealplan_data) {
    let tableRow = table.insertRow();
    for (recipe in mealplan) {
      if (mealParameters.hasOwnProperty(recipe)) {
        switch (recipe) {
          case "image":
            let imageCell = tableRow.insertCell();
            var img = document.createElement('img');
            img.src = mealplan[recipe];
            imageCell.appendChild(img);
            break;
          case "nutrition":
            let nutritionCell = tableRow.insertCell();
            for (i = 0; i < mealplan[recipe].length; i++) {
              if (desiredNutrientData.has(mealplan[recipe][0].title)) {
                //To allow for multiple lines to be printed within one cell.
                nutritionCell.appendChild(document.createTextNode(mealplan[recipe][i].title + " - " + Math.round(mealplan[recipe][i].amount) + "g"));
                nutritionCell.appendChild(document.createElement("br"));
              }
            }
            break;
          case "analyzedInstructions":
            let instructionsCell = tableRow.insertCell();
            //Dynamically create buttons for each recipe row/cell.
            var buttonContent = '';
            for (i = 0; i < mealplan[recipe].length; i++) {
              buttonContent += "<b>" + mealplan[recipe][i].name + "</b><br />";
              for (j = 0; j < mealplan[recipe][i].steps.length; j++) {
                //Recipe instructions being added to popover through loop as they're in separate arrays in the api response.
                buttonContent += mealplan[recipe][i].steps[j].number + ". " + mealplan[recipe][i].steps[j].step + "<br />";
              }
            }
            var button = createPopoverButton(buttonContent);
            instructionsCell.appendChild(button);
            break;
          default:
            let cell = tableRow.insertCell();
            let cell_text = document.createTextNode(mealplan[recipe])
            cell.appendChild(cell_text);
            break;
        }
      }
    }
  }

  function createPopoverButton(buttonInformation) {
    var button = document.createElement('a');
    button.innerHTML = 'Instructions';
    button.setAttribute('data-toggle', 'tooltip');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('tabindex', 0);
    button.setAttribute('role', 'button');
    button.setAttribute('data-trigger', 'focus');
    button.setAttribute('data-html', 'true');
    button.setAttribute('data-placement', "bottom");
    button.setAttribute("data-content", buttonInformation);
    $('[data-toggle="tooltip"]').popover();
    return button;
  }
}

