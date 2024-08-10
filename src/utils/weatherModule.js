const request = require("postman-request");

const weatherStatus = (zip, callback) => {
  const api = `http://api.weatherstack.com/current?access_key=6941a99dd0bca77d1b114a66d10dc4e0&query=${encodeURIComponent(
    zip
  )}`;
  request({ url: api, json: true }, (error, response, body) => {
    if (error) {
      callback("Unable to connect service...", "check your api call");
      return;
    }
    if (body.error) {
      callback(`Unable to find location: ${body.error}`);
      return;
    }
    const { weather_descriptions, temperature, feelslike } = body.current;
    const message = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
    callback(undefined, message);
  });
};

module.exports = weatherStatus;
