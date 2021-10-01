function Restaurant(name, adress, avgMealPrice, numberOfTables, typesOfKitchen, openingTime, closingTime){ 
    this.name = name;
    this.adress = adress;
    this.avgMealPrice = avgMealPrice;
    this.numberOfTables = numberOfTables;
    this.typesOfKitchen = typesOfKitchen;
    //eventualno napraviti funkciju da gleda ukoliko je closingTime < openingTime, staviti closingTime date za jedan dan kasnije
    this.openingTime =  new Date().toDateString() + ' ' + openingTime;
    this.closingTime = new Date().toDateString() + ' ' + closingTime;
}

let categories = ["Serbian", "Italian", "Fast food", "Chinese", "Mexican", "Turkish"];

let rest1 = new Restaurant ("Greda", "Jevrejska 22, Novi Sad", 300, 20, [categories[0],categories[1]] ,"08:00", "22:40");
let rest2 = new Restaurant ("Verona",  "Futoska 123, Novi Sad",  750, 70, [categories[2],categories[3]], "11:15", "23:07");
let rest3 = new Restaurant ("Minuta", "Bulevar Oslobodjenja 143, Novi Sad", 1200, 110,[categories[4],categories[0]] ,"7:00","23:10");

let restaurants = [rest1,rest2,rest3];

let leftColumn = document.getElementById("leftcolumn");

for(let rest of restaurants){
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    card.classList.add("card")

    let nameDisplay = document.createElement("h2");
    nameDisplay.textContent = rest.name;
    
    card.appendChild(nameDisplay);
    leftColumn.appendChild(card);
}

console.log(leftColumn)
//Price ranges
// default vrednosti
let expensives = {name: "Expensive restaurants: ", minPrice: 800, maxPrice: 1700};
let middleExpensives = {name: "Middle expensive restaurants: ", minPrice: 500, maxPrice: 799};
let cheaps = {name: "Affordable restaurants: ", minPrice: 200, maxPrice: 499};


//Sizes (number of tables)
// default vrednosti
let smals = {name: "Small size restaurants", minNumOfTables: 1, maxNumOfTables: 24};
let mediums = {name: "Medium size restaurants", minNumOfTables: 25, maxNumOfTables: 99};
let bigs = {name: "Big size restaurants", minNumOfTables: 100, maxNumOfTables: 200};

//=========================================
//              Main flow
//=========================================

    // let again = "N"
    // do{
    //     printMenu();
    //     let filterType = prompt(">>> ");
        
    //     switch(filterType){ //svaki case fja
    //             case "1": {
    //                 printTimeInput();
    //                 let openTime = prompt(">>> ");
    //                 if(openTime == 1) printRestsNow(restaurants)
    //                 else 
    //                 {
    //                     console.log("Please enter wanted time (in format 00:00): ")
    //                     let wantedTimePrompt = prompt(">>> "); 
    //                     console.log(printRestsAtTime(wantedTimePrompt));
    //                 }
    //             }break;
                
    //             case "2": {
    //                 printPriceRangeInput();
    //                 let priceRangePrompt = prompt(">>> ");
    //                 if(priceRangePrompt == 1) printRestsByPriceRange(expensives);
    //                 else if(priceRangePrompt == 2) (printRestsByPriceRange(middleExpensives));
    //                 else if(priceRangePrompt == 3) (printRestsByPriceRange(cheaps));
    //                 else console.log("Please input a valid number (1, 2, 3)");
    //             }break;

    //             case "3": {
    //                 printSizeInput();
    //                 let sizePrompt = prompt(">>> ");
                    
    //                 if(sizePrompt == 1) printRestsBySize(bigs);
    //                 else if(sizePrompt == 2) (printRestsBySize(mediums));
    //                 else if(sizePrompt == 3) (printRestsBySize(smals));
    //                 else console.log("Please input a valid number (1, 2, 3)");
    //             }break;

    //             case "4": {
    //                 printCategoriesInput();
    //                 let categoriesPrompt  = prompt(">>> ");
    //                 let splittedCategoriesArray = categoriesPrompt.split(",");
    //                 let mappedArr = splittedCategoriesArray.map(number => categories[number-1])//mapiran arr sa zadatim vrednostima 
    //                 printRestByKitchenCategory(mappedArr); 


    //             }break;
                
    //             default: {
    //                 console.log("Please input a valid number (1,2,3,4)")
    //             }
    //         }
    //     console.log("Do you want to search by another criteria?  (Y/N)")
    //     again  = prompt(">>> ").toUpperCase();
    // }
    // while(again === "Y")

//=========================================
//              Functions
//=========================================
function findRestaurantsByPrice(restaurants, priceRange){
    let rests = [...restaurants];
        return rests
        .filter((rest => rest.avgMealPrice >= priceRange.minPrice) && (rest => rest.avgMealPrice <= priceRange.maxPrice));
}

function findRestaurantsBySize(restaurants, numberOfTables){
    let rests = [...restaurants];
        return rests
        .filter(rest => rest.numberOfTables <= numberOfTables.maxNumOfTables)
        .filter(rest => rest.numberOfTables >= numberOfTables.minNumOfTables);
}

function findRestaurantByTypeOfKitchen(restaurants, categories){
    let rests = [...restaurants];
    
    return rests.filter(function(rests){
        rests.typesOfKitchen.every(function (kitchen){
            return categories.includes(kitchen);
        })
    })  
}

function findOpenNowRestaurants(restaurants){    
    let hoursNow = new Date().getHours();
    let minutesNow = new Date().getMinutes();
    let timeNow = hoursNow + ":" + minutesNow;
    console.log(timeNow);
    
    findOpenRestaurantsAtGivenTime(restaurants, timeNow);
}

function findOpenRestaurantsAtGivenTime(restaurants, wantedTime){
    let openRestaurants = [];
    console.log(wantedTime);
    let wantedHours = wantedTime.split(":")[0] - 0;
    let wantedMinutes = wantedTime.split(":")[1] - 0;;

    console.log(wantedHours); 
    console.log(wantedMinutes);

    let openingHour;
    let closingHour;
    let openingMinute;
    let closingMinute;

    for(let key in restaurants){
        openingHour =  (restaurants[key].openingTime.slice(16,21).split(':')[0] - 0); // -0 da bi se vrednost pretvorila iz stringa u num (eksplicitno)
        openingMinute =  (restaurants[key].openingTime.slice(16,21).split(':')[1] - 0);

        closingHour =  (restaurants[key].closingTime.slice(16,21).split(':')[0] - 0);
        closingMinute =  (restaurants[key].closingTime.slice(16,21).split(':')[1] - 0);
        
        if((wantedHours > openingHour && wantedHours < closingHour) || 
        ((wantedHours === openingHour && wantedMinutes > openingMinute) || (wantedHours === closingHour && wantedMinutes < closingMinute)) )
        {
            openRestaurants.push(restaurants[key]);
        }
    }
    return openRestaurants;
}


//=========================================
//              Printers
//=========================================

//Print menu
function printMenu(){
    console.log();
    console.log("Restaurants App");
    console.log();
        console.log("---------------------------");
        console.log("Please select a criteria by which you want to filter restaurants: ");
        console.log();
        console.log("1 - Open Hours");
        console.log("2 - Price range");
        console.log("3 - Size");
        console.log("4 - Types of kitchen (categories)");
        console.log("---------------------------");
        console.log();
}

function printTimeInput(){
    console.log("Search by open hours: ");
    console.log("---------------------------");
    console.log("1. Currently open restaurants.");
    console.log("2. Restaurants open at given time.");
    
}

function printPriceRangeInput(){
    console.log("Search by price range: ");
    console.log("---------------------------");
    console.log("1. Expensives.");
    console.log("2. Medium expensives.");
    console.log("3. Affordable");
 // console.log("4. Search by price?")
}

function printSizeInput(){
    console.log("Search by size: ");
    console.log("---------------------------");
    console.log("1. Big restaurants.");
    console.log("2. Medium size restaurants.");
    console.log("3. Small restaurnts.");
//  console.log("4. Search by number of tables?")
}

function printCategoriesInput(){
    console.log("Please enter up to 3 categories (eg: 1,5): ");
    console.log("---------------------------");
    console.log("1. Serbian");
    console.log("2. Italian");
    console.log("3. Fast food");
    console.log("4. Chinese");
    console.log("5. Mexican");
    console.log("6. Turkish");

}

//Print restaurant objects
function printRestsNow(){
    console.log("Restaurants open now: ");                                            
    console.log(findOpenNowRestaurants(restaurants)); 
};
function printRestsAtTime(wantedTime){                                
    console.log("Restaurants open at wanted time are: ");
    console.log(findOpenRestaurantsAtGivenTime(restaurants, wantedTime));  
};

function printRestsBySize(size){
    console.log(size.name);
    console.log(findRestaurantsBySize(restaurants, size));               
}

function printRestsByPriceRange(priceRange){
    console.log(priceRange.name);
    console.log(findRestaurantsByPrice(restaurants, priceRange));            
}

function printRestByKitchenCategory(categories){
    console.log("Restaurants containing: " + [categories]);
    console.log(findRestaurantByTypeOfKitchen(restaurants, categories)); 
}