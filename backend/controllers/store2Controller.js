import expressAsync from "express-async-handler";
import Store2 from "../models/store2Model.js";

export const getStoreItems = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
  ? {
    name: {
      $regex: req.query.keyword,
      $options: "i",
    },
    }
  : {};
    const items = await Store2.find({...keyword}).sort({ createdAt: -1 });

    res.json({ items });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getStoreItemById = expressAsync(async (req, res) => {
  try {
    const item = await Store2.findById(req.params.id);
    if (item) {
      res.json(item);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createStoreItem = expressAsync(async (req, res) => {
  const { name, selling, cost, countInStock,  } = req.body;

  const items = new Store2({
    name,
    selling,
    cost,
    countInStock,
  });
  const createdStoreItem = await items.save();

  res.status(201).json(createdStoreItem);
});

export const updateStoreItem = expressAsync(async (req, res) => {
  const { name, selling, cost, countInStock } = req.body;

  const item = await Store2.findById(req.params.id);

  if (item) {
    item.name = name;
    item.selling = selling;
    item.cost = cost;
    item.countInStock = countInStock;

    const updatedStoreItem = await item.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});


export const updateStoreItemCountStck = expressAsync(async (req, res) => {
  const { countInStock } = req.body;

  const item = await Store2.findById(req.params.id);

  if (item) {
    item.countInStock = item.countInStock - countInStock;

    const updatedStoreItem = await item.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});

export const deleteStoreItemById = expressAsync(async (req, res) => {
  try {
    const item = await Store2.findByIdAndDelete(req.params.id);

    res.json({ message: "Store item removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
