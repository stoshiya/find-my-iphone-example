var iCloud = require("find-my-iphone").findmyphone;

iCloud.apple_id = process.env.APPLE_ID;
iCloud.password = process.env.PASSWORD;

var deviceName = new RegExp(process.env.DEVICE_NAME);

iCloud.getDevices(function (err, devices) {
  err ? console.error(err) : devices
    .filter(function(device) {
      return device.modelDisplayName.match(/iPhone|iPad/) !== null;
    })
    .filter(function(device) {
      return device.name.match(deviceName) !== null;
    })
    .forEach(function(device) {
      iCloud.alertDevice(device.id, function(err) {
        err ? console.error(err) : console.log('play sound on ' + device.name);
      });
    });
});

