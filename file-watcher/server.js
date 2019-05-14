const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const fs = require('fs')
const chokidar = require('chokidar')

const port = 4001
const [, , ...args] = process.argv

/**
 * Setup Express
 */
const app = express()

app.get('/data', (req, res) => {
  console.log(req.method, req.params)
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  console.log('Reading file')
  fs.readFile(args[0], (err, data) => {
    if (!err) res.send(data)
  })
})

/**
 * Setup Socket
 */
const server = http.createServer(app)

const io = socketIO(server)

io.on('connection', socket => {
  console.log('Client connected')
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

/**
 * Setup File Watchers
 */

const watcher = chokidar.watch(args[0])

watcher.on('change', path => {
  console.info('watcher: Detected change')
  io.emit('changed', path)
})

/**
 * Start server
 */
server.listen(port, () => console.log(`listening on port ${port}`))
