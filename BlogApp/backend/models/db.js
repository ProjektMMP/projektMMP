const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (!err) {
    console.log("MongoDB połączono pomyślnie.");
  } else {
    console.log(
      "Błąd przy połączeniu z bazą danych: " + JSON.stringify(err, undefined, 2)
    );
  }
});

require("./user.model");
