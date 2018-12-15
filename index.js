const express = require('express');
let app = express();
const posts = require('./routes/posts');
const bodyparser = require('body-parser');
const public = require('./routes/public');

app.use(bodyparser.json({type: 'application/json'}));
app.use('/api/posts', posts);
app.use(express.static('./public/resources'));
app.use(express.static('./node_modules/jquery/dist'));
app.use(express.static('./node_modules/popper.js/dist'));
app.use(express.static('./node_modules/bootstrap/dist'));
app.use('/', public);

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);    
})