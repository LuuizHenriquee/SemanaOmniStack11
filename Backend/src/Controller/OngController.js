const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async Listar(request,response) {

        const ongs = await connection('ONGs').select('*')
    
        return response.json(ongs);
    },

    async Criar(request, response) {
        const { NOME, EMAIL, WHATSAPP, CIDADE, UF } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ONGs').insert({
            id,
            NOME,
            EMAIL,
            WHATSAPP,
            CIDADE,
            UF
        })
        return response.json({ id })
    }
};