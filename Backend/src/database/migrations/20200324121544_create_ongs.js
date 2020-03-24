
exports.up = function(knex) {
  return knex.schema.createTable('ONGs', function(table){
      table.string('ID').primary();
      table.string('NOME').notNullable();
      table.string('EMAIL').notNullable();
      table.string('WHATSAPP').notNullable();
      table.string('CIDADE').notNullable();
      table.string('UF', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ONGs');
};
