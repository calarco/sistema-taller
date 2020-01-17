const assert = require('assert');
const app = require('../../src/app');

describe('\'modelos\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/modelos');

    assert.ok(service, 'Registered the service');
  });
});
