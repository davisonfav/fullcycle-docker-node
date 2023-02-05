const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sqlTable = `CREATE TABLE if not exists people (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(255), PRIMARY KEY (id))`
connection.query(sqlTable)

const sqlWesley = `INSERT INTO people(nome) values('Wesley')`
connection.query(sqlWesley)

const sqlDavison = `INSERT INTO people(nome) values('Davison')`
connection.query(sqlDavison)

connection.end()

app.get('/', (req,res) => {
    var response = '<h1>Full Cycle Rocks!</h1>'

    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    const sqlSelect = `SELECT * FROM people`
    connection.query(sqlSelect, function (err, rows) {
        response = response + '<br />';
        if (err) {
            response = response + 'Error while retrieving people data'
        } else {
            response = response + '<ul>'
            rows.forEach(person => {
                response = response + '<li>' + person.nome + '</li>' 
            });
            response = response + '</ul>'
        }
        res.send(response)
      })

    connection.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})