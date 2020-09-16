const connection = require("./connection");

class ORM {
  connection;

  constructor(connection) {
    this.connection = connection;
  }
}

// selectAll();

// insertOne();

// updateOne();

const orm = "check orm export";

module.exports = orm;
