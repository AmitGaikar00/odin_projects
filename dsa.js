const data = {
  person : "amit"
}

let name = 'parth'
data.name = "what ok"

// console.log(data)

for ( let name in data ) {
  console.log(name)
  console.log(data[name])
}