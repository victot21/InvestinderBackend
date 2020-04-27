const connection = require('../../database/connection');
const crypto = require('crypto');

module.exports ={
async create(request,response){
    const { name, email, password, telefone, bio, interesses, pic } = request.body;
    const id = crypto.randomBytes(8).toString('HEX');

    const contaExistente = await connection('investidores').where('email', email);

    if (contaExistente) {
        throw new Error('Esse email já está cadastrado');
    }

    await connection('investidores').insert({
        id,
        name,
        email,
        password,
        telefone,
        bio,
        interesses,
        pic,
    })

    return response.json({ id, name, email, telefone, bio, interesses, pic });

    }

}
