const express = require('express');//allow backedn JS files
const routes = require('./routes');//allow routes like paths
// import sequelize connection

const app = express();
// Creates express() function is exported to declare function e(): core.Express;
const PORT = process.env.PORT || 3001;// port id on local host

app.use(express.json());//allow JSON to be used and displayed
app.use(express.urlencoded({ extended: true }));
//parse incoming requests, make the form data available in req.body.
app.use(routes);//enable API routes

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
//syncs up with the tables created by the Models, to render them
  console.log(`App listening on port http://localhost:${PORT}!`);
});
