const assert = require('assert');
const app = require('../../src/app');

describe('\'reparaciones\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/reparaciones');

    assert.ok(service, 'Registered the service');
  });
});
