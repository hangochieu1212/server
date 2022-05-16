const accountRouter = require('./account');
const courseRouter = require('./courses');
const bodyParser = require('body-parser');
function route(app) {
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(bodyParser.json());
   app.use('/account',accountRouter);
   app.use('/courses',courseRouter);
}

module.exports = route;