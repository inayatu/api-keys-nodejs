const mongoose = require("mongoose");

module.exports = (dbUri) => {
  mongoose.connect(dbUri, (err, suc) => {
    if (err) {
      console.log("[-] Error in DB connection ", err);
      throw new Error(err);
    } else {
      console.log("[+] DB connected");
    }
  });
};
