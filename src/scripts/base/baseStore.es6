const METHOD = {
    GET: 'GET',
    POST: 'POST'
};

class BaseStore {
  constructor() {
    this.accessToken = 'XXX';
  }

  callService(endpoint, method, data, headers) {
    let deferred = $.Deferred();
    let self = this;
    let requestHeaders = {
      'access_token': this.accessToken
    };

    jQuery.extend(requestHeaders, headers || {});

    let request = {
      url: endpoint,
      type: method || METHOD.POST,
      headers: requestHeaders,
      contentType: 'application/json'
    };

    if (data) {
      request.data = JSON.stringify(data);
    }

    $.ajax(request).done(function (response) {
      deferred.resolve(response);
    }).fail(function (jqXHR) {
      deferred.reject(jqXHR);
    });

    return deferred.promise();
  }

  loadJson(url) {
    let deferred = $.Deferred();

    $.ajax({
      dataType: 'json',
      url: url
    }).done(function (response) {
      deferred.resolve(response);
    }).fail(function (jqXHR, textStatus) {
      deferred.reject(jqXHR);
    });

    return deferred.promise();
  }
}

export default BaseStore;
