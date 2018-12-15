const express = require('express');
let app = express();
const posts = require('./routes/posts');
const bodyparser = require('body-parser');

app.use(bodyparser.json({type: 'application/json'}));
app.use('/api/posts', posts);

const port = 4000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);    
})