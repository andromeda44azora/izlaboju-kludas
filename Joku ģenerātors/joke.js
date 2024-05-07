const displayJoke = document.getElementById("display-joke");
const category = document.getElementById("category");
let chosenCategory = "dev";

category.addEventListener("change", () => {
    chosenCategory = category.value;
    console.log("Chosen category:", chosenCategory);
});

async function generateCategoryOptions() {
    let outPut = "";

    try {
        const results = await fetch(`https://api.chucknorris.io/jokes/categories`);

        if (!results.ok) {
            throw new Error("Request failed.");
        }

        const data = await results.json();
        console.log("Categories data:", data);

        category.removeAttribute("disabled");

        data.forEach((category) => {
            outPut += `<option value="${category}">${category}</option>`;
        });

        console.log("Generated HTML for options:", outPut);

        category.innerHTML = outPut;
        category.value = chosenCategory;
    } catch (error) {
        console.error(error);
    }
}
generateCategoryOptions();

async function fetchJoke() {
    const errorMessage = `"DO NOT DISTURB!" Chuck Norris is currently entertaining guests in his hotel room.`;

    try {
        const results = await fetch(
            `https://api.chucknorris.io/jokes/random?category=${chosenCategory}`
        );

        if (!results.ok) {
            displayJoke.textContent = errorMessage;
            throw new Error("Request failed.");
        }

        const data = await results.json();
        console.log("Joke data:", data);

        if (!data.value) {
            displayJoke.textContent = "No joke available for this category.";
        } else {
            displayJoke.textContent = data.value;
        }
    } catch (error) {
        displayJoke.textContent = errorMessage;
        console.error(error);
    }
}