var categoriesArray = ["animal", "career", "celebrity", "dev", "explicit", "fashion", "food", "history", "money", "movie", "music", "political", "religion", "science", "sport", "travel"];
var dropdown = document.getElementById("select");

categoriesArray.forEach(function(category, i) {
    var option = document.createElement("option");
    option.value = category;
    option.text = category;
    option.id = i;
    dropdown.add(option);
});

async function newJoke() {
    var selectedCategory = dropdown.options[dropdown.selectedIndex].value;
    const jokes = await fetch(`https://api.chucknorris.io/jokes/random?category=${selectedCategory}`);
    const data = await jokes.json();
    document.getElementById('jokuVieta').innerHTML = data.value;
}