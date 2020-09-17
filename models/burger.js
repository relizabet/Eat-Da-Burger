const ormConnection = require("../config/ormConnection");

// call the ORM functions using burger specific input for the ORM
// const burger = "check burger export";

const burger = {
  selectAll: function () {
    return ormConnection.selectAll("burgers");
  },

  selectAllWhere: function (condition) {
    return ormConnection.selectAllWhere("burgers", condition);
  },

  insertOne: function (col, val) {
    return ormConnection.insertOne("burgers", col, val);
  },

  updateOne: function (colObj, condition) {
    return ormConnection.updateOne("burgers", colObj, condition);
  },

  deleteOne: function (condition) {
    return ormConnection.deleteOne("burgers", condition);
  },
};

module.exports = burger;
