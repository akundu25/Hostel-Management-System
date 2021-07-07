import adminProfile from "../models/adminProfile.js";

const PaginatedResults = (model = adminProfile, year = 0) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    if (year === 0) year = req.year;

    const results = {};

    if (endIndex < (await model.countDocuments({ year: year }).exec())) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit,
      };
    }

    results.results = await model
      .find(
        { year: year, application_status: "Pending" },
        { _id: 0, password: 0 }
      )
      .limit(limit)
      .skip(startIndex);

    res.paginatedResults = results;

    next();
  };
};

export default PaginatedResults;
