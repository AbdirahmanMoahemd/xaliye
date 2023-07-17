import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BIN_TASKS_RESET,
  GET_TASKS_RESET,
  TASK_CREATE_RESET,
  TASK_DETAILS_RESET,
  UPDATE_TASKS_RESET,
  UPDATE_TASKS_STAGE_RESET,
} from "@/constants/tasksConstants";
import {
  createExisTask,
  createNewTask,
  deleteTasks,
  finishedTasksRecentList,
  getTasksTotal,
  listTasksByRangeDate,
  listTasksByRecent,
  listTasksByThisWeek,
  listTasksInBin,
  listTaskstDetails,
  onprecessTasksRecentList,
  unfinishedTasksRecentList,
  updateTasks,
  updateTasksStage,
  updateTasksStatus,
  updateTasksToBin,
} from "@/actions/tasksActions";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  AiFillBell,
  AiFillDollarCircle,
  AiOutlineWarning,
} from "react-icons/ai";
import StatisticsCard2 from "@/widgets/cards/statistics-card2";
import StatisticsCard3 from "@/widgets/cards/statistics-card3";
import { BiTask } from "react-icons/bi";
import { FcSalesPerformance } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
import { AutoComplete } from "primereact/autocomplete";
import DatePicker from "react-datepicker";
import { getCustomerTotal, listCustomers } from "@/actions/cusomerActions";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { addToOrderItems, createNewSales, listRecentSales, removeFromOrder } from "@/actions/salesActions";
import { ScrollPanel } from "primereact/scrollpanel";
import { Checkbox } from "primereact/checkbox";
import { listStoreItems, updateStoreItemCountInStock } from "@/actions/storeActions";
import { ORDER_REMOVE_ITEM_ALL, SALES_CREATE_RESET } from "@/constants/salesConstants";
import ReactToPrint from "react-to-print";
import { Button } from "primereact/button";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Paginator } from "primereact/paginator";
import { FaFilter } from "react-icons/fa";

export function Home() {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState();
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [create, setCreate] = useState(false);
  const [createSale, setCreateSale] = useState(false);
  const [edit, setEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [visible, setVisible] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [text, setText] = useState("");
  const [message, setMessage] = useState(false);
  const [id, setId] = useState(0);
  const [stage, setStage] = useState("");

  const [itemsale, setItemSale] = useState("");
  const [customersale, setCustomerSale] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(true);
  const [nameToPrint, setNameToPrint] = useState("");
  const [itemnameToPrint, setItemNameToPrint] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSalesPrinting, setIsSalesPrinting] = useState(false);
  const [salesPrint, setSalesPrint] = useState(false);
  const [ordersSalesPrint, setOrdersSalesPrint] = useState(false);
  const [onPrint, setOnPrint] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [status, setStatus] = useState("");
  const [statusStage, setStatusStage] = useState("");
  const [toltalAmount, setToltalAmount] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [myOrderItems, setMyOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const [custname, setCustname] = useState("");
  const [countInStockError, setCountInStockError] = useState(false);

  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(200);

  let componentRef = useRef();
  let componentRef2 = useRef();
  let componentRef3 = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasksList = useSelector((state) => state.tasksList);
  const { loading, error, tasks, count } = tasksList;

  const tasksUpdate = useSelector((state) => state.tasksUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tasksUpdate;

  const tasksUpdateStage = useSelector((state) => state.tasksUpdateStage);
  const {
    loading: loadingSategUpdate,
    error: errorStageUpdate,
    success: successStageUpdate,
  } = tasksUpdateStage;

  const tasksUpdateStatus = useSelector((state) => state.tasksUpdateStatus);
  const {
    loading: loadingStatusUpdate,
    error: errorStatusUpdate,
    success: successStatusUpdate,
  } = tasksUpdateStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const tasksDetails = useSelector((state) => state.tasksDetails);
  const { loading: loadingDetails, error: errorDetails, task } = tasksDetails;

  const tasksBin = useSelector((state) => state.tasksBin);
  const {
    loading: loadingBinUpdate,
    error: errorBinUpdate,
    success: successBinUpdate,
  } = tasksBin;

  const createTask = useSelector((state) => state.createTask);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createTask;

  const totalTasks = useSelector((state) => state.totalTasks);
  const { loading: loadingCounter, error: errorCounter, counter } = totalTasks;

  const totalCustomer = useSelector((state) => state.totalCustomer);
  const {
    loading: loadingCounterCustomer,
    error: errorCounterCustomer,
    counter: counterCustomer,
  } = totalCustomer;

  const customersList = useSelector((state) => state.customersList);
  const {
    loading: loadingCustomers,
    error: errorCustomers,
    customers,
  } = customersList;

  const salesRecentList = useSelector((state) => state.salesRecentList);
  const { loading: loadingSales, error: errorSales, sales } = salesRecentList;

  const storeItemList = useSelector((state) => state.storeItemList);
  const { items } = storeItemList;

  const createSales = useSelector((state) => state.createSales);
  const {
    loading: loadingSaleCreate,
    error: errorSaleCreate,
    success: successSaleCreate,
  } = createSales;

  const order = useSelector(state => state.order)
    const { orderItems } = order

  useEffect(() => {
    dispatch(getTasksTotal());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: GET_TASKS_RESET });
    if (successBinUpdate) {
      dispatch({ type: BIN_TASKS_RESET });
    }
    if (successStageUpdate) {
      dispatch({ type: UPDATE_TASKS_STAGE_RESET });
    }
    if (successCreate) {
      setIsPrinting(true);
      // console.log(true);
      // if (isPrinting) {
      dispatch({ type: TASK_CREATE_RESET });
      setCreate(false);
      setEdit(false);
      setKeyword2("");
      setKeyword("");
      setName("");
      setPhone("");
      setAmount("");
      setItem("");
      setProblem("");
      setComment("");
      setCustomer("");
      setDate(new Date());
      // setNameToPrint("");
      // }
    }

    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_RESET });
      setEdit(false);
      setKeyword2("");
      setKeyword("");
      setName("");
      setPhone("");
      setAmount("");
      setItem("");
      setProblem("");
      setComment("");
      setCustomer("");
      setDate(new Date());
    }

    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_STAGE_RESET });
    }

    dispatch(listTasksByRecent(keyword, pageNumber));
    dispatch(listTasksInBin());
  }, [
    dispatch,
    navigate,
    keyword,
    pageNumber,
    successUpdate,
    userInfo,
    successDelete,
    successBinUpdate,
    successStageUpdate,
    successCreate,
  ]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UPDATE_TASKS_RESET });
      dispatch({ type: TASK_DETAILS_RESET });
    } else {
      if (taskId != "") {
        if (!task.name || task._id !== taskId) {
          dispatch(listTaskstDetails(taskId));
        } else {
          {
            setName(task.customer.name);
            setPhone(task.customer.phone);
            setItem(task.item);
            setProblem(task.problem);
            setDate(moment(task.date).toDate());
            setAmount(task.amount);
            setStage(task.stage);
            setComment(task.comment);
          }
        }
      }
    }
  }, [dispatch, taskId, task, successUpdate]);

  useEffect(() => {
    if (successSaleCreate) {
      setIsSalesPrinting(true);
      dispatch({ type: SALES_CREATE_RESET });
      setCreateSale(false);
      setItemSale("");
      setCustomerSale("");
      setQuantity("");
      setPrice("");
      setIsPaid(false);
      setDate(new Date());
      setCountInStockError(false)
      countInStockHandler()
      dispatch({ type: ORDER_REMOVE_ITEM_ALL });

    }
    dispatch(listRecentSales());
  }, [dispatch, successSaleCreate]);

  useEffect(() => {
    dispatch(getCustomerTotal());
  }, [dispatch]);

  const updateTaskStage = () => {
    if (stage !== "") {
      dispatch(updateTasksStage(id, stage));
      setVisible(false);
    }
  };

  const countInStockHandler = () => {
    for (let index = 0; index < orderItems.length; index++) {
      const element = orderItems[index];

      dispatch(updateStoreItemCountInStock(element.item, element.quantity));
    }
  };

  const updateTaskStatus = () => {
    if (statusStage !== "") {
      dispatch(updateTasksStatus(id, statusStage));
      setStatus(false);
    }
  };

  const binTask = (id) => {
    confirmAlert({
      title: "Move To Bin",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => {
            console.log(id);
            dispatch(updateTasksToBin(id));
          },
        },
      ],
    });
  };

  const deleteTask = (id) => {
    confirmAlert({
      title: "Permanently Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteTasks(id)),
        },
      ],
    });
  };

  let userid = userInfo ? userInfo._id : "";
  let invoiceId = Math.floor(10000 + Math.random() * 90000);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(invoiceId);

    if (customer == null) {
      setName(keyword2);
      dispatch(
        createNewTask(
          name,
          phone,
          item,
          problem,
          date,
          amount,
          invoiceId,
          userid,
          comment
        )
      );
    } else {
      dispatch(
        createExisTask(
          name,
          phone,
          item,
          problem,
          date,
          amount,
          invoiceId,
          userid,
          comment,
          customer
        )
      );
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateTasks(taskId, item, problem, date, amount, stage, comment));
    setTaskId("");
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const submitSaleHandler = (e) => {
    e.preventDefault();

    if (orderItems != null) {
      dispatch(
        createNewSales(
          orderItems,
          customer,
          phone,
          date,
          totalPrice,
          invoiceId,
          isPaid
        )
      );
    }

   
  };
  let toltal;
  const getTotal = (e) => {
    e.preventDefault();
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    let totalIncome = addDecimals(
      (toltal = tasks.reduce((acc, item) => acc + item.amount, 0))
    );
    setToltalAmount(toltal);
    setShowTotal(true);
  };

  let totalPrice = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const itemqty = orderItems.reduce((acc, item) => acc + item.quantity, 0)

  

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        <StatisticsCard
          title={"Total Tasks"}
          icon={<BiTask className="h-6 w-6 text-white" />}
          value={counter == null ? "0" : counter.totalTasks}
          value2={counter == null ? "0" : counter.totalOnProcess}
          value3={counter == null ? "0" : counter.totalFinished}
          value4={counter == null ? "0" : counter.totalDelivered}
          value5={counter == null ? "0" : counter.totalUnfinished}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className={
                  counter == null
                    ? "0"
                    : counter.todayPerc > counter.yesterdayPerc
                    ? "text-green-500"
                    : counter.todayPerc < counter.yesterdayPerc
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {counter == null
                  ? "0"
                  : counter.todayPerc > counter.yesterdayPerc
                  ? "+"
                  : counter.todayPerc < counter.yesterdayPerc
                  ? "-"
                  : ""}
                {counter == null
                  ? "0"
                  : counter.todayPerc > counter.yesterdayPerc
                  ? counter.todayPerc
                  : counter.todayPerc < counter.yesterdayPerc
                  ? counter.yesterdayPerc
                  : 0}
                %
              </strong>
              &nbsp;
              {counter == null
                ? "0"
                : counter.todayPerc > counter.yesterdayPerc
                ? "more than yesterday"
                : counter.todayPerc < counter.yesterdayPerc
                ? "less than yesterday"
                : "there are same"}
            </Typography>
          }
        />
        <StatisticsCard2
          color="pink"
          title={"Total Sales"}
          icon={<FcSalesPerformance className="h-6 w-6" />}
          value={counterCustomer == null ? "0" : counterCustomer.totalSales}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className={
                  counterCustomer == null
                    ? ""
                    : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                    ? "text-green-500"
                    : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                  ? "+"
                  : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                  ? "-"
                  : ""}
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                  ? counterCustomer.todayPerc
                  : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                  ? counterCustomer.yesterdayPerc
                  : 0}
                %
              </strong>
              &nbsp;
              {counterCustomer == null
                ? ""
                : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                ? "more than yesterday"
                : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                ? "less than yesterday"
                : "there are same"}
            </Typography>
          }
        />

        <StatisticsCard2
          color="green"
          title={"Total Customers"}
          icon={<FaUsers className="h-6 w-6 text-white" />}
          value={counterCustomer == null ? "0" : counterCustomer.totalCustomer}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className={
                  counterCustomer == null
                    ? ""
                    : counterCustomer.todayCusPerc >
                      counterCustomer.yesterdayCusPerc
                    ? "text-green-500"
                    : counterCustomer.todayCusPerc <
                      counterCustomer.yesterdayCusPerc
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayCusPerc >
                    counterCustomer.yesterdayCusPerc
                  ? "+"
                  : counterCustomer.todayCusPerc <
                    counterCustomer.yesterdayCusPerc
                  ? "-"
                  : ""}
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayCusPerc >
                    counterCustomer.yesterdayCusPerc
                  ? counterCustomer.todayCusPerc
                  : counterCustomer.todayCusPerc <
                    counterCustomer.yesterdayCusPerc
                  ? counterCustomer.yesterdayCusPerc
                  : 0}
                %
              </strong>
              &nbsp;
              {counterCustomer == null
                ? ""
                : counterCustomer.todayCusPerc >
                  counterCustomer.yesterdayCusPerc
                ? "more than yesterday"
                : counterCustomer.todayCusPerc <
                  counterCustomer.yesterdayCusPerc
                ? "less than yesterday"
                : "there are same"}
            </Typography>
          }
        />

        <StatisticsCard3
          color="orange"
          title={"Total Blance"}
          icon={<AiFillDollarCircle className="h-6 w-6 text-white" />}
          value={"$233"}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className={" text-green-500"}>{"+55%"}</strong>
              &nbsp;{"than yesterday"}
            </Typography>
          }
        />
      </div>
      <div></div>

      <div className="mb-4 grid grid-cols-1 gap-2 xl:grid-cols-12">
        <Card className="overflow-hidden xl:col-span-8">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Recent Tasks ({tasks && tasks.length})
              </Typography>
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input
                label="Search tasks by phone"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <FaFilter title="Filter" />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      dispatch(onprecessTasksRecentList(keyword, pageNumber))
                    }
                    className=" capitalize"
                  >
                    On Process
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      dispatch(finishedTasksRecentList(keyword, pageNumber))
                    }
                    className=" capitalize"
                  >
                    Finished
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      dispatch(unfinishedTasksRecentList(keyword, pageNumber))
                    }
                    className=" capitalize"
                  >
                    UnFinished
                  </MenuItem>
                  {/* <MenuItem
                  onClick={()=> {}}
                  className=" capitalize"
                >
                  Delivered
                </MenuItem> */}
                </MenuList>
              </Menu>
              <Menu placement="left-start">
                <MenuHandler>
                  <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                      strokeWidth={3}
                      fill="currenColor"
                      className="h-6 w-6"
                    />
                  </IconButton>
                </MenuHandler>
                <MenuList>
                  <MenuItem
                    onClick={() => setCreate(true)}
                    className=" capitalize"
                  >
                    Add New Ticket
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(listTasksByThisWeek(keyword))}
                    className=" capitalize"
                  >
                    Tasks of this Week
                  </MenuItem>
                  <MenuItem
                    onClick={() => setDateRange(true)}
                    className=" capitalize"
                  >
                    Tasks By Date Range
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(listTasksByRecent(keyword))}
                    className=" capitalize"
                  >
                    Recent Tasks
                  </MenuItem>
                  <MenuItem className=" capitalize">
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="download-table-xls-button"
                      table="table-to-xls"
                      filename="tasks"
                      sheet="tablexls"
                      buttonText="Download as XLS"
                    />
                  </MenuItem>
                  <MenuItem onClick={getTotal}>Get Total Amount</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </CardHeader>

          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table
              id="table-to-xls"
              className="w-full min-w-[640px] table-auto"
            >
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                    "ID",
                    "NAME",
                    "Phone",
                    "Item",
                    "Problem Type",
                    "Date",
                    "Amount",
                    "Repairing Stage",
                    "Item Status",
                    "",
                    "",
                    "",
                    "",
                  ].map((el) => (
                    <th className="border-b border-blue-gray-50 py-3 px-3 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-600"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {loading ? (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              ) : error ? (
                <Message severity="error" text={error} />
              ) : (
                <tbody className="overflow-y-auto">
                  {tasks.map((task) => (
                    <tr id={task._id}>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {task.customer ? (
                            `${task.customer.custID}`
                          ) : (
                            <p className=" text-red-700">Not Found</p>
                          )}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {task.customer ? task.customer.name : task.name}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium  capitalize text-blue-gray-400"
                        >
                          {task.customer ? task.customer.phone : task.phone}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium  capitalize text-blue-gray-400"
                        >
                          {task.item}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {task.problem}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium  capitalize text-blue-gray-400"
                        >
                          {task.date && task.date.substring(0, 10)}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium  capitalize text-blue-gray-400"
                        >
                          ${task.amount}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {task.stage === 0 ? (
                            <p className="cursor-pointer bg-blue-600 px-1 text-center text-white">
                              On Process
                            </p>
                          ) : task.stage === 1 ? (
                            <p className="text-whit cursor-pointer bg-yellow-300 px-1 text-center">
                              Finished
                            </p>
                          ) : (
                            <p className="cursor-pointer bg-red-600 px-1  text-center text-white">
                              Unfinished
                            </p>
                          )}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {task.status === 0 ? (
                            <p className="cursor-pointer bg-blue-600 px-1 text-center text-white">
                              In Store
                            </p>
                          ) : (
                            <p className="cursor-pointer bg-green-500 px-1 text-center text-white">
                              Delivered
                            </p>
                          )}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          <icon
                            className="pi pi-comment cursor-pointer text-blue-700"
                            onClick={() => {
                              setMessage(true);
                              setText(task.comment);
                            }}
                          />
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                        <Menu placement="left-start">
                          <MenuHandler>
                            <IconButton
                              size="sm"
                              variant="text"
                              color="blue-gray"
                            >
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <MenuItem
                              onClick={() => {
                                setVisible(true);
                                setStage(task.stage);
                                setId(task._id);
                              }}
                            >
                              Change Repairing Stage
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setStatus(true);
                                setStatusStage(task.status);
                                setId(task._id);
                              }}
                            >
                              Change Item Status
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setTaskId("");
                                setTaskId(task._id);
                                setEdit(true);
                              }}
                            >
                              Update
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setNameToPrint(task.name);
                                setName(task.name);
                                setPhone(task.phone);
                                setItem(task.item);
                                setAmount(task.amount);
                                setComment(task.comment);
                                setDate(moment(task.date).toDate());
                                setProblem(task.problem);
                                setOnPrint(true);
                              }}
                            >
                              Print
                            </MenuItem>
                            <MenuItem onClick={() => binTask(task._id)}>
                              Move To Bin
                            </MenuItem>
                            <MenuItem onClick={() => deleteTask(task._id)}>
                              Delete Permanently
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={count}
              onPageChange={onPageChange}
            />
          </CardBody>
        </Card>
        <Card className="xl:col-span-4">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Sales Overview
            </Typography>

            <Menu placement="left-start">
              <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                  <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                  />
                </IconButton>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={() => setCreateSale(true)}>
                  New Sale
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="table-wrp block max-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
          <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                    "Customer",
                    "Order Items",
                    "",
                  ].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-4 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[12px] font-medium uppercase text-blue-gray-600"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              {loadingSales ? (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              ) : errorSales ? (
                <Message severity="error" text={errorSales} />
              ) : (
                
                 <tbody className="overflow-y-auto">
                  {sales.map((sale) => 
                     <tr key={sale._id}>
                     <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                       <Typography
                         variant="small"
                         className="text-[12px] font-medium capitalize text-blue-gray-400"
                       >
                         Name:{sale.customer}
                         <p>Phone:{sale.phone}</p>
                       </Typography>
                     </td>
                     <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                       <Typography
                         variant="small"
                         className="text-[11px] font-medium capitalize text-blue-gray-400"
                       >
                          <Button
                              className="z-10 h-8"
                              label="Show"
                              icon=""
                              onClick={() => {
                                setMyOrderItems(sale.orderItems);
                                setCustname(sale.customer);
                                setShow(true);
                              }}
                            />
                       </Typography>
                     </td >
                     <td  className="border-b border-blue-gray-50 text-center">
                      <i onClick={()=> {
                        setOrdersSalesPrint(sale.orderItems)
                        setSalesPrint(sale)
                        setIsSalesPrinting(true)
                      }}><ReactToPrint
                      color=" blue"
                      trigger={() =>  <i className="pi pi-print cursor-pointer"/>}
                      content={() => componentRef2}
                    /></i>
                     </td>
                     </tr>
                  
                  )}
                 </tbody>
              )}
              </table>
          </CardBody>
          <ScrollPanel className="max-h-[34rem]">
           
          </ScrollPanel>
        </Card>
      </div>


      <Dialog
        blockScroll="false"
        aria-expanded={show ? true : false}
        header={`Order Items For ${custname}`}
        visible={show}
        onHide={() => {
          setShow(false);
        }}
        style={{ width: "60vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <Card>
          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {["Item NAME", "Quantity", "Price", "Total"].map((el) => (
                    <th className="border-b border-blue-gray-50 py-3 px-4 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-600"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="overflow-y-auto">
                {myOrderItems.map((order) => (
                  <tr id={order._id}>
                    <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {order.itemName}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {order.quantity}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {order.price}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium capitalize text-blue-gray-400"
                      >
                        ${order.price * order.quantity}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Dialog>




      <Dialog
        header="Comment"
        visible={message}
        onHide={() => setMessage(false)}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {text}
      </Dialog>

      <Dialog
        header="Quick Edit For Repairing Status"
        visible={visible}
        onHide={() => setVisible(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <>
          {loadingSategUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorStageUpdate && (
            <Message severity="error" text={errorStageUpdate} />
          )}

          <label className="mb-2 block text-gray-600">Repairing Stage</label>
          <div className="flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient1"
                name="stage"
                value={0}
                onChange={(e) => setStage(e.value)}
                checked={stage === 0}
              />
              <label htmlFor="ingredient1" className="ml-2">
                On Process
              </label>
            </div>
            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient2"
                name="stage"
                value={1}
                onChange={(e) => setStage(e.value)}
                checked={stage === 1}
              />
              <label htmlFor="ingredient2" className="ml-2">
                Finished
              </label>
            </div>
            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient3"
                name="stage"
                value={2}
                onChange={(e) => setStage(e.value)}
                checked={stage === 2}
              />
              <label htmlFor="ingredient4" className="ml-2">
                Unfinished
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => updateTaskStage(stage)}
              className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium capitalize text-white transition hover:bg-transparent hover:text-primary"
            >
              Update
            </button>
          </div>
        </>
      </Dialog>

      <Dialog
        header="Quick Edit For Item Status"
        visible={status}
        onHide={() => setStatus(false)}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <>
          {loadingStatusUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorStatusUpdate && (
            <Message severity="error" text={errorStatusUpdate} />
          )}

          <label className="mb-2 block text-gray-600">Item Stage</label>
          <div className="flex flex-wrap gap-3">
            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient1"
                name="stage"
                value={0}
                onChange={(e) => setStatusStage(e.value)}
                checked={statusStage === 0}
              />
              <label htmlFor="ingredient1" className="ml-2">
                In Store
              </label>
            </div>

            <div className="align-items-center flex">
              <RadioButton
                inputId="ingredient3"
                name="stage"
                value={1}
                onChange={(e) => setStatusStage(e.value)}
                checked={statusStage === 1}
              />
              <label htmlFor="ingredient3" className="ml-2">
                Delivered
              </label>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => updateTaskStatus()}
              className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium capitalize text-white transition hover:bg-transparent hover:text-primary"
            >
              Update
            </button>
          </div>
        </>
      </Dialog>

      <Dialog
        blockScroll="false"
        aria-expanded={showTotal ? true : false}
        header="Tasks Total Amount"
        visible={showTotal}
        onHide={() => {
          setShowTotal(false);
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <div className="flex justify-center">
          <p>Total Amount: ${toltalAmount}</p>
        </div>
      </Dialog>

      {/* date rage  */}
      <Dialog
        blockScroll="false"
        aria-expanded={dateRange ? true : false}
        header="Select Date"
        visible={dateRange}
        onHide={() => {
          setDateRange(false);
          setStartDate(new Date());
          setEndDate(new Date());
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <p>Start Date</p>
        <div className=" rounded border border-gray-400 py-2 px-2">
          <DatePicker
            selected={startDate}
            onChange={(dt) => setStartDate(dt)}
          />
        </div>
        <br />
        <p>End Date</p>
        <div className=" rounded border border-gray-400 py-2 px-2">
          <DatePicker selected={endDate} onChange={(dt) => setEndDate(dt)} />
        </div>
        <br />
        <div className="flex justify-center">
          <Button
            onClick={() =>
              dispatch(listTasksByRangeDate("", startDate, endDate))
            }
          >
            Search
          </Button>
        </div>
      </Dialog>

      {/* create ticket  */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Ticket"
        visible={create}
        onHide={() => {
          dispatch({ type: TASK_CREATE_RESET });
          setCreate(false);
          setEdit(false);
          setKeyword2("");
          setKeyword("");
          setName("");
          setPhone("");
          setAmount("");
          setItem("");
          setProblem("");
          setComment("");
          setCustomer("");
          setDate(new Date());
          setNameToPrint("");
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler}>
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
          <div className="mx-auto space-y-4 p-4">
            <AutoComplete
              type="text"
              field="name"
              value={keyword2}
              inputClassName="w-full"
              className=" w-full"
              required
              placeholder="Customer name"
              suggestions={customers}
              completeMethod={() => dispatch(listCustomers(keyword2))}
              onChange={(e) => {
                setKeyword2(e.target.value);
                setCustomer(keyword2._id);
                customer == null
                  ? setName(e.target.value)
                  : setName(keyword2.name);
                setNameToPrint(typeof name === "string" ? name : name.name);

                e.target.value == "" ? setPhone("") : setPhone(keyword2.phone);
              }}
            />

            <Input
              type="number"
              value={phone}
              label="Phone Number"
              size="lg"
              required
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              type="text"
              value={item}
              label="Item name"
              size="lg"
              required
              onChange={(e) => setItem(e.target.value)}
            />

            <Input
              type="text"
              value={problem}
              label="Problem Type"
              size="lg"
              required
              onChange={(e) => setProblem(e.target.value)}
            />
            <div className=" rounded border border-gray-400 py-2 px-2">
              <DatePicker selected={date} onChange={(dt) => setDate(dt)} />
            </div>

            <Input
              type="number"
              value={amount}
              label="Amount"
              size="lg"
              required
              onChange={(e) => setAmount(e.target.value)}
            />

            <Textarea
              label="Message"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="mt-4 flex  justify-around">
              <button
                type="submit"
                className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              >
                Save
              </button>

              {/* button to trigger printing of target component */}

              <ReactToPrint
                trigger={() =>
                  isPrinting ? (
                    <Button>Save & Print</Button>
                  ) : (
                    <Button>Save & Print</Button>
                  )
                }
                content={() => (isPrinting ? componentRef : "")}
                onBeforeGetContent={() => submitHandler}
              />
            </div>
          </div>
        </form>
      </Dialog>

      {/* update ticket  */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Update Ticket"
        visible={edit}
        onHide={() => {
          setCreate(false);
          setEdit(false);
          setKeyword2("");
          setKeyword("");
          setName("");
          setPhone("");
          setAmount("");
          setItem("");
          setProblem("");
          setComment("");
          setCustomer("");
          setDate(new Date());
          setTaskId("");
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateHandler}>
          {loadingUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorUpdate && <Message severity="error" text={errorUpdate} />}
          {loadingDetails ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errorDetails ? (
            <Message severity="error" text={errorDetails} />
          ) : (
            <div className="mx-auto space-y-4 p-4">
              <Input
                type="text"
                disabled
                value={name}
                label="Customer name"
                size="lg"
                required
              />
              <Input
                type="number"
                disabled
                value={phone}
                label="Phone Number"
                size="lg"
                required
              />

              <Input
                type="text"
                label="Item name"
                value={item}
                size="lg"
                required
                onChange={(e) => setItem(e.target.value)}
              />

              <Input
                type="text"
                label="Problem Type"
                value={problem}
                size="lg"
                required
                onChange={(e) => setProblem(e.target.value)}
              />
              <div className=" rounded border border-gray-400 py-2 px-2">
                <DatePicker selected={date} onChange={(dt) => setDate(dt)} />
              </div>

              <Input
                type="number"
                label="Amount"
                value={amount}
                size="lg"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
              <di className="flex flex-wrap gap-3">
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient1"
                    name="stage"
                    value={0}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 0}
                  />
                  <label htmlFor="ingredient1" className="ml-2">
                    On Process
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient2"
                    name="stage"
                    value={1}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 1}
                  />
                  <label htmlFor="ingredient2" className="ml-2">
                    Finished
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient3"
                    name="stage"
                    value={2}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 2}
                  />
                  <label htmlFor="ingredient3" className="ml-2">
                    Delivired
                  </label>
                </div>
                <div className="align-items-center flex">
                  <RadioButton
                    inputId="ingredient3"
                    name="stage"
                    value={3}
                    onChange={(e) => setStage(e.value)}
                    checked={stage === 3}
                  />
                  <label htmlFor="ingredient4" className="ml-2">
                    Unfinished
                  </label>
                </div>
              </di>

              <Textarea
                label="Message"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </form>
      </Dialog>

      {/* update ticket  */}
      <Dialog
        blockScroll="false"
        aria-expanded={onPrint ? true : false}
        header="Selected Data"
        visible={onPrint}
        onHide={() => {
          setOnPrint(false);
          setCreate(false);
          setEdit(false);
          setKeyword2("");
          setKeyword("");
          setName("");
          setPhone("");
          setAmount("");
          setItem("");
          setProblem("");
          setComment("");
          setCustomer("");
          setDate(new Date());
          setTaskId("");
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* <form> */}
        {/* {loadingUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorUpdate && <Message severity="error" text={errorUpdate} />}
          {loadingDetails ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errorDetails ? (
            <Message severity="error" text={errorDetails} />
          ) : ( */}
        <div className="mx-auto space-y-4 p-4">
          <Input
            type="text"
            disabled
            value={name}
            label="Customer name"
            size="lg"
            required
          />
          <Input
            type="number"
            disabled
            value={phone}
            label="Phone Number"
            size="lg"
            required
          />

          <Input
            type="text"
            label="Item name"
            value={item}
            size="lg"
            required
            disabled
          />

          <Input
            type="text"
            label="Problem Type"
            value={problem}
            size="lg"
            required
            disabled
          />
          <div className=" rounded border border-gray-400 py-2 px-2">
            <DatePicker disabled selected={date} />
          </div>

          <Input
            type="number"
            label="Amount"
            value={amount}
            size="lg"
            required
            disabled
          />

          <Textarea label="Message" disabled value={comment} />

          <div className="mt-4 flex justify-center">
            <ReactToPrint
              color=" blue"
              trigger={() => <Button>Print</Button>}
              content={() => componentRef2}
            />
          </div>
        </div>
        {/* )} */}
        {/* </form> */}
      </Dialog>

       {/* Create Sale */}
       <Dialog
        blockScroll="false"
        aria-expanded={createSale ? true : false}
        header="New Sale"
        visible={createSale}
        onHide={() => {
          dispatch({ type: SALES_CREATE_RESET });
          setCreateSale(false);
          setItemSale("");
          setCustomer("");
          setPhone("");
          setQuantity("");
          setPrice("");
          setIsPaid(true);
          setDate(new Date());
          setCountInStockError(false)
          dispatch({ type: ORDER_REMOVE_ITEM_ALL });
          
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* <form onSubmit={submitHandler}> */}
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSaleCreate && <Message severity="error" text={errorSaleCreate} />}
          {countInStockError && <Message severity="error" text={'This Item Not Available in the store'} />}
          <div className="mx-auto space-y-4 p-4">
            
              <Input
                type="text"
                value={customer}
                label="Customer Name"
                inputClassName="w-full"
                className="w-full"
                size="lg"
                required
                onChange={(e) => setCustomer(e.target.value)}
              />
              <div className="w-full gap-2 space-y-4 xl:flex xl:space-y-0 ">
              <Input
                type="number"
                value={phone}
                inputClassName="w-full"
                className="w-full"
                label="Phone Number"
                size="lg"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            
            <div className=" rounded border border-gray-400 py-2 px-2">
              <DatePicker selected={date} onChange={(dt) => setDate(dt)} />
            </div>
            </div>

            <div className="w-full gap-2 space-y-4 xl:flex  xl:space-y-0">
              <AutoComplete
                placeholder="item name"
                inputClassName="w-full xl:h-11"
                className="w-full"
                field="name"
                size="lg"
                value={itemsale}
                suggestions={items}
                completeMethod={() => dispatch(listStoreItems())}
                onChange={(e) => setItemSale(e.value)}
                required
              />

              <Input
                type="number"
                inputClassName="w-full"
                value={quantity}
                label="Quantity"
                size="lg"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
              <Input
                type="number"
                value={price}
                label="Price"
                size="lg"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <div></div>
              <Button label="Add" onClick={()=>{
                if (itemsale != "" && quantity != "" && price != "") {
                  if (itemsale.countInStock > 0) {
                    setCountInStockError(false)
                  dispatch(addToOrderItems(itemsale._id, quantity, price))
                  setItemSale("")
                  setQuantity("")
                  setPrice("")
                }else{
                  setCountInStockError(true)
                }
              }
                
                
              }}/>
            </div>

            <table className="w-full space-y-4  xl:space-y-0">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  <th className="w-12 border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      No
                    </Typography>
                  </th>
                  <th className="border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      Item
                    </Typography>
                  </th>
                  <th className="w-24 border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      Price
                    </Typography>
                  </th>
                  <th className="w-24 border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      Qty
                    </Typography>
                  </th>
                  <th className="w-24 border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      Total
                    </Typography>
                  </th>
                  <th className="w-24 border border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-600"
                    >
                      
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
              {orderItems.map((odr, index) => (
                <tr>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      {index}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      {odr.itemName}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      ${odr.price}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      {odr.quantity}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      ${odr.price * odr.quantity}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-2 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium capitalize text-blue-gray-400"
                    >
                      <i className="pi pi-delete-left cursor-pointer" onClick={()=> dispatch(removeFromOrder(odr.item))}/>
                    </Typography>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
            <p className="text-left uppercase">Sub Total: ${totalPrice}</p>

            <div>
              IsPaid
              <span className="px-2"></span>
              <Checkbox
                onChange={(e) => setIsPaid(e.checked)}
                checked={isPaid}
                defaultValue={isPaid}
              ></Checkbox>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                onClick={submitSaleHandler}
                className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              >
                Save
              </button>
            </div>
          </div>
        {/* </form> */}
      </Dialog>
      {/* component to be printed */}
      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={(el) => (componentRef = el)}
          invoiceId={invoiceId}
          name={nameToPrint}
          phone={phone}
          date={date}
          amount={amount}
          item={item}
          problem={problem}
        />
      </div>

      {/* <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={(el) => (componentRef2 = el)}
          invoiceId={invoiceId}
          name={nameToPrint}
          phone={phone}
          date={date}
          amount={amount}
          item={item}
          problem={problem}
        />
      </div> */}

      <div style={{ display: "none" }}>
        <ComponentToPrint2
          ref={(el) => (componentRef2 = el)}
          sales={salesPrint}
          orderItems={ordersSalesPrint}
          
        />
      </div>
    </div>
  );
}

export default Home;

import invoice from "@/data/images/invoicebg.png";
import { IoMdCall } from "react-icons/io";

class ComponentToPrint extends React.Component {
  render() {
    const { invoiceId } = this.props;
    const { name } = this.props;
    const { phone } = this.props;
    const { date } = this.props;
    const { amount } = this.props;
    const { item } = this.props;
    const { problem } = this.props;

    return (
      <>
        <div className="">
          <div className="mx-12 flex items-center">
            <div className=" w-24">
              <img src={invoice} />
            </div>
            <div className="flex-1">
              <div>
                <p className="text-2xl  font-semibold uppercase">
                  XALIYE COMPUTER & MOBILE REPAIR
                </p>
              </div>
              <div className="flex justify-between">
                <p className="rounded border border-blue-500 bg-blue-500 px-1 text-center font-normal uppercase  text-white">
                  HEl xal fudud waqti gaaban
                </p>
                <div className="flex items-center">
                  <span className=" rounded-full border border-blue-500">
                    <IoMdCall
                      color="#2196F3"
                      className="p-[0.1rem] "
                      size={20}
                    />
                  </span>

                  <span className="p-1 text-blue-600" color="blue"></span>
                  <p>0613951588</p>
                  <p>/ 0614128728</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-14 border border-blue-500 bg-blue-500"></div>

          <div className=" mx-14 mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-2xl font-normal">Invoice to:</p>
              <p className="text-xl">{name}</p>
              <p className="text-xl">{phone}</p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">#{invoiceId}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">${amount}</span>
              </div>
              <div className=" flex items-center">
                <p p className="text-2xl font-normal">
                  Date:
                </p>
                <p className="pl-2 text-xl">
                  {moment(date).toString().substring(0, 15)}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-14 mt-4">
            <table className="w-full table-auto">
              <thead className=" bg-blue-500 text-white">
                <tr className="text-xl font-normal">
                  <td className="w-16 pl-2">No</td>
                  <td>Description</td>
                  <td>Problem</td>
                </tr>
              </thead>
              <tbody>
                <tr className=" border border-blue-500 ">
                  <td className="border border-blue-500 py-1 pl-1 text-center">
                    1
                  </td>
                  <td className="border border-blue-500 py-1 pl-1">{item}</td>
                  <td className="border border-blue-500 py-1 pl-1">
                    {problem}
                  </td>
                </tr>
                <tr className="border border-blue-500">
                  <td className="border border-blue-500 text-center">2</td>
                  <td className="border border-blue-500"></td>
                  <td className="border border-blue-500"></td>
                </tr>
                <tr className="border border-blue-500">
                  <td className="border  border-blue-500 text-center">3</td>
                  <td className="border border-blue-500"></td>
                  <td className="border border-blue-500"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mx-14 mt-6 grid grid-cols-2 gap-x-80 ">
            <div className=" flex justify-center">
              <p className=" col-span-2">Saxiixa Customer-ka</p>
            </div>
            <div className="flex justify-center">
              <p className=" ">Saxiixa Maamulaha</p>
            </div>
          </div>
          <div className="mx-14 mt-6 flex justify-between">
            <div className="w-[35%] border border-blue-500"></div>
            <div className="w-[35%] border border-blue-500"></div>
          </div>
          <br />

          <div className="mx-14 mt-3 flex">
            <i>
              <AiOutlineWarning className=" text-5xl text-blue-500" />
            </i>
            <p className=" pl-2 text-xl capitalize ">
              Digniin hadii aad alaabtaada aad ku qaadan wadid mudo 4 cisho ah
              shirkadda masuul kama ahan, silamid ah shaqo laqabtay lacagteeda
              labixiyay dib looma celin karo
            </p>
          </div>
          <br />

          <p className="mx-14 border border-blue-500 bg-blue-500 text-center uppercase  text-white">
            Waa kuma mahadsantahay latacaa mulkaaga
          </p>
          <br />

          {/* <div className=" mr-14 flex items-center  justify-between">
            <div className=" h-1 flex-1 border border-blue-500 bg-blue-500"></div>
            <div className=" w-10"></div>
            <div className=" flex-non">
              <p className=" text-3xl font-medium">INVOICE</p>
            </div>
          </div> */}

          <div className="mx-12 flex items-center">
            <div className=" w-24">
              <img src={invoice} />
            </div>
            <div className="flex-1">
              <div>
                <p className="text-2xl  font-semibold uppercase">
                  XALIYE COMPUTER & MOBILE REPAIR
                </p>
              </div>
              <div className="flex justify-between">
                <p className="rounded border border-blue-500 bg-blue-500 px-1 text-center font-normal uppercase  text-white">
                  HEl xal fudud waqti gaaban
                </p>
                <div className="flex items-center">
                  <span className=" rounded-full border border-blue-500">
                    <IoMdCall
                      color="#2196F3"
                      className="p-[0.1rem] "
                      size={20}
                    />
                  </span>
                  <span className="p-1 text-blue-600" color="blue"></span>
                  <p>0613951588</p>
                  <p>/ 0614128728</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-14 border border-blue-500 bg-blue-500"></div>

          <div className=" mx-14 mt-5 grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-2xl font-normal">Invoice to:</p>
              <p className="text-xl">{name}</p>
              <p className="text-xl">{phone}</p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">#{invoiceId}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">${amount}</span>
              </div>
              <div className=" flex items-center">
                <p p className="text-2xl font-normal">
                  Date:
                </p>
                <p className="pl-2 text-xl">
                  {moment(date).toString().substring(0, 15)}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-14 mt-4">
            <table className="w-full table-auto">
              <thead className=" bg-blue-500 text-white">
                <tr className="text-xl font-normal">
                  <td className="w-16 pl-2">No</td>
                  <td>Description</td>
                  <td>Problem</td>
                </tr>
              </thead>
              <tbody>
                <tr className=" border border-blue-500 ">
                  <td className="border border-blue-500 py-1 pl-1 text-center">
                    1
                  </td>
                  <td className="border border-blue-500 py-1 pl-1">{item}</td>
                  <td className="border border-blue-500 py-1 pl-1">
                    {problem}
                  </td>
                </tr>
                <tr className="border border-blue-500">
                  <td className="border border-blue-500 text-center">2</td>
                  <td className="border border-blue-500"></td>
                  <td className="border border-blue-500"></td>
                </tr>
                <tr className="border border-blue-500">
                  <td className="border  border-blue-500 text-center">3</td>
                  <td className="border border-blue-500"></td>
                  <td className="border border-blue-500"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mx-14 mt-6 grid grid-cols-2 gap-x-80 ">
            <div className=" flex justify-center">
              <p className=" col-span-2">Saxiixa Customer-ka</p>
            </div>
            <div className="flex justify-center">
              <p className=" ">Saxiixa Maamulaha</p>
            </div>
          </div>
          <div className="mx-14 mt-6 flex justify-between">
            <div className="w-[35%] border border-blue-500"></div>
            <div className="w-[35%] border border-blue-500"></div>
          </div>
          <br />
        </div>
      </>
    );
  }
}

// {/* <MenuItem onClick={() => navigate("/dashboard/bin")}>
//   Tasks In Recycle Bin
// </MenuItem> */}

class ComponentToPrint2 extends React.Component {
  render() {
    const { sales } = this.props;
    const { orderItems } = this.props;
   
   

    return (
      <>
        <div className="">
          <div className="mx-12 flex items-center">
            <div className=" w-24">
              <img src={invoice} />
            </div>
            <div className="flex-1">
              <div>
                <p className="text-2xl  font-semibold uppercase">
                  XALIYE COMPUTER & MOBILE REPAIR
                </p>
              </div>
              <div className="flex justify-between">
                <p className="rounded border border-blue-500 bg-blue-500 px-1 text-center font-normal uppercase  text-white">
                  HEl xal fudud waqti gaaban
                </p>
                <div className="flex items-center">
                  <span className=" rounded-full border border-blue-500">
                    <IoMdCall
                      color="#2196F3"
                      className="p-[0.1rem] "
                      size={20}
                    />
                  </span>

                  <span className="p-1 text-blue-600" color="blue"></span>
                  <p>0613951588</p>
                  <p>/ 0614128728</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-14 border border-blue-500 bg-blue-500"></div>

          <div className=" mx-14 mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-2xl font-normal">Invoice to:</p>
              <p className="text-xl">Name: {sales && sales.customer}</p>
              <p className="text-xl">Phone: {sales && sales.phone}</p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">#{sales && sales.invoiceId}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">${sales && sales.totalPrice}</span>
              </div>
              <div className=" flex items-center">
                <p p className="text-2xl font-normal">
                  Date:
                </p>
                <p className="pl-2 text-xl">
                {sales && moment( sales.date).toString().substring(0, 15)}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-14 mt-4">
            <table className="w-full table-auto ">
              <thead className="border border-blue-500 bg-blue-500 text-white">
                <tr className="text-xl font-normal">
                  <td>No</td>
                  <td>Item</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total Price</td>
                </tr>
              </thead>
              <tbody className="border border-blue-500">
                {orderItems && orderItems.map((item, index)=> 
                <tr className="">
                <td className="py-1 px-2 border border-blue-500">{index+1}</td>
                <td className="py-1 px-2 border border-blue-500">{item.itemName}</td>
                <td className="py-1 px-2 border border-blue-500">
                  {item.quantity}
                </td>
                <td className="py-1 px-2 border border-blue-500">
                ${item.price}
                </td>
                <td className="py-1 px-2 border border-blue-500">
                ${item.price * item.quantity} 
                </td>
              </tr>
                )}
                
              </tbody>
            </table>
          </div>

          <div className="mx-14 mt-6 grid grid-cols-2 gap-x-80 ">
            <div className=" flex justify-center">
              <p className=" col-span-2">Saxiixa Customer-ka</p>
            </div>
            <div className="flex justify-center">
              <p className=" ">Saxiixa Maamulaha</p>
            </div>
          </div>
          <div className="mx-14 mt-6 flex justify-between">
            <div className="w-[35%] border border-blue-500"></div>
            <div className="w-[35%] border border-blue-500"></div>
          </div>
          <br />

          <div className="mx-14 mt-3 flex">
            <i>
              <AiOutlineWarning className=" text-5xl text-blue-500" />
            </i>
            <p className=" pl-2 text-xl capitalize ">
              Digniin hadii aad alaabtaada aad ku qaadan wadid mudo 4 cisho ah
              shirkadda masuul kama ahan, silamid ah shaqo laqabtay lacagteeda
              labixiyay dib looma celin karo
            </p>
          </div>
          <br />

          <p className="mx-14 border border-blue-500 bg-blue-500 text-center uppercase  text-white">
            Waa kuma mahadsantahay latacaa mulkaaga
          </p>
          <br />

          {/* <div className=" mr-14 flex items-center  justify-between">
            <div className=" h-1 flex-1 border border-blue-500 bg-blue-500"></div>
            <div className=" w-10"></div>
            <div className=" flex-non">
              <p className=" text-3xl font-medium">INVOICE</p>
            </div>
          </div> */}

          <div className="mx-12 flex items-center">
            <div className=" w-24">
              <img src={invoice} />
            </div>
            <div className="flex-1">
              <div>
                <p className="text-2xl  font-semibold uppercase">
                  XALIYE COMPUTER & MOBILE REPAIR
                </p>
              </div>
              <div className="flex justify-between">
                <p className="rounded border border-blue-500 bg-blue-500 px-1 text-center font-normal uppercase  text-white">
                  HEl xal fudud waqti gaaban
                </p>
                <div className="flex items-center">
                  <span className=" rounded-full border border-blue-500">
                    <IoMdCall
                      color="#2196F3"
                      className="p-[0.1rem] "
                      size={20}
                    />
                  </span>
                  <span className="p-1 text-blue-600" color="blue"></span>
                  <p>0613951588</p>
                  <p>/ 0614128728</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-14 border border-blue-500 bg-blue-500"></div>

          <div className=" mx-14 mt-4 grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-2xl font-normal">Invoice to:</p>
              <p className="text-xl">Name: {sales && sales.customer}</p>
              <p className="text-xl">Phone: {sales && sales.phone}</p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">#{sales && sales.invoiceId}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">${sales && sales.totalPrice}</span>
              </div>
              <div className=" flex items-center">
                <p p className="text-2xl font-normal">
                  Date:
                </p>
                <p className="pl-2 text-xl">
                {sales && moment( sales.date).toString().substring(0, 15)}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-14 mt-4">
            <table className="w-full table-auto ">
              <thead className="border border-blue-500 bg-blue-500 text-white">
                <tr className="text-xl font-normal">
                  <td>No</td>
                  <td>Item</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total Price</td>
                </tr>
              </thead>
              <tbody className="border border-blue-500">
                {orderItems && orderItems.map((item, index)=> 
                <tr className="">
                <td className="py-1 px-2 border border-blue-500">{index+1}</td>
                <td className="py-1 px-2 border border-blue-500">{item.itemName}</td>
                <td className="py-1 px-2 border border-blue-500">
                  {item.quantity}
                </td>
                <td className="py-1 px-2 border border-blue-500">
                ${item.price}
                </td>
                <td className="py-1 px-2 border border-blue-500">
                ${item.price * item.quantity} 
                </td>
              </tr>
                )}
                
              </tbody>
            </table>
          </div>

          <div className="mx-14 mt-6 grid grid-cols-2 gap-x-80 ">
            <div className=" flex justify-center">
              <p className=" col-span-2">Saxiixa Customer-ka</p>
            </div>
            <div className="flex justify-center">
              <p className=" ">Saxiixa Maamulaha</p>
            </div>
          </div>
          <div className="mx-14 mt-6 flex justify-between">
            <div className="w-[35%] border border-blue-500"></div>
            <div className="w-[35%] border border-blue-500"></div>
          </div>
          <br />
        </div>
      </>
    );
  }
}
