const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users')
const jobs = require('./routes/api/jobs')
const fileUpload = require('express-fileupload')

const app = express();

app.use(bodyParser.json())
app.use(fileUpload())

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