Package.describe({
  summary: "Shippo integration",
  version: "0.0.3",
  git: "https://github.com/yubozhao/meteor-shippo.git"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR-CORE@0.9.0-atm");

  api.use('http', ['client', 'server']);
  api.add_files('shippo.js', 'server');
  api.export('Shippo', 'server');
});
