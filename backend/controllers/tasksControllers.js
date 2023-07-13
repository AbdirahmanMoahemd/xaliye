import expressAsync from "express-async-handler";
import Tasks from "../models/tasksModel.js";
import Customers from "../models/customersModel.js";
import Events from "../models/eventsModel.js";

export const getTasks = expressAsync(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  var date = new Date();
  date.setUTCHours(0, 0, 0);
  // var dates = new Date(date.setDate(date.getDate() - 2));

  const tasks = await Tasks.find({
    ...keyword,
    bin: false,
    date: { $lt: date },
  }).sort({ date: -1 });

  res.json({ tasks });
});

export const getTotalTasks = expressAsync(async (req, res) => {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var test = yesterday.toDateString();

  var start = new Date().toDateString();

  const todayTaskTotal = (
    await Tasks.find({ bin: false, date: { $gte: start } })
  ).length;
  const yesterdayTaskTotal = (
    await Tasks.find({ bin: false, date: { $gte: test, $lt: start } })
  ).length;
  let todayPerc;
  let yesterdayPerc;

  if (todayTaskTotal != 0 && yesterdayTaskTotal != 0) {
    if (todayTaskTotal > yesterdayTaskTotal) {
      todayPerc = parseInt(
        ((yesterdayTaskTotal / todayTaskTotal) * 100).toFixed(0)
      );
      yesterdayPerc =0
      //   parseInt(((yesterdayTaskTotal / todayTaskTotal) * 100).toFixed(0)) -
      //   100;
    } else if (todayTaskTotal < yesterdayTaskTotal) {
      yesterdayPerc = parseInt(
        ((todayTaskTotal / yesterdayTaskTotal) * 100).toFixed(0)
      );
      todayPerc = 0
        // parseInt(((todayTaskTotal / yesterdayTaskTotal) * 100).toFixed(0))
    } 
    else {
      yesterdayPerc =50
      todayPerc = 50
    }
  } else {
    todayPerc = todayTaskTotal == 0 ? 0 : 100;
    yesterdayPerc = yesterdayTaskTotal == 0 ? 0 : 100;
  }

  const tasks = (await Tasks.find({ bin: false })).length;
  const onProcess = (await Tasks.find({ bin: false, stage: 0 })).length;
  const delivered = (await Tasks.find({ bin: false, status: 1 })).length;
  const finished = (await Tasks.find({ bin: false, stage: 1 })).length;
  const unfinished = (await Tasks.find({ bin: false, stage: 2 })).length;

  function kFormatter(num) {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(3) + "k"
      : Math.sign(num) * Math.abs(num);
  }

  let totalTasks = kFormatter(tasks);
  let totalOnProcess = kFormatter(onProcess);
  let totalDelivered = kFormatter(delivered);
  let totalFinished = kFormatter(finished);
  let totalUnfinished = kFormatter(unfinished);

  res.json({
    totalTasks,
    totalOnProcess,
    totalDelivered,
    totalFinished,
    totalUnfinished,
    todayPerc,
    yesterdayPerc,
  });
});

export const getTasksByPhone = expressAsync(async (req, res) => {
  try {
    let pageSize = 200;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};
    const count = await Tasks.countDocuments({ ...keyword });
    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ tasks, count });
  } catch (error) {
    res.json({ error: error.message });
  }
});



export const getOnProcessTasks = expressAsync(async (req, res) => {
  try {
    let pageSize = 200;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};
    const count = await Tasks.countDocuments({ ...keyword });
    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage: 0
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ tasks, count });
  } catch (error) {
    res.json({ error: error.message });
  }
});



export const getFinishedTasks = expressAsync(async (req, res) => {
  try {
    let pageSize = 200;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};
    const count = await Tasks.countDocuments({ ...keyword });
    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage: 1
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ tasks, count });
  } catch (error) {
    res.json({ error: error.message });
  }
});




export const getUnFinishedTasks = expressAsync(async (req, res) => {
  try {
    let pageSize = 200;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};
    const count = await Tasks.countDocuments({ ...keyword });
    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage: 2
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer")
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ tasks, count });
  } catch (error) {
    res.json({ error: error.message });
  }
});



export const getTasksByRange = expressAsync(async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    // var yesterday = new Date();
    // yesterday.setDate(yesterday.getDate() - 10);
    // var test = yesterday.toDateString();

    var start = new Date(startDate);
    start.setDate(start.getDate() - 1);
    start.toDateString();

    var end = new Date(endDate);
    end.setDate(end.getDate() + 1);
    end.toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      date: { $lte: end, $gte: start },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTasksByRecent = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    var start = new Date().toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      date: { $gte: start },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});


export const getOnProcessTasksByRecent = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    var start = new Date().toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage:0,
      date: { $gte: start },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getFinishedTasksByRecent = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    var start = new Date().toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage:1,
      date: { $gte: start },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});


export const getUnFinishedTasksByRecent = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    var start = new Date().toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      stage:2,
      date: { $gte: start },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTasksByThisWeek = expressAsync(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          phone: req.query.keyword,
        }
      : {};

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 6);
    var test = yesterday.toDateString();

    const tasks = await Tasks.find({
      ...keyword,
      bin: false,
      date: { $gte: test },
    })
      .sort({ date: -1 })
      .populate("user")
      .populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTasksInBin = expressAsync(async (req, res) => {
  try {
    const tasks = await Tasks.find({ bin: true }).populate("customer");

    res.json({ tasks });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const getTaskById = expressAsync(async (req, res) => {
  try {
    const task = await Tasks.findById(req.params.id).populate("customer");
    if (task) {
      res.json(task);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

export const createTask = expressAsync(async (req, res) => {
  const {
    name,
    phone,
    item,
    problem,
    amount,
    invoiceId,
    date,
    userid,
    comment,
  } = req.body;

  const excustomers = await Customers.findOne({ phone });
  if (!excustomers) {
    const customers = await Customers.find().sort({ custID: -1 });

    const newCustomer = new Customers({
      custID: customers[0].custID + 1,
      name,
      phone,
    });
    const createdCustomers = await newCustomer.save();
    if (createdCustomers) {
      const tasks = new Tasks({
        user: userid,
        name,
        phone,
        item,
        problem,
        amount,
        invoiceId,
        date,
        comment,
        customer: createdCustomers._id,
      });

      

      const createdTasks = await tasks.save();
      if (createdTasks) {
        const newEvent = new Events({
          user: userid,
          event:`Created New Ticket, invoiceId=${invoiceId} for customer ${name}`
        });
        const createdEvent = await newEvent.save();
      }


      res.status(201).json(createdTasks);
    }
  } else {
    res.status(500).json({ message: "Already exists" });
  }
});

export const createTaskExsting = expressAsync(async (req, res) => {
  try {
    const {
      name,
      phone,
      item,
      problem,
      amount,
      invoiceId,
      date,
      userid,
      comment,
      customer,
    } = req.body;
  
    const tasks = new Tasks({
      user: userid,
      name,
      phone,
      item,
      problem,
      amount,
      invoiceId,
      date,
      comment,
      customer: customer,
    });
  
    const createdTasks = await tasks.save();
    if(createdTasks){
      const newEvent = new Events({
        user: userid,
        event:`Created New Ticket, invoiceId=${invoiceId} for customer ${name}`
      });
      const createdEvent = await newEvent.save();
    }
    res.status(201).json(createdTasks);
  } catch (error) {
    res.status(500).json(error);
  }
  
});

export const updateTasksStage = expressAsync(async (req, res) => {
  const { stage } = req.body;

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.stage = stage;

    const updatedTasks = await task.save();
    if (updatedTasks) {
      const newEvent = new Events({
        user: updatedTasks.user,
        event:`Updated ${updatedTasks.item} reparing stage for customer ${updatedTasks.name} to ${stage}`
      });
      const createdEvent = await newEvent.save();
    }
    res.json({
      updatedTasks,
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const updateTasksStatus = expressAsync(async (req, res) => {
  const { status } = req.body;

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.status = status;

    const updatedTasks = await task.save();
    if (updatedTasks) {
      const newEvent = new Events({
        user: updatedTasks.user,
        event:`Updated ${updatedTasks.item} item status for customer ${updatedTasks.name} to ${status}`
      });
      const createdEvent = await newEvent.save();
    }
    res.json({
      updatedTasks,
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const updateTasks = expressAsync(async (req, res) => {
  const { item, problem, amount, date, stage, status, comment } = req.body;

  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.item = item;
    task.problem = problem;
    task.amount = amount;
    task.date = date;
    task.stage = stage;
    task.status = status;
    task.comment = comment;

    const updatedTasks = await task.save();
    if (updatedTasks) {
      const newEvent = new Events({
        user: updatedTasks.user,
        event:`Updated task data for customer ${updatedTasks.name}, phone: ${updatedTasks.phone}`
      });
      const createdEvent = await newEvent.save();
      
    }
    res.json({
      updatedTasks,
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const moveTaskstoBin = expressAsync(async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.bin = true;

    const updatedTasks = await task.save();
    if (updatedTasks) {
      const newEvent = new Events({
        user: task.user._id,
        event:`Moved task to bin for customer ${task.name}, phone: ${task.phone}`
      });
      const createdEvent = await newEvent.save();
      res.json({
        updatedTasks,
      });
    }
   
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const restoreTasks = expressAsync(async (req, res) => {
  const task = await Tasks.findById(req.params.id);

  if (task) {
    task.bin = false;

    const updatedTasks = await task.save();
    res.json({
      updatedTasks,
    });
  } else {
    res.status(404);
    throw new Error("Tasks Not Found");
  }
});

export const deleteTaskById = expressAsync(async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);

    res.json({ message: "Task removed" });
  } catch (error) {
    res.json({ error: error.message });
  }
});
