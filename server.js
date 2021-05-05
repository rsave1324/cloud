
const express = require("express")

const app = express()

const Sequelize = require('sequelize')

const sequelize = new Sequelize('profile', 'username', 'password', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
    console.log("Unable to connect to database")
})

const Messages = sequelize.define('messages', {
    subject: Sequelize.STRING,
    name: Sequelize.STRING,
    message: Sequelize.TEXT
})

app.use('/', express.static('frontend'))

app.use(express.json())
app.use(express.urlencoded())

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})


// TO DO: accesează din browser endpoint-ul /createdb

// TO DO: testează dacă tabelul a fost creat executând în consola mysql comenzile use profile pentru a selecta baza de date și 
// show tables; pentru a afișa lista de tabele din baza de date

//definire endpoint POST /messages
app.post('/messages', (request, response) => {
    Messages.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/messages', (request, response) => {
    Messages.findAll().then((results) => {
        response.status(200).json(results)
    })
})

app.get('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((result) => {
        if(result) {
            response.status(200).json(result)
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.put('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.delete('/messages/:id', (request, response) => {
    Messages.findByPk(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.listen(8080)

/*
app.get('/hello', (req, res) => {
    res.status(200).send({"message": "Hello, World!"})
})

app.get('/messages', (req, res) => {
    res.status(500).send("GET /messages not implemented")
})

app.get('/messages/:id', (req, res) => {
    res.status(500).send("GET /messages/:id not implemented")
})

app.post('/messages', (req, res) => {
    res.status(500).send("POST /messages not implemented")
})

app.put('/messages/:id', (req, res) => {
    res.status(500).send("PUT /messages/:id not implemented")
})

app.delete('/messages/:id', (req, res) => {
    res.status(500).send("DELETE /messages/:id not implemented")
})

app.listen(8080)

*/
