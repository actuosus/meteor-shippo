Package.describe(" integration");

Npm.depends({"shippo": "0.0.1"});

Package.on_use(function (api) {
  api.add_files('shippo.js', 'client');

  api.export('Shippo', 'server');
});
