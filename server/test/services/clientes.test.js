const assert = require('assert');
const app = require('../../src/app');

describe('\'clientes\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/clientes');

    assert.ok(service, 'Registered the service');
  });
});
