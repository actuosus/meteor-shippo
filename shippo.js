var settings = Meteor.settings;

var SHIPPO_USER = process.env.SHIPPO_USER || 
  (settings && settings.shippo_user);

var SHIPPO_PASSWORD = process.env.SHIPPO_PASSWORD || 
  (settings && settings.shippo_password);

if (!SHIPPO_USER)
  throw new Error(
    'SHIPPO_USER not set in Meteor.settings or an environment variable'
  );

if (!SHIPPO_PASSWORD)
  throw new Error(
    'SHIPPO_PASSWORD not set in Meteor.settings or an environment variable'
  );

Shippo = Npm.require('shippo')(SHIPPO_USER, SHIPPO_PASSWORD);
