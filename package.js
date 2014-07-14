Package.describe(" integration");

Npm.depends({"when": "3.3.1"});
//XXX Until they make it into npm we got go through this way :(
//Npm.depends({"shippo": "0.0.1"});

Package.on_use(function (api) {
  api.use('http', ['client', 'server']);
  api.add_files('shippo.js', 'server');
  api.export('Shippo', 'server');
});
