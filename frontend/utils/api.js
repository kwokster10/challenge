var csApi = (function() {
  window.DEA = {
    success: [],
    error: {}
  };

  var api = {},
    baseUrl = 'https://dea.staging.credsimple.com',
    path = '/v1/clients_providers/',
    id = 20;

  api.getData = function(callback) {
    var requestUrl = baseUrl + path + id,
      request = new XMLHttpRequest();

    request.open('GET', requestUrl);

    request.onload = function() {
      var response = request.response;

      // in case the response is empty
      if (response.length > 0) {
        response = JSON.parse(response);
      }

      window.DEA.success = callback(response);
      window.DEA.app();
    };

    request.onerror = function(e) {
      window.DEA.error = {
        response: request.response,
        message: e
      };
    };

    request.send();
  };

  return api;

})();
