
exports.up = function (knex) {
    return knex.schema.createTable('CASOS', function (table) {
        table.increments();
        table.string('TITULO').notNullable();
        table.string('DESCRICAO').notNullable();
        table.decimal('VALOR').notNullable();

        table.string('ONG_ID').notNullable();

        table.foreign('ONG_ID').references('ID').inTable('ONGs')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('CASOS');
};
