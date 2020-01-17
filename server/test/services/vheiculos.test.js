const assert = require('assert');
const app = require('../../src/app');

describe('\'vheiculos\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/vehiculos');

    assert.ok(service, 'Registered the service');
  });
});
