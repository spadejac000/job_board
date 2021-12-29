const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const jobs = require('./routes/api/jobs')

const app = express();

app.use(bodyParser.json())

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

// register and login routes
app.use('/api/users', users)
app.use('/api/jobs', jobs)