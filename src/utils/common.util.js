module.exports = {
  fetchRecord: async (
    model,
    options = {},
    paginate = false,
    unscoped = false
  ) => {
    let currentPage = 1,
      pageSize = 10;
    let queryMethod = unscoped ? model.unscoped() : model;

    let rows = [];
    if (paginate == true) {
      currentPage = parseInt(options.currentPage) || 1;
      pageSize = parseInt(options.pageSize) || 10;

      const offset = (currentPage - 1) * pageSize;
      options.offset = offset;
      options.limit = pageSize;
      delete options.currentPage;
      delete options.pageSize;
      delete options.is_paginate;
      rows = await queryMethod.findAll(options);
    } else {
      return await queryMethod.findAll(options);
    }

    const countOptions = { ...options };
    delete countOptions.limit;
    delete countOptions.offset;
    let count = await queryMethod.count(countOptions);
    let totalPages = Math.ceil(count / options.limit);

    return {
      totalItems: count,
      totalPages,
      currentPage,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
      previous: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < totalPages ? currentPage + 1 : null,
      rows,
    };
  },
};
