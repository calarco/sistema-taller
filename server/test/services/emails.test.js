const assert = require('assert');
const app = require('../../src/app');

describe('\'emails\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/emails');

    assert.ok(service, 'Registered the service');
  });
});
