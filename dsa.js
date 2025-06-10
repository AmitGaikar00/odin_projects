const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


rl.question("what iss your name" , name =>{
  console.log(`so your name is ${name}`)
})