const router = require ('express').Router()

const Person = require('../models/Person')



//Rota de criação POST
router.post ('/', async (req, res) => {
    const {name, salary, approved} = req.body

if(!name) {
    res.status(422).json({error: 'O nome é obrigatório!'})
    return//Não executa mais o programa, Garante que vai parar por aqui
}

const person = {
    name,
    salary,
    approved
}
//Create
try {
    await Person.create(person)
    res.status(200).json({message:'Pessoa inserida com sucesso!'})
    
} catch (error) {
    res.status(500).json({error: error})
}
})

//Read Leitura de dados

router.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({error: error});
    }
})

//Rotas dinâmicas usando o ID

router.get('/:id', async (req, res) => {
    //extrair o dado da requisição pela url = req.params
    const id = req.params.id

    try {
        //findOne para buscar só 1
        const person = await Person.findOne({_id: id})

        if(!person) {
            res.status(422).json({message: 'A id digitado não existe!'})
            return//Não executa mais o programa, Garante que vai parar por aqui
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error});
    }
})

//Update - atualização de dados (put - patch)
//Ele vem de forma dinâmica para ser atualizado
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body

const person = {
    name,
    salary,
    approved,
}
try {
    const updatedPerson = await Person.updateOne({_id: id}, person)

    console.log(updatedPerson)

    if(updatedPerson.matchedCount === 0) {
        res.status(422).json({msg: 'Pessoa não encontrada!'})
        return
    }

    res.status(200).json(person)
    
} catch (error) {
    res.status(500).json({error: error})
    
}
})

/*---------------------------------------------------------------------------------------*/

//Delete - Deletar dados 

router.delete('/:id', async (req, res) => {

    const id = req.params.id
    //Validar
    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message: 'Pessoa não encontrada'})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({message:'Pessoa removida com sucesso!'})
    } catch (error) {
        res.status(500).json({error: error})  
    }

})

module.exports = router;

