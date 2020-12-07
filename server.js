console.log('May Node be with you')
const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb+srv://yoda:Chosen1@cluster0.dcekc.mongodb.net/Cluster0?retryWrites=true&w=majority', { useUnifiedTopology: true})
    .then(client => {
          console.log('Connected to Database')
          const db = client.db('star-wars-quotes')
          const quotesCollection = db.collection('quotes')
          var num_of_Darth_vadar=0
          var number=0
          
          app.use(bodyParser.urlencoded({ extended: true }))
          app.use(express.static('public'))
          app.use(bodyParser.json())
          app.set('view engine', 'ejs')
          
          app.listen(3000, function() {
          console.log('listening on 3000')
          })

          app.get('/', (req, res) => {
                  db.collection('quotes').count()
                    .then(results => {
                          console.log(results)
                          number=results
                          //res.render('index.ejs', { name: "test" })
                    })
                  .catch(error => console.error(error))
                  
                  db.collection('quotes').find().toArray()
                    .then(results => {
                          console.log(results)
                          res.render('index.ejs', { quotes: results,number: number })
                          
                    })
                  .catch(error => console.error(error))
                  
          // ...
          })
          
          app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
              { name: req.body.name }
            )
              .then(result => {
                if (result.deletedCount === 0) {
                  return res.json('No quote to delete')
                }
                res.json('Deleted Darth Vadar\'s quote')
                
              })
              .catch(error => console.error(error))
          })
          

          

          app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
              { name: 'Yoda' },
              {
                $set: {
                  name: req.body.name,
                  quote: req.body.quote
                }
              },
              {
                upsert: true
              }
            )
              .then(result => res.json('Success'))
              .catch(error => console.error(error))
          })
          
          
          app.post('/quotes', (req, res) => {
              quotesCollection.insertOne(req.body)
                   .then(result => {
                         res.redirect('/')
                         //console.log(result)
                         })
                   .catch(error => console.error(error))
                   })
          })
    .catch(error => console.error(error))





