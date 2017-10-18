var http = require('http'),
	cors = require('cors'),
    app = require('./config/express');

http.createServer(app).listen(3000, function() {
    console.log('Server started at port: ' + this.address().port);
});

app.use(cors());


