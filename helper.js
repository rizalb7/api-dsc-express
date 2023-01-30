exports.getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
};

exports.emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};
