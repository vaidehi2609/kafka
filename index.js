const express = require('express');

const app = express();

const route = require('./routes/route.js')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/app',route)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🎉🎉🎉 Application running on port: ${PORT} 🎉🎉🎉`);
});