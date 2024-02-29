import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

const mockUsers = [
  { id: 1, username: "anson", displayName: "Anson" },
  { id: 2, username: "Jack", displayName: "Jack" },
  { id: 3, username: "Adam", displayName: "adam" },
  { id: 4, username: "Tina", displayName: "tina" },
  { id: 5, username: "jason", displayName: "Jasom" },
  { id: 6, username: "henry", displayName: "Henry" },
  { id: 7, username: "marily", displayName: "Marily" }
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello Again!" });
})

app.get('/api/users', (request, response) => {
  console.log(request.query)
  const {query:{filter, value}} =request
  // whe filter and value are undefined
  // if(!filter && !value) {
  //   return response.send(mockUsers);
  // }

  if(filter && value) {
    // return response.send(mockUsers.filter((user) => user.username === value));
    return response.send(mockUsers.filter((user) => user[filter].includes(value)));
  }
  return response.send(mockUsers);
})

app.get('/api/users/:id', (request, response) => {
  // console.log(request.params)
  const parsedId = parseInt(request.params.id)
  console.log(parsedId)
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad request. Invalid ID" })
  }

  const findUser = mockUsers.find((user) => user.id === parsedId)

  if (!findUser) {
    return response.sendStatus(404)
  } else {
    return response.send(findUser)
  }
})

app.get('/api/products', (request, response) => {
  response.send([
    { id: 123, name: 'chicken breast', price: 12.99 }
  ])
})

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
})

//  localhost:3000
//  localhost:3000/users
//  localhost:3000/products?key=value&key=value2

