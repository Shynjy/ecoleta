const sqlite = require("sqlite3").verbose()

// ínicia o banco de dados
const db = new sqlite.Database("./src/database/database.db")

//Utilizar o objeto
// db.serialize(() => {
//     //Cria tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //inserir dados
// const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `

// const values = [ 
//     "https://images.unsplash.com/photo-1567093321629-c23611f44d52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
//     "Colectoria",
//     "Guilherme Gemballa, jardim América",
//     "Número 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas"
// ]

// function afterInsertData(err){
//     if(err) {
//         return console.log(err)
//     }
//     console.log("Cadastrado com sucesso")
//     console.log(this)
// }

// // db.run(query, values, afterInsertData)

//     //consultar
// db.all(`SELECT * FROM places`, function(err, rows){
//     if(err) {
//         return console.log(err)
//     }
//     console.log("Aqui estão os seus registros: ")
//     console.log(rows)
// })

//     //deletar um dado
// // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
// //     if(err) {
// //         return console.log(err)
// //     }
// //     console.log("Registro deletado com sucesso!")
// // })

// })

module.exports = db