// For Dev App Config
var config = {
  BASEURL: " https://virtuapp.azurewebsites.net",
  RETURN_TYPE: 2,
  WARRANTY_TYPE: 1,
  SHIPMENT_TYPE: 3,
  blob_url: "https://kestorageacct001.blob.core.windows.net/media",
  hd: {
    headers: {
      "auth-token": JSON.parse(localStorage.getItem("auth-token"))?.authToken,
    },
  },
};

setInterval(() => {
  config["shopId"] = JSON.parse(localStorage.getItem("shopId")) || 0;
}, 100);

export default config;
