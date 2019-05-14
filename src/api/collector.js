/* 
collect.js 
run: node collect.js
total = 250
functionality: collect 250 questions with numeric answers from another API,
each request max 50 questions
apiUrl = 'https://opentdb.com/api.php?amount=50&type=multiple'
format: json 
  {
    "question": "How many countries does Spain have a land border with?",
    "answer": 5,
    "difficulty": "medium"
  }
*/

var data = []    
var total = 250
var fs = require('fs')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var apiUrl = 'https://opentdb.com/api.php?amount=50&type=multiple'

/* Create json file and write all data in format {question:'..', answer:'...'} */
function createJson(){
  var json = JSON.stringify(data)
  fs.writeFile('data.json', json, 'utf8', callback);
}

/* Show succe message efter file writer */
function callback(){
  console.log("'data.json' was successfully created, size="+data.length)
}

/* Filter for corect answer, check if numeric */
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

/* Collect valid data, not all fields, only 'question' and 'answer' */
function collectValidQuestions(result){
  console.log(data.length)
  for(let i=0; i<result.length; i++){
    if(isNumeric(result[i].correct_answer)){
      let exist = false
      if(data.length > 0){
        for(let item of data){
          if(result[i].question === item.question){
            exist = true
          }  
        }
      }
      if(!exist){
        let element = {
          question: result[i].question, 
          answer: parseInt(result[i].correct_answer),
          difficulty: result[i].difficulty
        }
        data.push(element)
      }
      exist = false
    }
  }
  if(data.length < total){
    grab()
  } else{
    console.log('write')
    createJson()
  }
}

/* Grab data from API */
function grab(){
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        let result = json.results
        collectValidQuestions(result)
      }
      if (xhr.status == 500) {
          console.log("serverfel");
      }
    }
  }
  xhr.open("GET", apiUrl);
  xhr.responseType = "json";
  xhr.send();
}

console.log('collect...')
grab()