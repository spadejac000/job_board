const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const jobs = require('./routes/api/jobs')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express();

app.use(bodyParser.json({limit: '50mb'}))
app.use(fileUpload())
app.use(bodyParser.urlencoded({limit: '50mb'}));

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`server started on port ${port}`)
})

const io = require('socket.io')(8976)

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)
  socket.on('send-message', ({recipients, text}) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('recieve-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

// register and login routes
app.use('/api/users', users)
app.use('/api/jobs', jobs)

// serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}