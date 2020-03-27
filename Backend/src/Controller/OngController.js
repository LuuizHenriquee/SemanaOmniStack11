const connection = require('../database/connection');
const gerarID = require('../funcoesGenericas/gerarID')

module.exports = {
    async Listar(request,response) {

        const ongs = await connection('ONGs').select('*')
    
        return response.json(ongs);
    },

    async Criar(request, response) {
        const { NOME, EMAIL, WHATSAPP, CIDADE, UF } = request.body;

        const id = gerarID();

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