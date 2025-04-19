const recipeForm = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');
const searchInput = document.getElementById('searchInput');

let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

function displayRecipes() {
    recipeList.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(li);
    });
}

function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}

function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeCategory').value = recipe.category;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;

    // Remove the recipe from the list to avoid duplication
    deleteRecipe(index);
}

recipeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('recipeName').value;
    const category = document.getElementById('recipeCategory').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;

    recipes.push({ name, category, ingredients, instructions });
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();

    recipeForm.reset();
});

function filterRecipes() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(searchTerm) || 
        recipe.ingredients.toLowerCase().includes(searchTerm)
    );
    
    recipeList.innerHTML = '';
    filteredRecipes.forEach((recipe, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${recipe.name} (${recipe.category})</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(li);
    });
}

displayRecipes();