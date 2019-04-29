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


function no(people, options = ['id', 'gender', 'dob', 'height', 'weight', 'eye color', 'occupation']) {
    // var options = [];
    var stringOfOptions = options.toString()
    var searchType = promptFor("Which characteristic(s) would you like to use to narrow down your search? Enter one of the following: " + stringOfOptions.replace(",", ", "), otherProperties).toLowerCase();
    for(var i = 0; i < options.length; i++) {
        if (searchType == options[i]) {   
        var temp = options[i];                           
        options[i] = options[options.length - 1];
        options[options.length - 1] = temp;
        options.pop();
    }
}


    
        switch(searchType) {
            case 'id':
            var number = promptFor("What is their ID number?", chars)
            var foundPerson = getNameById(number, people);
            mainMenu(foundPerson, people);
            break;
            //or create another map function that filters till foundPeople.length is 1
 
        
            case 'gender':
            var gender = promptFor("What is their gender? Male or female?", chars)
            var foundPeople = getNameByGender(gender, people);
            alert(foundPeople);
            people = getListByGender(gender, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                }
            break;

        
            case 'dob':
            var dob = promptFor("What is their date of birth?", chars);
            var foundPeople = getNameByDob(dob, people);
            alert(foundPeople);
            people = getListByDob(dob, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                }
            break;
 
        
            case 'height':
            var height = promptFor("What is their height? In Inches", chars);
            var foundPeople = getNameByHeight(height, people);
            alert(foundPeople);
            people = getListByHeight(height, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                }
            break;
            
        
            case 'weight':
            var weight = promptFor("What is their weight? In pounds.", chars)
            var foundPeople = getNameByWeight(weight, people);
            alert(foundPeople);
            people = getListByWeight(weight, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                }
            break;
        
            case 'eye color':
            var eyeColor = promptFor("What is their eye color?", chars);
            var foundPeople = getNameByEyeColor(eyeColor,people);
            alert(foundPeople);
            people = getListByEyeColor(eyeColor, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                    
                }
            break;
        
            case 'occupation':
            var occupation = promptFor("What is their occupation?", chars)
            var foundPeople = getNameByOccupation(occupation, people);
            alert(foundPeople);
            people = getListByOccupation(occupation, people);
            if(people.length > 1) { 
                no(people, options)}
                else {
                    mainMenu(people[0], data);
                }
            break;    
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
    displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    displayImmediateFamily(person)
    break;
    case "descendants":
    // TODO: get person's descendants
    alert(displayDescendants(person))
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


function searchByName(data){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = data.filter(function(person){
    if(person.firstName.toLowerCase() == firstName.toLowerCase() && person.lastName.toLowerCase() == lastName.toLowerCase()){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];
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
  personInfo += "Dob: " + person.dob + "\n";
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

function otherProperties(input){
  return input.toLowerCase() == "id" || input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "eye color" || input.toLowerCase() == "occupation";
}

function getAge(givenDate){
let currentDate = new Date()
let dateSplit = givenDate.split("/")
if ((currentDate.getMonth() + 1) >= dateSplit[0] && currentDate.getDate() >= dateSplit[1]) {
return (currentDate.getFullYear() - dateSplit[2])
} else {
  return ((currentDate.getFullYear() - dateSplit[2]) - 1)
}
}

 function displayParents(person){
 let parents = person.parents

 if (parents.length > 1) {
     var personParentsInfo = "Parents: " + getNameById(parents[0]).firstName + " " + getNameById(parents[0]).lastName + " and " + getNameById(parents[1]).firstName + " " + getNameById(parents[1]).lastName
    return  personParentsInfo 
} else if (parents.length == 1){
  var defineFirstParent = "Parents: " + getNameById(parents[0]).firstName + " " + getNameById(parents[0]).lastName
    return defineFirstParent
} else { 
  return "No Parents Found"
}
}

 function displaySpouse(person){
  if (person.currentSpouse == null) {
  return "No Spouse Found"
}
 var spouseName = "Spouse: " + getNameById(person.currentSpouse).firstName + " " + getNameById(person.currentSpouse).lastName
return spouseName

}

function displayImmediateFamily(person){
  let family = displayParents(person) + "\n" + displaySpouse(person) + "\n" + getSiblings(person)
  alert(family);
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
    var childrenNames = "Childrens: "
    for (var i = 0; i < childrenList.length; i++)
    childrenNames += childrenList[i].firstName + " " + childrenList[i].lastName + ", "
    return  childrenNames
  } else {
    return "No Children Found"
  }
  }

function getGrandChildren(generation, person){
    let childrenList = data.filter(function(person1){
      if (person1.parents.length > 1) {
        if (person.id == person1.parents[0] || person.id == person1.parents[1]) {
          return person1
        } else {
        }}
      else if (person.id == person1.parents[0]) {
        return person1
    
      }else {
    }})
    if (generation == 1){
      return childrenList
    }
    else { 
      var grandChildrenList = []
      for (var i = 0; i < childrenList.length; i++){
      
         grandChildrenList = grandChildrenList.concat(getGrandChildren(generation + 1, childrenList[i]))
       
    }
    return grandChildrenList
   }
  }

   
function displayGrandchildren(person){
let grandChildrenNames = "Grandchildrens: "
for (var i = 0; i < getGrandChildren(0, person).length; i++) {
    grandChildrenNames += getGrandChildren(0, person)[0].firstName + " " + getGrandChildren(0, person)[0].lastName;
}
if (getGrandChildren(0, person).length == 0){
    return "No GrandChildrens Found"
} else {
  return grandChildrenNames
} 
}

function displayDescendants(person) {
  return "Childrens: " + getChildren(person) + "\n" + "Grandchildrens: " + displayGrandchildren(person)
}

function getSiblings(person){ 
  var siblingsList = data.filter(function(possibleSiblings){
   if (person.id == possibleSiblings.id) {
   return false
  }
  else if (possibleSiblings.parents[0] == null) {
    return false

  }
  else if (person.parents[0] == possibleSiblings.parents[0] && person.parents[1] == possibleSiblings.parents[1]) {
  return true
  }
  else if (person.parents[0] == possibleSiblings.parents[0]  || person.parents[0] == possibleSiblings.parents[1]){
    return true
  }
  else if (person.parents[1] == possibleSiblings.parents[0] || person.parents[1] == possibleSiblings.parents[1]) {
    return true
  }
  else{
    return false
  }
 })
  var siblingsNames = "Siblings:" + " " + siblingsList.map(function(sibs){
  return sibs.firstName + " " + sibs.lastName;
 })
 return siblingsNames
}

function getNameById(number){
    let identity = data.filter(function(person){
        if (number == person.id) {
            return true; 
        } 
        else {
            return false;
        }
    })
    return identity[0];
} 
 
function getNameByGender(gender, data) {
    let identity = data.filter(function(person){
        if (gender == person.gender) {
            return true;
        }
        else {
            return false;
        }
    });
    var peopleWithThisGender = "People with this gender: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
    return peopleWithThisGender;
  }
  // console.log(getNameByGender("male"));

function getListByGender(gender, people) {
    let identity = people.filter(function(person){
        if (gender == person.gender) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
  }
  // console.log(getNameByHeight("65"));
  
  
function getNameByDob(dob, people) {
    let identity = people.filter(function(person){
        if (dob == person.dob) {
        return true;
        }
        else {
        return false;
        }
    });
    var peopleWithThisDob = "People who has this Dob: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
    return peopleWithThisDob;
}

function getListByDob(dob, people) {
    let identity = people.filter(function(person){
        if (dob == person.dob) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
  }
  // console.log(getNameByHeight("65"));
  

  
  function getNameByHeight(height, people) {
    let identity = people.filter(function(person){
        if (height == person.height) {
        return true;
        }
        else {
        return false;
        }
    });
    var peopleWithThisHeight = "People who has this height: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
    return peopleWithThisHeight;
  }



  function getListByHeight(height, people) {
    let identity = people.filter(function(person){
        if (height == person.height) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
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
    var peopleWithThisWeight = "People who has this weight: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
    return peopleWithThisWeight;
  }
  // console.log(getNameByWeight("115"));


  function getListByWeight(weight, people) {
    let identity = people.filter(function(person){
        if (weight == person.weight) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
  }
  
  
  function getNameByEyeColor(eyeColor, people){
    
    let identity = people.filter(function(person){
      if (eyeColor == person.eyeColor) {
        return true;
      }
      else {
        return false;
      }
    });
    var peopleWithThisEyeColor = "People who are has this eye color: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
  return peopleWithThisEyeColor
  }
  // console.log(getNameByEyeColor("brown"));


  function getListByEyeColor(eyeColor, people) {
    let identity = people.filter(function(person){
        if (eyeColor == person.eyeColor) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
  }

  
  function getNameByOccupation(occupation, people) {
    let identity = people.filter(function(person){
        if (occupation == person.occupation) {
        return true;
        }
        else {
        return false;
        }
    });
    var peopleWithThisOccupation = "People who are has this occuppation: " + identity.map(function(person){
      return "\n" + person.firstName + " " + person.lastName;
    })
    return peopleWithThisOccupation;
  }

  // console.log(getNameByOccupation("programmer"));

  function getListByOccupation(occupation, people) {
    let identity = people.filter(function(person){
        if (occupation == person.occupation) {
        return true;
        }
        else {
        return false;
        }
    });
    return identity;
  }

  function getNameByAge(number, people){
   let ageList = people.map(function(individual){
    return getAge(individual)
   })
   let filteredAgeList = ageList.filter(function(individual2){
     if (number == individual2){
       return true
     }
     else {
       return false
     }
   })
    }