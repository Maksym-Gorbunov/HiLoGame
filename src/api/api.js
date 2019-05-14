/*
API
functionality: return quiz questions with numeric answers  
run: node src/api/api.js
return format: json 
  {
    "question": "How many countries does Spain have a land border with?",
    "answer": 5,
    "difficulty": "medium"
  }
API listening on port 3000
http://localhost:3000          return 'API', for test only 
http://localhost:3000/data/3   return 3 question 
max 249 questions
*/


const express = require('express')
const app = express()
const port = 3000
var data = require('./data.json');


function statistic(){
  console.log('\nSTATISTIC:')
  console.log('Total: '+data.length)
  let categories = []
  let difficulty = []
  for(let item of data){
    if(!difficulty.includes(item.difficulty)){
      difficulty.push(item.difficulty)
    }
  }  
  console.log('Difficulty: ')
  for(let dif of difficulty){
    let total = 0
    for(let item of data){
      if(item.difficulty === dif){
        total++
      }
    }
    console.log('* '+dif+': '+total)
  }
  console.log('\n')
}

/* Filter data by difficulty and amount */
function getData(total, difficulty){
  let result = []
  let counter = 0
  while(counter < total){
    let randomIndex = Math.floor(Math.random() * (data.length -1))
    if((!result.includes(data[randomIndex])) && (data[randomIndex].difficulty === difficulty)){
      result.push(data[randomIndex])
      counter++
    }
  }
  return result  
}

app.get('/', (req, res) => res.send('API'))
app.get('/data/:total/:difficulty', (req, res) => res.send(getData(req.params.total, req.params.difficulty)))
app.listen(port, () => console.log(`API listening on port ${port}!`))
statistic() 


