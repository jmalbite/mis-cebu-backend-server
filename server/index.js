const express = require('express');
const cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://192.168.209.181:3000',
};

//middlewares
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//testing api
app.get('/', (req, res) => {
  res.json({ message: 'welcome to mis-logs-managment' });
});

require('./routes/visitorlogs.route.js')(app);
require('./routes/borrowerslog.route.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
