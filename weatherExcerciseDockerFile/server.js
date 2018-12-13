var http = require('http');
var soap = require('soap');
var fs = require('fs');
var myService = {
	MyService: {
		MyPort: {
			MyFunction: function(args) {
				return {
					name: args.name
				};
			}
		}
	}	
};

var xml = fs.readFileSync('wsdl/global-weather.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'application/xml'});
	console.log(request.url);
	console.log(request.headers);
	if (request.headers.soapaction === '"http://www.webserviceX.NET/GetWeather"') {
		response.end(unescape(fs.readFileSync('mock/GetWeather', 'utf8')));
	}
	else if (request.headers.soapaction === '"http://www.webserviceX.NET/GetCitiesByCountry"') {
		response.end(unescape(fs.readFileSync('mock/GetCitiesByCountry', 'utf8')));
	}
});

server.listen(8080);
soap.listen(server, '/wsdl', myService, xml);