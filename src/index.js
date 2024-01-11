const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://lucasrezaghi:xrUaYpJ1qRWzebXP@starwars-api.gd4t3my.mongodb.net/?retryWrites=true&w=majority');

const Film = mongoose.model('Film', {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String

 });

app.get("/", async (req, res) => {
  const films = await Film.find()
  res.send(films)
})

app.delete("/:id", async (req , res)=>{
  const film = await Film.findByIdAndDelete(req.params.id)
  return res.send(film)
})

app.put("/", async (req, res) => {
  const film = await Film.findByIdAndUpdate(req.params.id , {
  title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  })
  return res.send(film)
})


app.post("/", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url
  })
  await film.save()
  res.send(film)
})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://lucasrezaghi:xrUaYpJ1qRWzebXP@starwars-api.gd4t3my.mongodb.net/?retryWrites=true&w=majority');
  console.log(`app running`)
})