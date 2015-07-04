'use strict';

describe('Service: googleSvc', function () {

  // load the service's module
  beforeEach(module('nightlife15App'));

  // instantiate service
  var googleSvc;
  beforeEach(inject(function (_googleSvc_) {
    googleSvc = _googleSvc_;
  }));

  it('should do something', function () {
    expect(!!googleSvc).toBe(true);
  });

});
