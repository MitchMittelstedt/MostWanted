"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      mainMenu(foundPerson, people);
      break;
    case 'no':
      // TODO: search by traits
      no(people);
      
      break;

      default:
    
    app(people); // restart app
      break;
  }
}

function no(people) {
  
  var searchType = promptFor("Which characteristic(s) would you like to use to narrow down your search? Enter 'id', 'gender', 'dob', 'height', 'weight', 'eye color', or 'occupation'", otherProperties).toLowerCase();
    switch(searchType) {
      case 'id':
        var number = promptFor("What is their ID number?", chars)      
        var foundPeople = getNameById(number, people);
        return foundPeople;

      case 'gender':
        var gender = promptFor("What is their gender?", chars)
        var foundPeople = getNameByGender(gender,people);
        return foundPeople;
      
      case 'dob':
        var dob = promptFor("What is their age?", chars)
        var foundPeople = getNameByDob(dob, people);
        return foundPeople;

      case 'height':
        var height = promptFor("What is their height?", chars)
        var foundPeople = getNameByHeight(height, people);
        return foundPeople;

      case 'weight':
        var weight = promptFor("What is their weight", chars)
        var foundPeople = getNameByWeight(weight, people);
        return foundPeople;

      case 'eye color':
        var eyecolor = promptFor("What is their eye color?", chars)
        var foundPeople = getNameByEyeColor(eyecolor,people);
        return foundPeople;

      case 'occupation':
        var occupation = promptFor("What is their occupation?", chars)
        var foundPeople = filterByOccupation(occupation, people);
        return foundPeople;

    }
  }
  

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    displayPerson
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Age: " + getAge(person.dob) + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// function valid(response) {
//   if(response ==
// }

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function otherProperties(input){
  return input.toLowerCase() == "id" || input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eye color" || input.toLowerCase() == "occupation";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function checkIfNumber(input) {

}

function getAge(givenDate){
currentDate = new Date()
dateSplit = givenDate.split("/")
if ((currentDate.getMonth() + 1) >= dateSplit[0] && currentDate.getDate() >= dateSplit[1]) {
return (currentDate.getFullYear() - dateSplit[2])
} else {
  return ((currentDate.getFullYear() - dateSplit[2]) - 1)
}
}

function displayImmediateFamily(person){
 var personInfo = "First Name: " + person.firstName + "\n"; 

}

function getNameById(number, people){

  let identity = people.filter(function(person){
      
      if (number == person.id) {
        return true; 
  } 
  else {
      return false;   
  }});
  return identity[0].firstName + " " + identity[0].lastName;
}
// console.log(getNameById(401222887));


function getNameByGender(gender, people) {
  let identity = people.filter(function(person){
      if (gender == person.gender) {
      return true;
      }
      else {
      return false;
      }
  });
  var peopleWithThisGender = identity[0].firstName + " " + identity[0].lastName + "\n";
  for(i = 1; i < identity.length; i++){
      peopleWithThisGender += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
  return peopleWithThisGender;
}
// console.log(getNameByGender("male"));


function getNameByDob(dob, people) {
  let identity = people.filter(function(person){
      if (dob == person.dob) {
      return true;
      }
      else {
      return false;
      }
  });
  var peopleWithThisDob = identity[0].firstName + " " + identity[0].lastName + "\n";
  for(i = 1; i < identity.length; i++){
      peopleWithThisDob += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
  return peopleWithThisDob;
}
// console.log(getNameByDob("1/18/1949"));


function getNameByHeight(height, people) {
  let identity = people.filter(function(person){
      if (height == person.height) {
      return true;
      }
      else {
      return false;
      }
  });
  var peopleWithThisHeight = identity[0].firstName + " " + identity[0].lastName + "\n";
  for(i = 1; i < identity.length; i++){
      peopleWithThisHeight += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
  return peopleWithThisHeight;
}
// console.log(getNameByHeight("65"));


function getNameByWeight(weight, people) {
  let identity = people.filter(function(person){
      if (weight == person.weight) {
      return true;
      }
      else {
      return false;
      }
  });
  var peopleWithThisWeight = identity[0].firstName + " " + identity[0].lastName + "\n";
  for(i = 1; i < identity.length; i++){
      peopleWithThisWeight += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
  return peopleWithThisWeight;
}
// console.log(getNameByWeight("115"));


function getNameByEyeColor(eyeColor, people){
  
  let identity = people.filter(function(person){
    if (eyeColor == person.eyeColor) {
      return true;
    }
    else {
      return false;
    }
  });
  var peopleWithThisEyeColor = identity[0].firstName + " " + identity[0].lastName + "\n";
  for (i = 1; i < identity.length; i++) {

      peopleWithThisEyeColor += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
return peopleWithThisEyeColor
}
// console.log(getNameByEyeColor("brown"));


function getNameByOccupation(occupation, people) {
  let identity = people.filter(function(person){
      if (occupation == person.occupation) {
      return true;
      }
      else {
      return false;
      }
  });
  var peopleWithThisOccupation = identity[0].firstName + " " + identity[0].lastName + "\n";
  for(i = 1; i < identity.length; i++){
      peopleWithThisOccupation += identity[i].firstName + " " + identity[i].lastName + "\n";
  }
  return peopleWithThisOccupation;
}
// console.log(getNameByOccupation("programmer"));


