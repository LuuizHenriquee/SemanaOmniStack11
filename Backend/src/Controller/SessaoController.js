const connection = require('../database/connection');

module.exports = {
    async Criar(request, response) {

        const {ID} = request.body;

        const ong = await connection('ONGs').where('ID', ID).select('NOME').first();

        if (!ong)
            return response.status(400).json({ error: 'Nenhuma ONG com este ID' });

        return response.json(ong);
    }
}