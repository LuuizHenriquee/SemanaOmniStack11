const express = require('express');
const OngController = require('./Controller/OngController')
const CasosController = require('./Controller/CasosController')
const PerfilController = require('./Controller/PerfilController')
const SessaoController = require('./Controller/SessaoController')

const routes = express.Router();

routes.post('/sessao', SessaoController.Criar);

routes.get('/ongs', OngController.Listar)
routes.post('/ongs', OngController.Criar );

routes.get('/perfil', PerfilController.Listar)

routes.post('/casos', CasosController.Criar);
routes.get('/casos', CasosController.Listar)
routes.delete('/casos/:id', CasosController.Deletar);

module.exports = routes;