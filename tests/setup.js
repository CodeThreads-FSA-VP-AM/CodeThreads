const { buildTables } = require('../db/init_db');

const setup = async () => {
  await buildTables();
};

module.exports = setup;
