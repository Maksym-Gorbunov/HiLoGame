

const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
var dataFromFile = require('./data.json');
var data = []


async function loadQuestionsCollection() {
  const client = await mongodb.MongoClient.connect ('mongodb+srv://maks:iths2019!@hilodb-ejqv2.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  });
  return client.db('hilodb').collection('questions');
}

async function importDataFromFileToDB(){
  const questions = await loadQuestionsCollection();
  questions.insertMany(dataFromFile, (err, result) => {
    console.log('r'+result)
    console.log('e'+err)
  })
}

async function insertMany(data){
  const questions = await loadQuestionsCollection();
  questions.insertMany(data, (err, result) => {
    console.log('r'+result)
    console.log('e'+err)
  })
}


var q = {
  question: "Test2",
  difficulty: "easy",
  answer: "4"
}

async function addQuestion(questionItem){
  const questions = await loadQuestionsCollection();
  questions.insertOne(questionItem, (err, result) => {
  })
}

async function getQuestions(){
  const questions = await loadQuestionsCollection();
  return await questions.find().toArray();
}

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

function getAllData(){
  return data  
}

app.get('/', (req, res) => res.send('API'))
app.get('/data/:total/:difficulty', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000')
  res.send(getData(req.params.total, req.params.difficulty))
});


app.get('/data', async (req, res) => {
  const a = await getQuestions(); 
    res.json(a)
});

app.listen(port, () => console.log(`API listening on port ${port}!`))
statistic() 


// mongodb+srv://maks:<password>@hilodb-ejqv2.mongodb.net/test?retryWrites=true