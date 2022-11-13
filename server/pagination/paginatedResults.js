const paginatedResults = (model, populate, filter) => {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const name = req.query.name;
    const sizeNumber = req.query.sizeNumber;
    const price = req.query.price;
    const orderId = req.query.orderId;
    const detailId = req.query.detailId

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    try {
      const _filter = {
        ...(filter || {}),
      };
      if (name) {
        _filter.name = { $regex: name, $options: "$i" };
      }
      if (sizeNumber) {
        _filter.sizeNumber = { $regex: sizeNumber, $options: "$i" };
      }
     
      if (orderId) {
        _filter._id = orderId ;
      }
      if (detailId) {
        _filter._id = detailId ;
      }
      if (price && price === "lt") {
        _filter.price = { $lt: 2000000 };
      }
      if (price && price === "gte") {
        _filter.price = { $gte: 2000000, $lte: 4000000 };
      }

      // array chua tat ca du lieu
      const all = await model.find(_filter).exec();

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
        .find(_filter)
        .populate(populate)
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
