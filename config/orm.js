class ORM {
  connection;

  constructor(connection) {
    this.connection = connection;
  }

  query = (queryString, val) => {
    return new Promise((resolve, reject) => {
      console.log(this);
      this.connection.query(queryString, val, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  };

  printQuestionMarks(num) {
    const questionArr = [];

    for (let i = 0; i < num; i++) {
      questionArr.push("?");
    }

    return questionArr.toString();
  }

  objToSql = (ob) => {
    let questionArr = [];

    for (let key in ob) {
      let value = ob[key];
      if (Object.hasOwnProperty.call(ob, key)) {
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        questionArr.push(key + "=" + value);
      }
    }

    return questionArr.toString();
  };

  selectAll(tableInput) {
    let queryString = "SELECT * FROM " + tableInput;
    return this.query(queryString);
  }

  selectAllWhere(tableInput, condition) {
    let queryString = "SELECT * FROM " + tableInput;

    queryString += " WHERE ";
    queryString += condition;

    return this.query(queryString);
  }

  insertOne(table, col, val) {
    let queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += col.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += this.printQuestionMarks(val.length);
    queryString += ");";

    return this.query(queryString, val);
  }

  updateOne(table, colObj, condition) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += this.objToSql(colObj);
    queryString += " WHERE ";
    queryString += condition;

    return this.query(queryString);
  }

  deleteOne(table, condition) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    return this.query(queryString);
  }
}

module.exports = ORM;
