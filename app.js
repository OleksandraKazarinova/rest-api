const express = require('express')
const path = require('path')
const {v4}= require('uuid')
const app = express()


let CONTACTS = [
    {
    id: 1, name: 'Oleksandra', value: '+38-050-901-21-70', marked: false
}
]

app.use(express.json())

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res.status(200).json(CONTACTS)
    }, 1000)

})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res.status(201).json(contact)

})

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res.status(200).json({message: 'контакт был удален'})
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const inx = CONTACTS.findIndex(c => c.id === req.params.id);
    CONTACTS[inx] = req.body
    res.json(CONTACTS[inx])
})






app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html' ))
})

app.listen(3000, () => console.log('server has been started on port 3000 ... '))