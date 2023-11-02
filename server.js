const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());
app.set('view engine', 'ejs');




app.get('/', (req, res) => {
  fs.readFile('posts.json', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading posts file');
    } else {
      let posts = [];
      if (data) {
        posts = JSON.parse(data);
      }
      res.render('posts', { posts: posts });
    }
  });
});

const currentDate = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

app.post("/", (req,res)=>{
  const post = {title: req.body.title, date: formattedDate, content: req.body.content};
  const data = require('./posts.json');
  data.push(post);
  fs.writeFileSync('./posts.json', JSON.stringify(data));
  res.redirect("/");
})



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
