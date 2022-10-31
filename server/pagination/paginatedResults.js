const paginatedResults = (model) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const name = req.query.name;
    const lt = req.query.lt; // nho hon
    const gte = req.query.gte; // lon hon hoac bang

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};


    try {
      const filter = {};
      if (name) {
        filter.name = { $regex: name, $options: "$i" };
      }
      if(lt) {
        filter.price =  {$lt: 220000 }
      }
      if(gte) {
        filter.price =  {$gte: 200000, $lte: 1600000}
      }

      // array chua tat ca du lieu
      const all = await model.find(filter).exec();

      // tinh tong so data
      let totalData = 0;
      for (const obj of all) {
        if (obj) totalData++;
      }

      if (endIndex < totalData) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      // tim ra tong so trang
      results.pageCount = Math.ceil(totalData / limit);


      results.results = await model
        .find(filter)
        .populate(["category", "sizes.size"])
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};

module.exports = paginatedResults;
