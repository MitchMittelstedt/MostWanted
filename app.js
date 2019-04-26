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
      break;
      default:
    app(people); // restart app
      break;
  }
}

function no(people) {
  var attr = people.attr;
  
  var searchType = promptFor("Which characteristic(s) would you like to use to narrow down your search?", characteristicsList).toLowerCase();
  people.filter(function(person) {
    switch(searchType) {
      case 'ID':
        var foundPeople = filterById(people);
        return people.filter(checkId);
      
      case 'first name':
        var foundPeople = filterByFirstName(people);

      case 'last name': 
        var foundPeople = filterByLastName(people);

      case 'gender':
        var foundPeople = filterByGender(people);
      
      case 'dob':
        var foundPeople = filterByDob(people);

      case 'height':
        var foundPeople = filterByHeight(people);

      case 'weight':
        var foundPeople = filterByWeight(people);

      case 'eye color':
        var foundPeople = filterByEyeColor(people);

      case 'occupation':
        var foundPeople = filterByOccupation(people);

      case 'parents':
        var foundPeople = filterByParents(peolple);

      case 'currentSpouse': 
      var foundPeople = filterByCurrentSpouse(people);
    }
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

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
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

 function displayParents(person){
 let parents = person.parents

 if (parents.length > 1) {
  

     var personParentsInfo = "Parents:" + getNameById(parents[0]) + " and " + getNameById(parents[1])
    return  personParentsInfo 
} else if (parents.length == 1){
  var defineFirstParent = "Parent:" + getNameById(parents[0])
    return defineFirstParent
} else { 
  return "Parentless"
}
}

 function displaySpouse(person){
  if (person.currentSpouse == null) {
  return "unmarried"
}
return getNameById(person.currentSpouse)

}

function getImmediateFamily(person){
  family = displayParents + "\n" displaySpouse
  return family
}

function getNameById(number){

let identity = people.filter(function(person){
    
    if (number == person.id) {
      return true; 
} else {
    return false;   
}});

return identity[0].firstName + " " + identity[0].lastName;
} 



function getChildren(person){
let childrenList = data.filter(function(person1){
  if (person1.parents.length >1) {
    if (person.id == person1.parents[0] || person.id == person1.parents[1]) {
      return person1
    } else {
    }}
  else if (person.id == person1.parents[0]) {
    return person1

  }else {
}})
  if(childrenList.length >= 1){
  return childrenList
} else {
  return "No Children"
}
}
