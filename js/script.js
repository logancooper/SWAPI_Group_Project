//Set the default dropdown values
const defaultShip = 'dev';
let currentShip = defaultShip;
//create a search list and grab the search button
const selectElement = document.createElement("select");
const searchButton = document.querySelector("#searchButton");

//On page load, fetch all of the ships and add an event listener to the search button
document.addEventListener("DOMContentLoaded", function(){
    fetchTheShips()
    searchButton.addEventListener("click", function(){
        fetchSpecificShip(currentShip);
    })
})

//Run a fetch call on the SWAPI to get an array of ships
function fetchTheShips()
{
    fetch("https://swapi.dev/api/starships/")
    .then(function (response){ 
        // Listen for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function (data){
        //Listens for the DATA from response.json() - Promise #2
        //Pass the data to the callback function
        updateShipList(data);
        return data;
    })
    .catch(function (error) {
        // Listens for a REJECTION from the fetch() promise
        console.error ('ERROR:', error);
        return error;
    })
}

//Build the selection list - For each data object returned, add an option to the selection list with the name of the object.
function updateShipList(data)
{
    //console.log("The data is: ", data.results);

    const ships = data.results;
    ships.forEach(function(ship){
        const shipListItem = document.createElement("option");
        shipListItem.value = ship.name;
        shipListItem.text = ship.name;
        if(ship === currentShip)
        {
            optionElement.setAttribute('selected', true);
        }
        selectElement.append(shipListItem);
    })

    //When the select list hast been changed, update the currentShip along with it
    selectElement.addEventListener('change', function(event){
        currentShip = event.target.value;
    })

    //Append the select list
    const shipListForm = document.querySelector("#shipList");
    shipListForm.append(selectElement);
}

//Search for a specific ship
function fetchSpecificShip(ship)
{
    //console.log(ship);
    //run a fetch call to search the SWAPI with a specific ship name
    fetch(`https://swapi.dev/api/starships/?search=${ship}`)
    .then(function (response){ 
        // Listen for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function (data){
        //Listens for the DATA from response.json() - Promise #2
        //console.log(data);
        //Update the ship info, clear the film info, and get new film info
        updateShipInfo(data);
        clearFilmInfo();
        getFilmInfo(data);
        return data;
    })
    .catch(function (error) {
        // Listens for a REJECTION from the fetch() promise
        console.error ('ERROR:', error);
        return error;
    })
}

//Update ship text info
function updateShipInfo(shipData)
{
    //grab all HTML elements
    const shipNameElement = document.querySelector("#name");
    const modelElement = document.querySelector("#model");
    const starshipClassElement = document.querySelector("#starshipClass");
    const manufacturerElement = document.querySelector("#manufacturer");
    const costInCreditsElement = document.querySelector("#costInCredits");
    const lengthElement = document.querySelector("#length");
    const crewElement = document.querySelector("#crew");
    const passengersElement = document.querySelector("#passengers");
    const maxAtmospheringSpeedElement = document.querySelector("#maxAtmospheringSpeed");
    const hyperdriveRatingElement = document.querySelector("#hyperdriveRating");
    const MGLTElement = document.querySelector("#MGLT");
    const cargoCapacityElement = document.querySelector("#cargoCapacity");
    const consumablesElement = document.querySelector("#consumables");

    //update their text
    shipNameElement.innerText = "Name: " + shipData.results[0].name;
    modelElement.innerText = "Model: " + shipData.results[0].model;
    starshipClassElement.innerText = "Starship Class: " + shipData.results[0].starship_class;
    manufacturerElement.innerText = "Manufacturer: " + shipData.results[0].manufacturer;
    costInCreditsElement.innerText = "Cost in Credits: " + shipData.results[0].cost_in_credits;
    lengthElement.innerText = "Length in Meters: " + shipData.results[0].length;
    crewElement.innerText = "Crew Count: " + shipData.results[0].crew;
    passengersElement.innerText = "Passenger Count: " + shipData.results[0].passengers;
    maxAtmospheringSpeedElement.innerText = "Max Atmosphering Speed: " + shipData.results[0].max_atmosphering_speed;
    hyperdriveRatingElement.innerText = "Hyperdrive Rating: " + shipData.results[0].hyperdrive_rating;
    MGLTElement.innerText = "Max Megalights per Hour: " + shipData.results[0].MGLT;
    cargoCapacityElement.innerText = "Cargo Capacity in Kilograms: " + shipData.results[0].cargo_capacity;
    consumablesElement.innerText = "Length of time ship can sustain crew: " + shipData.results[0].consumables;
}

//Fetch the film info for a given film URL
function fetchFilmInfo(filmURL)
{
    fetch(filmURL)
    .then(function (response){ 
        // Listen for the RESPONSE from the fetch() - Promise #1
        return response.json();
    })
    .then(function (data){
        //Listens for the DATA from response.json() - Promise #2
        updateFilmInfo(data);
        return data;
    })
    .catch(function (error) {
        // Listens for a REJECTION from the fetch() promise
        console.error ('ERROR:', error);
        return error;
    })
}

//Run a fetch for each film data that is present in the shipData
function getFilmInfo(shipData)
{
    films = shipData.results[0].films;
    films.forEach(function(film){
        //fetch film info with film URL
        fetchFilmInfo(film);
    })
}

//clear the film info div
function clearFilmInfo()
{
    const movieResults = document.querySelector("#movieResults");
    while(movieResults.firstChild)
    {
        movieResults.removeChild(movieResults.firstChild);
    }
}

//Create new paragraph elements for each film that returns, and add them to the movieResults element
function updateFilmInfo(filmData)
{
    //add film name to results
    const newFilmElement = document.createElement("p");
    newFilmElement.innerText = "This ship appeared in " + filmData.title;
    
    movieResults.append(newFilmElement);
}