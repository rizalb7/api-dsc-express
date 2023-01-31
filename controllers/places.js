const db = require("../services/db");
const config = require("../config");
const helper = require("../helper");

exports.getMultiple = async (page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    // `SELECT * FROM tbl_places LIMIT ${offset},${config.listPerPage}`
    `SELECT * FROM tbl_places LEFT JOIN tbl_category ON tbl_places.p_cat_id = tbl_category.cid LIMIT ${offset},${config.listPerPage}`
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

exports.getOffLimit = async (offset, limit) => {
  const rows = await db.query(
    `SELECT * FROM tbl_places LIMIT ${offset},${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  return {
    status,
    data,
    length,
  };
};

exports.getCategory = async (cid, search) => {
  const rows = await db.query(
    `SELECT * FROM tbl_places LEFT JOIN tbl_category ON tbl_places.p_cat_id = tbl_category.cid WHERE tbl_places.p_cat_id = ${cid} ${
      search ? `AND tbl_places.place_name LIKE "%${search}%"` : ""
    } ORDER BY tbl_places.p_id ASC`
  );
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  return {
    status,
    data,
    length,
  };
};

exports.getGallery = async (pid) => {
  const rows = await db.query(
    `SELECT * FROM tbl_place_gallery LEFT JOIN tbl_places ON tbl_place_gallery.place_id = tbl_places.p_id WHERE tbl_place_gallery.place_id = ${pid} ORDER BY tbl_place_gallery.id ASC`
  );
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  return {
    status,
    data,
    length,
  };
};

exports.getRating = async (pid) => {
  const rows = await db.query(
    `SELECT tbl_rating.*, tbl_users.name FROM tbl_rating RIGHT JOIN tbl_users ON tbl_rating.user_id = tbl_users.id WHERE tbl_rating.post_id = ${pid} ORDER BY tbl_rating.id ASC`
  );
  const data = helper.emptyOrRows(rows);
  const length = data.length;
  const status = length < 1 ? false : true;
  return {
    status,
    data,
    length,
  };
};
