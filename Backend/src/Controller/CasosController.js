const connection = require('../database/connection');

module.exports = {
    async Listar(request, response) {
    
        const {page = 1 } = request.query;
        const [count] = await connection('CASOS').count();
        const casos = await connection('CASOS')
        .join('ONGs','ONGs.ID','=','CASOS.ONG_ID')
        .limit(5)
        .offset((page - 1) * 5)
        .select('CASOS.*',
        'ONGs.NOME',
        'ONGs.EMAIL',
        'ONGs.WHATSAPP',
        'ONGs.CIDADE',
        'ONGs.UF',);
        response.header('X-Total-Count', count['count(*)'])

        return response.json(casos);
    },

    async Criar(request, response) {
        const { TITULO, DESCRICAO, VALOR } = request.body;
        const ONG_ID = request.headers.authorization;

        const resultado = await connection('CASOS').insert({
            TITULO,
            DESCRICAO,
            VALOR,
            ONG_ID
        });
        
        const id = resultado[0];

        return response.json({ id });
    },

    async Deletar (request, response){
        const {id} = request.params;
        const ONG_ID = request.headers.authorization;

        const caso = await connection('CASOS')
            .where('ID', id)
            .select('ONG_ID')
            .first();

        if(caso.ONG_ID != ONG_ID)
            return response.status(401).json({error: 'Não Autorizado'});

        await connection('CASOS').where('ID', id).delete();

        return response.status(204).send();

    }
};