import expressAsync from "express-async-handler";
import Sales2 from "../models/sales2Model.js";

export const getSalesItems = expressAsync(async (req, res) => {
  let pageSize = 200;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        customer: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const salesCount = await Sales2.countDocuments({ ...keyword });
  const sales = await Sales2.find({ ...keyword })
    .sort({ date: -1 })
    .populate("orderItems.item")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ sales, salesCount });
});

export const getRecentSales = expressAsync(async (req, res) => {
  var start = new Date().toDateString();
  let pageSize = 200;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        customer: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const salesCount = await Sales2.find({date: { $gte: start }}).countDocuments({ ...keyword });
  const sales = await Sales2.find({ ...keyword, date: { $gte: start } })
    .sort({ date: -1 })
    .populate("orderItems.item")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ sales, salesCount });
});

export const getUnPaidSalesItems = expressAsync(async (req, res) => {
  const sales = await Sales2.find({ isPaid: false })
    .sort({ date: -1 })
    .populate("orderItems.item");

  res.json({ sales });
});

export const getPaidSalesItems = expressAsync(async (req, res) => {
  const sales = await Sales2.find({ isPaid: true })
    .sort({ date: -1 })
    .populate("orderItems.item");

  res.json({ sales });
});

export const getSalesIByDateRange = expressAsync(async (req, res) => {
  const { startDate, endDate } = req.body;
  var start = new Date(startDate);
  start.setDate(start.getDate() - 1);
  start.toDateString();

  var end = new Date(endDate);
  end.setDate(end.getDate() + 1);
  end.toDateString();
  const sales = await Sales2.find({ date: { $lte: end, $gte: start } })
    .sort({ date: -1 })
    .populate("orderItems.item");

  res.json({ sales });
});

export const getSalesById = expressAsync(async (req, res) => {
  try {
    const sale = await Sales2.findById(req.params.id);
    if (sale) {
      res.json(sale);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createSalesItem = expressAsync(async (req, res) => {
  const {  orderItems, customer, phone, date,totalPrice, invoiceId, isPaid } =
    req.body;

  
  
    const sale = new Sales2({
      orderItems,
      customer,
      phone,
      date,
      totalPrice,
      invoiceId,
      isPaid,
    });
    const createdSales = await sale.save();

    if (createdSales) {
      
      
     
    }
    res.status(201).json(orderItems);
  
});

export const updateSalesItem = expressAsync(async (req, res) => {
  const { item, customer, quantity, price, date, isPaid } = req.body;

  const sale = await Sales2.findById(req.params.id);

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

  const sale = await Sales2.findById(req.params.id);

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
    const sale = await Sales2.findByIdAndDelete(req.params.id);
    if (sale) {
      res.json({ message: "Sales item removed" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});



export const getTotalSales = expressAsync(async (req, res) => {
  try {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
   
    var test = yesterday.toDateString();

    var start = new Date()
    var mth =  start.setDate(start.getDate() - 1);
    start = new Date().toDateString();

    const todaySalesTotal = (await Sales2.find({ date: { $gte: start } }))
      .length;
    const yesterdaySalesTotal = (
      await Sales2.find({ date: { $gte: test, $lt: start } })
    ).length;

    

    let todaySalesPerc;
    let yesterdaySalesPerc;

    if (todaySalesTotal != 0 && yesterdaySalesTotal != 0) {
      if (todaySalesTotal > yesterdaySalesTotal) {
        todaySalesPerc = parseInt(
          ((yesterdaySalesTotal / todaySalesTotal) * 100).toFixed(0)
        );
        yesterdaySalesPerc = 0
          // parseInt(((yesterdaySalesTotal / todaySalesTotal) * 100).toFixed(0)) -
          // 100;
      } else if (todaySalesTotal < yesterdaySalesTotal) {
        yesterdaySalesPerc = parseInt(
          ((todaySalesTotal / yesterdaySalesTotal) * 100).toFixed(0)
        );
        todaySalesPerc =0
          // parseInt(((todaySalesTotal / yesterdaySalesTotal) * 100).toFixed(0)) -
          // 100;
      } else {
        yesterdaySalesPerc = 50
       
        todaySalesPerc = 50
      }
    } else {
      todaySalesPerc = todaySalesTotal == 0 ? 0 :100

      yesterdaySalesPerc = yesterdaySalesTotal == 0 ? 0 :100
    }


   
    
    const sales = (await Sales2.find()).length;

    function kFormatter(num) {
      return Math.abs(num) > 999
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(3) + "k"
        : Math.sign(num) * Math.abs(num);
    }

    let totalSales = kFormatter(sales);

    res.json({ totalSales , todaySalesPerc, yesterdaySalesPerc});
  } catch (error) {
    res.json({ error: error.message });
  }
});
