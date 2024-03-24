import APIFeatures from "./apiFeatures.js";

export const createOne = (Model) => async (req, res) => {
  const doc = await Model.create(req.body);

  res.status(201).json({
    status: "success",
    data: doc,
  });
};

export const updateOne = (Model) => async (req, res, next) => {
  let doc = await Model.findOne({ _id: req.params.id });

  if (!doc) {
    return next(new Error("No document found with that Id"));
  }

  Object.assign(doc, req.body);
  await doc.save();

  res.status(200).json({
    status: "success",
    data: doc,
  });
};

export const getAll = (Model) => async (req, res) => {
  req.query = {
    ...req.query,
    $or: [{ blocked: false }, { blocked: { $exists: false } }],
  };

  const features = new APIFeatures(Model, req.query)
    .filter()
    .sort()
    .limitFields()
    .populate()
    .paginate();

  const doc = await features.query;

  const countFeatures = new APIFeatures(Model, req.query).filter().count();
  const count = await countFeatures.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: doc,
    total_count: count,
  });
  return doc;
};

export const getOne = (Model) => async (req, res, next) => {
  let query = Model.findById(req.params.id);

  if (req.query.populate) query = query.populate(req.query.populate);
  const doc = await query;

  if (!doc) {
    return next(new Error("No document found with that Id"));
  }

  res.status(200).json({
    status: "success",
    data: doc,
  });
  return doc;
};

export const deleteOne = (Model) => async (req, res, next) => {
  const doc = await Model.findOneAndDelete({ _id: req.params.id });
  if (!doc) {
    return next(new Error("No document found with that Id"));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
