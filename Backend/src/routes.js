const { celebrate, Segments, Joi } = require('celebrate')

const express = require('express');
const OngController = require('./Controller/OngController')
const CasosController = require('./Controller/CasosController')
const PerfilController = require('./Controller/PerfilController')
const SessaoController = require('./Controller/SessaoController')

const routes = express.Router();

routes.post('/sessao', SessaoController.Criar);

routes.get('/ongs', OngController.Listar)
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    NOME: Joi.string().required(),
    EMAIL: Joi.string().required().email(),
    WHATSAPP: Joi.string().required().min(10).max(11),
    CIDADE: Joi.string().required(),
    UF: Joi.string().required().length(2)
  })
}), OngController.Criar);

routes.get('/perfil', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown()

}), PerfilController.Listar)

routes.post('/casos', CasosController.Criar);
routes.get('/casos', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), CasosController.Listar);

routes.delete('/casos/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), CasosController.Deletar);

module.exports = routes;