/*
 *  Shippo use POST and GET.  if you want to update data, just created another
 *  one  (quote from their doc)
 */

var ShippoAPI = function (options) {
  this.options = options || {};
};

ShippoAPI.prototype = {
  configure: function (options) {
    _.extend(this.options, options);
    return this;
  },

  url: 'https://api.goshippo.com/v1/resource',

  headers: function (options) {
    options = options || {};
    var auth = 'Basic ' +
      new Buffer(this.options.userName + ':' + this.options.password).toString('base64');
    return _.extend({
      "Authorization": auth
    }, options.headers || {});
  },

  request: function (method, resource, options) {
    var url = this.url.replace('resource', resource);

    var httpRequestOptions = {
      params: options.params || {},
      headers: this.headers(options)
    };

    if (options.data)
      httpRequestOptions = _.extend(httpRequestOptions, {data: options.data});

    var result = HTTP[method.toLowerCase()](url, httpRequestOptions);

    if (result) {
      var statusCode = result.statusCode;
      if (statusCode.toString()[0] === '2') {
        return result;
      } else {
        throw new Error('Shippo Request Error: ', result.statusCode, result);
      }
    }
    if (result && result.statusCode === 201) {
      return result;
    }
    else
      throw new Error('Shippo Request Error: ', result.statusCode, result);
  },

  get: function (resource, options) {
    return this.request('get', resource, options);
  },

  post: function (resource, options) {
    return this.request('post', resource, options);
  },

  //business api
  createAddress: function (data, options) {
    var result = this.post('addresses/', _.extend({data: data}, options));
    return result.data;
  },

  validateAddress: function (addressId, options) {
    var url = 'addresses/' + addressId + '/validate';
    var result = this.get(url, options);

    return result.data;
  },

  validateNewAddress: function (data, options) {
    var result = this.createAddress(data, options);

    return this.validateAddress(result.object_id, options);
  },

  listAddresses: function (options) {
    var result = this.get('addresses/', options);

    return result.data;
  },

  createParcel: function (data, options) {
    var result = this.post('parcels/', _.extend({data: data}, options));
    return result.data;
  },

  createShipment: function (data, options) {
    var result = this.post('shipments/', _.extend({data: data}, options));
    return result.data;
  },

  //this is goiong to be used to create transaction
  checkRate: function (data, options) {
    var shipment = this.createShipment(data, options);

    var url = 'shipments/' + result.object_id + '/rates/USD';
    var result = this.get(url, options);

    return result.data;
  },

  createTransaction: function (data, options) {
    var addressFrom = this.createAddress(addressFrom, options);
    var addressTo = this.createAddress(addressTo, options);
    var shipment = _.extend(data.shipment, {
      address_from: addressFrom.object_id,
      address_to: addressTo.object_id
    });
    var rateData = this.checkRate(shipment, options);

    var transactionData = _.extend(data.transaction, {rate: rateData.object_id});
    var result = this.post('transactions/', transactionData, options);

    return result.data;
  }
};

Shippo = new ShippoAPI({
  userName: Meteor.settings.shippo_user,
  password: Meteor.settings.shippo_password,
});
