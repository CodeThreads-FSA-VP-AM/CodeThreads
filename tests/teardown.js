const client = require('../db/client');
const { handle } = require('../index');

const teardown = async ({ watch, watchAll }) => {
  if (watch || watchAll) {
    return;
  }

  await client.end();
  handle.close();
};

module.exports = teardown;
