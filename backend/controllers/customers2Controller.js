import expressAsync from "express-async-handler";
import Customers2 from "../models/customers2Model.js";
import Sales2 from "../models/sales2Model.js";

export const getCustomers = expressAsync(async (req, res) => {
  try {
  let pageSize = 200;
  const page = Number(req.query.pageNumber) || 1;
    const keyword2 = req.query.keyword2
      ? {
          name: {
            $regex: req.query.keyword2,
            $options: "i",
          },
        }
      : {};

    const customerCount = await Customers2.countDocuments({ ...keyword2 });  
    const customers = await Customers2.find({ ...keyword2 }).sort({
      createdAt: -1,
    }).limit(pageSize)
    .skip(pageSize * (page - 1));

    res.json({ customers , customerCount});
  } catch (error) {
    res.json({ error: error.message });
  }
});



export const getCustomersBYDateRage = expressAsync(async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    
    const keyword2 = req.query.keyword2
      ? {
          name: {
            $regex: req.query.keyword2,
            $options: "i",
          },
        }
      : {};

      var start = new Date(startDate);
      start.setDate(start.getDate() - 1);
      start.toDateString();
    
      var end = new Date(endDate);
      end.setDate(end.getDate() +1);
      end.toDateString();

      
    const customers = await Customers2.find({ ...keyword2, createdAt: { $lte: end, $gte: start } }).sort({
      createdAt: -1,
    });

    res.json({ customers });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTotalCustomersAndSales = expressAsync(async (req, res) => {
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

    const todayCustomersTotal = (await Customers2.find({ createdAt: { $gte: start } }))
      .length;
    const yesterdayCustomersTotal = (
      await Customers2.find({ createdAt: { $gte: test, $lt: start } })
    ).length;

    let todayPerc;
    let yesterdayPerc;
    let todayCusPerc;
    let yesterdayCusPerc;

    if (todaySalesTotal != 0 && yesterdaySalesTotal != 0) {
      if (todaySalesTotal > yesterdaySalesTotal) {
        todayPerc = parseInt(
          ((yesterdaySalesTotal / todaySalesTotal) * 100).toFixed(0)
        );
        yesterdayPerc = 0
          // parseInt(((yesterdaySalesTotal / todaySalesTotal) * 100).toFixed(0)) -
          // 100;
      } else if (todaySalesTotal < yesterdaySalesTotal) {
        yesterdayPerc = parseInt(
          ((todaySalesTotal / yesterdaySalesTotal) * 100).toFixed(0)
        );
        todayPerc =0
          // parseInt(((todaySalesTotal / yesterdaySalesTotal) * 100).toFixed(0)) -
          // 100;
      } else {
        yesterdayPerc = 50
       
        todayPerc = 50
      }
    } else {
      todayPerc = todaySalesTotal == 0 ? 0 :100

      yesterdayPerc = yesterdaySalesTotal == 0 ? 0 :100
    }


    if (todayCustomersTotal != 0 && yesterdayCustomersTotal != 0) {
      if (todayCustomersTotal > yesterdayCustomersTotal ) {
        todayCusPerc = parseInt(
          ((yesterdayCustomersTotal / todayCustomersTotal) * 100).toFixed(0)
        );
        yesterdayCusPerc = 0
          // parseInt(((yesterdayCustomersTotal / todayCustomersTotal) * 100).toFixed(0)) -
          // 100;
      } else if (todayCustomersTotal < yesterdayCustomersTotal) {
        yesterdayCusPerc = parseInt(
          ((todayCustomersTotal / yesterdayCustomersTotal) * 100).toFixed(0)
        );
        todayCusPerc = 0
          // parseInt(((todayCustomersTotal / yesterdayCustomersTotal) * 100).toFixed(0)) -
          // 100;
      } else {
        yesterdayCusPerc = 50
        todayCusPerc = 50
      }
    } else {
      todayCusPerc = todayCustomersTotal == 0 ? 0 :100

      yesterdayCusPerc = yesterdayCustomersTotal == 0 ? 0 :100
    }
    
    const customers = (await Customers2.find()).length;
    const sales = (await Sales2.find()).length;

    function kFormatter(num) {
      return Math.abs(num) > 999 
        ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(3) + "k"
        : Math.sign(num) * Math.abs(num);
    }

    let totalSales = kFormatter(sales);
    let totalCustomer = kFormatter(customers);

    res.json({ totalSales, totalCustomer , todayPerc, yesterdayPerc, todayCusPerc, yesterdayCusPerc});
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTasksCustomersById = expressAsync(async (req, res) => {
  try {
    const sales = await Sales2.find({ customer: req.params.id }).populate("customer");
    if (sales) {
      res.json({ sales });
    } else {
      res.status(404);
      throw new Error("Tasks Not Found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTasksCustomersByName = expressAsync(async (req, res) => {
  try {
    const customer = await Customers2.find({ name: req.params.name });
    if (customer) {
      res.json({ customer });
    } else {
      res.status(404);
      throw new Error("Customer Not Found");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getCustomersById = expressAsync(async (req, res) => {
  try {
    const customer = await Customers2.findById(req.params.id);
    if (customer) {
      res.json(customer);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createCustomers = expressAsync(async (req, res) => {
  try {
    const { name, phone, tasks } = req.body;

    const excustomers = await Customers2.findOne({ phone });
    if (!excustomers) {
      const customers = await Customers2.find().sort({ custID: -1 });
      if (customers.length !==0) {
        const customer = new Customers2({
          custID: customers[0].custID + 1,
          name,
          phone,
          tasks,
        });
        const createdCustomers = await customer.save();
        res.status(201).json(createdCustomers);
      } else {
        const customer = new Customers2({
          custID: 1,
          name,
          phone,
          tasks,
        });
        const createdCustomers = await customer.save();
        res.status(201).json(createdCustomers);
      }

     
    } else {
      res.status(500).json({ message: "Already exists" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

export const updateCustomers = expressAsync(async (req, res) => {
  const { custID, name, phone } = req.body;

  const customer = await Customers2.findById(req.params.id);

  

  if (customer) {
   
    customer.custID = custID
    customer.name = name;
    customer.phone = phone;

    const excustomer = await Customers2.findOne({custID});
    if (excustomer  &&  !excustomer._id.equals(customer._id)) {
      res.status(400);
    throw new Error("Duplicate Id Not Allowed");
    }else{
      const updatedCustomers = await customer.save();
      res.json({
        updatedCustomers,
      });
    }
    
  } else {
    res.status(404);
    throw new Error("Customers Not Found");
  }
});

export const deleteCustomersById = expressAsync(async (req, res) => {
  try {
    const customer = await Customers2.findByIdAndDelete(req.params.id);

    res.json({ message: "Customers removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
