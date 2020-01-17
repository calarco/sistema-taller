const assert = require('assert');
const app = require('../../src/app');

describe('\'fabricantes\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/fabricantes');

    assert.ok(service, 'Registered the service');
  });
});
