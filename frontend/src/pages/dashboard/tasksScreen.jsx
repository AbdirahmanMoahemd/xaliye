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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  finishedTasksList,
  listTasks,
  listTasksByRangeDate,
  listTasksByThisWeek,
  listTasksByphone,
  listTasksInBin,
  listTaskstDetails,
  onprecessTasksList,
  unfinishedTasksList,
  updateTasks,
  updateTasksStage,
  updateTasksStatus,
  updateTasksToBin,
} from "@/actions/tasksActions";
import { confirmAlert } from "react-confirm-alert";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import DatePicker from "react-datepicker";
import { listCustomers } from "@/actions/cusomerActions";
import { RadioButton } from "primereact/radiobutton";
import moment from "moment";
import { Paginator } from "primereact/paginator";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FaFilter } from "react-icons/fa";
import { Button } from "primereact/button";

export function TasksScreen() {
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState();
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");
  const [comment, setComment] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const [keyword2, setKeyword2] = useState("");
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState("");
  const [taskId, setTaskId] = useState("");
  const [message, setMessage] = useState(false);
  const [id, setId] = useState(0);
  const [stage, setStage] = useState("");
  const [status, setStatus] = useState("");
  const [statusStage, setStatusStage] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(200);
  const [dateRange, setDateRange] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [onprocessTasks, setOnprocessTasks] = useState(new Date());
  const [finishedTasks, setFinishedTasks] = useState(new Date());
  const [unFinishedTasks, setUnFinishedTasks] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tasksList = useSelector((state) => state.tasksList);
  const { loading, error, tasks, count } = tasksList;

  const tasksListInBin = useSelector((state) => state.tasksListInBin);
  const {
    loading: loadingBin,
    error: errorBin,
    tasks: tasksBinlist,
  } = tasksListInBin;

  const tasksDetails = useSelector((state) => state.tasksDetails);
  const { loading: loadingDetails, error: errorDetails, task } = tasksDetails;

  const tasksUpdate = useSelector((state) => state.tasksUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tasksUpdate;

  const tasksUpdateStage = useSelector((state) => state.tasksUpdateStage);
  const {
    loading: loadingStatusUpdate,
    error: errorStatusUpdate,
    success: successStatusUpdate,
  } = tasksUpdateStage;

  const tasksUpdateStatus = useSelector((state) => state.tasksUpdateStatus);
  const {
    loading: loadingSategUpdate,
    error: errorStageUpdate,
    success: successStageUpdate,
  } = tasksUpdateStatus;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

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

  const customersList = useSelector((state) => state.customersList);
  const {
    loading: loadingCustomers,
    error: errorCustomers,
    customers,
  } = customersList;

  useEffect(() => {
    dispatch({ type: GET_TASKS_RESET });
    if (successBinUpdate) {
      dispatch({ type: BIN_TASKS_RESET });
    }
    if (successCreate) {
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
    }

    if (!userInfo) {
      navigate("/sign-in");
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
    if ((successStageUpdate, successStatusUpdate)) {
      dispatch({ type: UPDATE_TASKS_STAGE_RESET });
    }

    dispatch(listTasksByphone(keyword, pageNumber));
    dispatch(listTasksInBin());
  }, [
    dispatch,
    navigate,
    keyword,
    pageNumber,
    successUpdate,
    successStageUpdate,
    userInfo,
    successDelete,
    successBinUpdate,
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
  }, [dispatch, taskId, task, successUpdate]);

  useEffect(() => {
    window.onbeforeunload = function () {
      return navigate("/login");
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [navigate]);

  const items = [
    {
      label: "Update",
      icon: "pi pi-refresh",
    },
    {
      label: "Delete",
      icon: "pi pi-times",
    },
    {
      label: "React Website",
      icon: "pi pi-external-link",
      command: () => {
        window.location.href = "https://reactjs.org/";
      },
    },
    {
      label: "Upload",
      icon: "pi pi-upload",
      command: () => {
        //router.push('/fileupload');
      },
    },
  ];

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const updateTaskStage = () => {
    if (stage !== "") {
      dispatch(updateTasksStage(id, stage));
      setVisible(false);
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
          onClick: () => dispatch(updateTasksToBin(id)),
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (customer == null) {
      setName(keyword2);
      dispatch(
        createNewTask(name, phone, item, problem, date, amount, userid, comment)
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

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card className="overflow-hidden xl:col-span-3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Tasks({tasks && tasks.length})
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
                    onClick={() => {
                      setOnprocessTasks(true);
                      setFinishedTasks(false);
                      setUnFinishedTasks(false);
                    }}
                    className=" capitalize"
                  >
                    On Process
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOnprocessTasks(false);
                      setFinishedTasks(true);
                      setUnFinishedTasks(false);
                    }}
                    className=" capitalize"
                  >
                    Finished
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOnprocessTasks(false);
                      setFinishedTasks(false);
                      setUnFinishedTasks(true);
                    }}
                    className=" capitalize"
                  >
                    UnFinished
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOnprocessTasks(false);
                      setFinishedTasks(false);
                      setUnFinishedTasks(false);
                    }}
                    className=" capitalize"
                  >
                    clear Filter
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
                    onClick={() => navigate("/dashboard/bin")}
                    className=" capitalize"
                  >
                    Tasks In Recycle Bin
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(listTasksByphone(keyword))}
                    className=" capitalize"
                  >
                    All Tasks
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
                </MenuList>
              </Menu>
            </div>
          </CardHeader>

          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            {loadingDelete && (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            )}
            {errorDelete && <Message severity="error" text={errorDelete} />}
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
                  {tasks
                    .filter((filtered) =>
                      onprocessTasks
                        ? filtered.stage === 0
                        : finishedTasks
                        ? filtered.stage === 1
                        : unFinishedTasks
                        ? filtered.stage === 2
                        : filtered.stage === 0 || 1 || 2
                    )
                    .map((task) => (
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
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {task.customer ? task.customer.phone : task.phone}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
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
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            {task.date && task.date.substring(0, 10)}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
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
      </div>
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
            onClick={() => {
              setDateRange(false);
              dispatch(listTasksByRangeDate("", startDate, endDate));
            }}
          >
            Search
          </Button>
        </div>
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

      {/* create ticket  */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Ticket"
        visible={create}
        onHide={() => {
          setCreate(false);
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
              inputStyle={{ width: "36.5vw" }}
              field="name"
              value={keyword2}
              className="input-box w-full"
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

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              >
                Save
              </button>
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
    </>
  );
}

export default TasksScreen;
