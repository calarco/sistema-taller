const assert = require('assert');
const app = require('../../src/app');

describe('\'turnos\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/turnos');

    assert.ok(service, 'Registered the service');
  });
});
