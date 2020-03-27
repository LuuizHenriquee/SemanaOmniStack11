const gerarID =require('../../src/funcoesGenericas/gerarID')

describe('Gerar ID', () => {
  it('Deve gerar um ID Unico', () => {
    const id = gerarID();
    expect(id).toHaveLength(8)
  })
})