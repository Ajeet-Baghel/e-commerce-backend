require("dotenv").config();
const app = require("./netlify/functions/src/app");

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is Running At Port ${PORT}`);
  }
});
