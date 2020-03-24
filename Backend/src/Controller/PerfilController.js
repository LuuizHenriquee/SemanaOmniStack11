const connection = require('../database/connection');

module.exports = {
    async Listar(request, response) {

        const ONG_ID = request.headers.authorization;
        const casos = await connection('CASOS').where('ONG_ID', ONG_ID).select('*')

        return response.json(casos);
    }
}