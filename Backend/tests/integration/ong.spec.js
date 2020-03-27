const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  })

  afterAll(async() => {
    await connection.destroy();
  })

  it('Deve criar nova ong', async () => {
    const response = await request(app)
    .post('/ongs')
    .send({
      NOME:"Teste API",
      EMAIL:"contato@teste.com",
      WHATSAPP:"1112345678",
      CIDADE:"São Paulo",
      UF:"SP"
    })

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);

  })
})