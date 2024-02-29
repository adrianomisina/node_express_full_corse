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

app.get("/", (req, res) => {
  res.status(201).json({ msg: "Hello Again!" });
});

app.get('/api/users', (req, res) => {
  const { query: { filter, value } } = req;

  if (!filter || !value) {
    return res.json(mockUsers);
  }

  const filteredUsers = mockUsers.filter(user => user[filter].toLowerCase().includes(value.toLowerCase()));
  res.json(filteredUsers);
});

app.get('/api/users/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);

  if (isNaN(parsedId)) {
    return res.status(400).json({ msg: "Bad request. Invalid ID" });
  }

  const findUser = mockUsers.find(user => user.id === parsedId);

  if (!findUser) {
    return res.sendStatus(404);
  }

  res.json(findUser);
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 123, name: 'chicken breast', price: 12.99 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
