const express = require("express")
const server = express()

//Banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

//Nunjunks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Versão do express sem o nunjucks
// server.get("/", (req, res) => {
//     res.sendFile(__dirname + "/views/index.html")
// })

//configurar caminho da minha aplicação
//página inicial
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/search", (req, res) => {

    // Busca o texto depois do serch na barra de pesquisa
    const search = req.query.search

    if(search == "") {
        return res.render("search-results.html", {total: 0})
    }

    //Consulta o banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        return res.render("search-results.html", {places: rows, total: total})
    })

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
    // req.body : O corpo do nosso formulário
const reqBody = req.body
    // inserir dados
const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`

const values = [ 
    reqBody.image,
    reqBody.name,
    reqBody.address,
    reqBody.address2,
    reqBody.state,
    reqBody.city,
    reqBody.items
]

function afterInsertData(err){
    if(err) {
        console.log(err)
        return res.send("Erro no cadastro!")
    }
    return res.render("create-point.html", { saved: true })
}
db.run(query, values, afterInsertData)
})

//liga o servidor
server.listen(3000)