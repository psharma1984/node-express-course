const {people} = require('../data')

const getPeople = (req,res) => {
    res.json(people)
}

const addPerson = (req,res) => {
    const formData = req.body.name
    if(!formData){
        res.status(400).json({success:false, message:"Please provide a name"});
    }
    else{
        people.push({id:people.length+1, name:formData})
        res.status(201).json({success:true, name:formData})
    }
}

const getPerson = (req,res) => {
    const idPerson = parseInt(req.params.id)
    const person = people.find((p) => p.id === idPerson)
    if(!person){
        return res.status(404).json({ message: "Person not found."})
    }
    res.json(person)
}

const delPerson = (req,res) =>{
    const idPerson = parseInt(req.params.id)
    const person = people.find((p) => p.id === idPerson)
    if(!person){
        return res.status(404).json({ message: "Person not found."})
    }
    res.json(people.filter((p) => p.id != idPerson))
}
module.exports = {
    getPeople,
    addPerson,
    getPerson,
    delPerson,
}