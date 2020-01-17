const assert = require('assert');
const app = require('../../src/app');

describe('\'presupuestos\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/presupuestos');

    assert.ok(service, 'Registered the service');
  });
});
