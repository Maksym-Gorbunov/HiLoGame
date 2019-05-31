/*
API with CRUD to MongoDB Cloud
Run: node src/api/api.js
Load data from file data.json, 250items
format: Json 
  {
    "question": "How many countries does Spain have a land border with?",
    "answer": 5,
    "difficulty": "medium"
  }
*/

const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 3000
var fileJson = require('./data.json');
var data = []
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get collection "question" from MongoDB from "https://cloud.mongodb.com"
async function loadQuestionsCollection() {
  const client = await mongodb.MongoClient.connect ('mongodb+srv://maks:iths2019!@hilodb-ejqv2.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  });
  return client.db('hilodb').collection('questions');
}

// Backup, load 250 items from data.json to DB
async function addQuestionsFromFileToDB(fileJson){
  const questions = await loadQuestionsCollection();
  questions.insertMany(fileJson, (err, result) => {
    if (err) {
      console.error(err)
      return
    } else{
      console.log(result) 
    }
  })
}

// Add item to 'question' collection
async function addQuestionToDB(item){
  const questions = await loadQuestionsCollection();
  questions.insertOne(item, (err, result) => {
    if (err) {
      console.error(err)
      return
    } else{
      console.log(result) 
    }
  })
}

// Get questions from DB 
async function getQuestionsFromDB(){
  const questions = await loadQuestionsCollection();
  data = await questions.find().toArray()
  return await questions.find().toArray();
}

// Delete one item from DB
async function deleteQuestionFromDB(id){
  const questions = await loadQuestionsCollection();
  questions.deleteOne({_id: new mongodb.ObjectID(id)}, (err, item) => {
    if (err) {
      console.error(err)
      return
    } else{
     console.log(item) 
    }
  })
}

// Edit item in DB
async function updateQuestionInDB(item){
  let question = {
    question: item.question,
    answer: item.answer,
    difficulty: item.difficulty
  }
  const questions = await loadQuestionsCollection();
  await questions.updateOne({_id: new mongodb.ObjectID(item._id)}, {'$set': question}, (err, item) => {
  })
}

// Clear questions, delete 'questions' collection
async function deleteQuestionCollection(fileJson){
  const questions = await loadQuestionsCollection();
  questions.deleteMany({}, (err, result) => {
    if (err) {
      console.error(err)
      return
    } else{
     console.log(result) 
    }
  })
}

// Filter data by difficulty and amount
function getRandomData(total, difficulty){
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


/* Requests, GET, POST, PUT, DELETE, format Json */

// Status test for API
app.get('/', (req, res) => res.send('API'))

// Return data from DB by amount and difficulty
app.get('/data/:total/:difficulty', (req, res) => {
  getQuestionsFromDB()
  res.send(getRandomData(req.params.total, req.params.difficulty))
});

// Return all data 
app.get('/data', async (req, res) => {
  const questions = await getQuestionsFromDB(); 
  res.json(questions)
});

// Load 250 items from file data.json
app.get('/data/loadFile', async (req, res) => {
  await addQuestionsFromFileToDB(fileJson)
  const questions = await getQuestionsFromDB(); 
  res.json(questions)
});

// Delete one item from DB
app.delete('/delete/:id',function(req,res){
  res.send(deleteQuestionFromDB(req.params.id))
});

// Clear all data
app.get('/delete/all',function(req,res){
  deleteQuestionCollection()
  res.send({})
});

// Edit one item
app.put('/update/:id', async (req, res) => {
  res.json({requestBody: req.body})
  await updateQuestionInDB(req.body)
});

// Add new item
app.post('/data/add', async (req, res) => {
  res.json({requestBody: req.body})
  await addQuestionToDB(req.body)
});

app.listen(port, () => console.log(`API listening on port ${port}!`))
