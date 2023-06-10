import expressAsync from "express-async-handler";
import Sales from "../models/salesModel.js";
import Store from "../models/storeModel.js";

export const getSalesItems = expressAsync(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        customer: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};



  const sales = await Sales.find({ ...keyword })
    .sort({ createdAt: -1 })
    .populate("item");

  res.json({ sales });
});

export const getRecentSales = expressAsync(async (req, res) => {
  var start = new Date().toDateString();
  const sales = await Sales.find({date: { $gte: start },})
    .sort({ createdAt: -1 })
    .populate("item")
    

  res.json({ sales });
});

export const getUnPaidSalesItems = expressAsync(async (req, res) => {
  const sales = await Sales.find({ isPaid: false })
    .sort({ createdAt: -1 })
    .populate("item");

  res.json({ sales });
});

export const getPaidSalesItems = expressAsync(async (req, res) => {
  const sales = await Sales.find({ isPaid: true })
    .sort({ createdAt: -1 })
    .populate("item");

  res.json({ sales });
});

export const getSalesById = expressAsync(async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (sale) {
      res.json(sale);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createSalesItem = expressAsync(async (req, res) => {
  const { item, customer, quantity, price, date, isPaid } = req.body;

  const store = await Store.findById(item);
  if (store) {
    const sale = new Sales({
      item,
      itemName: item.name,
      customer,
      quantity,
      price,
      date,
      isPaid,
    });
    const createdSales = await sale.save();

    if (createdSales) {
      store.countInStock = store.countInStock - quantity;
      const updatedStoreItem = await store.save();
    }
    res.status(201).json(createdSales);
  } else {
    res.status(404);
    throw new Error("Item Not Found");
  }
});

export const updateSalesItem = expressAsync(async (req, res) => {
  const { item, customer, quantity, price, date, isPaid } = req.body;

  const sale = await Sales.findById(req.params.id);

  if (sale) {
    sale.item = item;
    sale.customer = customer;
    sale.quantity = quantity;
    sale.price = price;
    sale.date = date;
    sale.isPaid = isPaid;

    const updatedStoreItem = await sale.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});

export const updateSalesBillingItem = expressAsync(async (req, res) => {
  const { isPaid } = req.body;

  const sale = await Sales.findById(req.params.id);

  if (sale) {
    sale.isPaid = isPaid;

    const updatedStoreItem = await sale.save();
    res.json({
      updatedStoreItem,
    });
  } else {
    res.status(404);
    throw new Error("Store item Not Found");
  }
});

export const deleteSalesItemById = expressAsync(async (req, res) => {
  try {
    const sale = await Sales.findByIdAndDelete(req.params.id);
    if (sale) {
      res.json({ message: "Sales item removed" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
