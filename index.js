const server = require('./server');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`we gots a servers running on port ${port}.`));
