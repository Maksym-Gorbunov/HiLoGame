/*
API
functionality: return quiz questions with numeric answers  
run: node app.js
return format: json {
                      question: "...", 
                      answer:   "..."
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

function getData(total){
  let result = []
  let counter = 0
  while(counter < total){
    let randomIndex = Math.floor(Math.random() * (data.length -1))
    if(!result.includes(data[randomIndex])){
      result.push(data[randomIndex])
      counter++
    }
  }
  return result  
}

app.get('/', (req, res) => res.send('API'))
app.get('/data/:total', (req, res) => res.send(getData(req.params.total)))
app.listen(port, () => console.log(`API listening on port ${port}!`))


