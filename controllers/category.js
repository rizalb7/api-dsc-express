const db = require("../services/db");
const config = require("../config");
const helper = require("../helper");

exports.getMultiple = async (page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM tbl_category LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  const meta = { page, length };
  return {
    status,
    data,
    meta,
  };
};

exports.getAll = async () => {
  const rows = await db.query(`SELECT * FROM tbl_category`);
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  return {
    status,
    data,
    length,
  };
};
