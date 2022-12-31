const QRCode = require("qrcode");

QRCode.toDataURL("https://me.com", function (err, url) {
  console.log(url);
});
