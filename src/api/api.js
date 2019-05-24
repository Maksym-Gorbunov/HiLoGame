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

async function loadQuestionsCollection() {
  const client = await mongodb.MongoClient.connect ('mongodb+srv://maks:iths2019!@hilodb-ejqv2.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
  });
  return client.db('hilodb').collection('questions');
}

async function addQuestionsToDB(data){
  const questions = await loadQuestionsCollection();
  questions.insertMany(data, (err, result) => {
  })
}

async function addQuestionsFromFileToDB(fileJson){
  const questions = await loadQuestionsCollection();
  questions.insertMany(fileJson, (err, result) => {
  })
}

async function addQuestionToDB(item){
  // let question = {
  //   question: item.question,
  //   answer: item.answer,
  //   difficulty: item.difficulty
  // }
  // console.log(question)
  const questions = await loadQuestionsCollection();
  questions.insertOne(item, (err, result) => {
  })
}

async function getQuestionsFromDB(){
  const questions = await loadQuestionsCollection();
  data = await questions.find().toArray()
  return await questions.find().toArray();
}

async function deleteQuestionFromDB(id){
  const questions = await loadQuestionsCollection();
  questions.deleteOne({_id: new mongodb.ObjectID(id)}, (err, item) => {
  })
}

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

async function deleteQuestionCollection(fileJson){
  const questions = await loadQuestionsCollection();
  questions.remove({}, (err, result) => {
  })
}

// async function addQuestionToDB(item){
//   console.log(item)
// }


/* Filter data by difficulty and amount */
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




/* Requests */
app.get('/', (req, res) => res.send('API'))

app.get('/data/:total/:difficulty', (req, res) => {
  getQuestionsFromDB()
  res.send(getRandomData(req.params.total, req.params.difficulty))
});

app.get('/data', async (req, res) => {
  const questions = await getQuestionsFromDB(); 
  res.json(questions)
});

app.get('/data/loadFile', async (req, res) => {
  await addQuestionsFromFileToDB(fileJson)
  const questions = await getQuestionsFromDB(); 
  res.json(questions)
});

app.delete('/delete/:id',function(req,res){
  res.send(deleteQuestionFromDB(req.params.id))
});

app.get('/delete/all',function(req,res){
  deleteQuestionCollection()
  res.send({})
});

app.put('/update/:id', async (req, res) => {
  res.json({requestBody: req.body})
  await updateQuestionInDB(req.body)
});

app.post('/data/add', async (req, res) => {
  res.json({requestBody: req.body})
  await addQuestionToDB(req.body)
});

app.listen(port, () => console.log(`API listening on port ${port}!`))
