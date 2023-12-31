import React, { useEffect, useState } from "react";
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
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CUSTOMER_CREATE_RESET,
  CUSTOMER_DETAILS_RESET,
  CUSTOMER_LIST_RESET,
  CUSTOMER_UPDATE_RESET,
} from "@/constants/customers2Constants";
import {
  createNewCustomer,
  deleteCustomer,
  listCustomerDetails,
  listCustomers,
  listCustomersByDateRange,
  listMySales,
  updateCustomer,
} from "@/actions/customer2Actions";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-datepicker";
import { Paginator } from "primereact/paginator";



export function Customers2Screen() {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [custID, setCustID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [custname, setCustname] = useState("");
  const [dateRange, setDateRange] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(200);
  const [pageNumber, setPageNumber] = useState(1);
  const [myOrderItems, setMyOrderItems] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createCustomer2 = useSelector((state) => state.createCustomer2);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createCustomer2;

  const customersList2 = useSelector((state) => state.customersList2);
  const { loading, error, customers , customerCount } = customersList2;

  const customerDelete2 = useSelector((state) => state.customerDelete2);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = customerDelete2;

  const customerUpdate2 = useSelector((state) => state.customerUpdate2);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate2;

  const customerDetails2 = useSelector((state) => state.customerDetails2);
  const {
    loading: loadingDetails,
    error: errorDetails,
    customer,
  } = customerDetails2;

  const mySalesList = useSelector((state) => state.mySalesList);
  const {
    loading: loadingMyTasks,
    error: errorMyTasks,
    sales,
  } = mySalesList;



  useEffect(() => {
    dispatch({ type: CUSTOMER_LIST_RESET });

    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successCreate) {
      dispatch({ type: CUSTOMER_CREATE_RESET });
      setCreate(false);
      setName("");
      setPhone("");
    }
    dispatch(listCustomers(keyword2, pageNumber));
  }, [dispatch, userInfo, keyword2,pageNumber, navigate, successCreate,successUpdate, successDelete]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CUSTOMER_UPDATE_RESET });
      dispatch({ type: CUSTOMER_DETAILS_RESET });
      setEdit(false);
      setName();
      setPhone();
    } else {
      if (id != null) {
        if (!customer.name || customer._id !== id) {
          dispatch(listCustomerDetails(id));
        } else {
          setCustID(customer.custID)
          setName(customer.name);
          setPhone(customer.phone);
        }
      }
    }
  }, [dispatch, id, customer, successUpdate]);

  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewCustomer(name, phone));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateCustomer(id,custID, name, phone));
  };

  const getMyTasks = (id) => {
    dispatch(listMySales(id));
    
  };

  const getCustomers = (e) => {
    e.preventDefault();
    dispatch(listCustomers(keyword2));
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page +1)
  };

  const deleteCustomers = (id) => {
    confirmAlert({
      title: "Permanently Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteCustomer(id)),
        },
      ],
    });
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
                Customers
              </Typography>
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input
                label="Search customer by name"
                onChange={(e) => setKeyword2(e.target.value)}
              />
            </div>
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
                <MenuItem onClick={() => setCreate(true)} className=" capitalize">
                  Add New Customer
                </MenuItem>
                <MenuItem onClick={() => setDateRange(true)} className=" capitalize">
                  Search By Date Range
                </MenuItem>
                <MenuItem onClick={() => dispatch(listCustomers(keyword2))} className=" capitalize">
                  Get All Customers
                </MenuItem>
              </MenuList>
            </Menu>
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
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {["ID", "Name", "Phone", "Sales", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
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
                  {customers.map((cust) => (
                    <tr id={cust._id}>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                        {cust.custID}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {cust.name}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {cust.phone}
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
                              setCustname(cust.name)
                              setShow(true);
                              getMyTasks(cust._id)
    

                            }}
                          />
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
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
                                setId("");
                                setId(cust._id); 
                                setEdit(true);
                              }}
                            >
                              Edit
                            </MenuItem>
                            <MenuItem onClick={() => deleteCustomers(cust._id)}>
                              Delete
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
              totalRecords={customerCount}
              onPageChange={onPageChange}
            />
          </CardBody>
        </Card>
      </div>
      

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
              dispatch(listCustomersByDateRange("", startDate, endDate))
            }
          >
            Search
          </Button>
        </div>
      </Dialog>


                              
      {/* create customers */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Customer"
        visible={create}
        onHide={() => {
          setCreate(false)
          setName("");
          setPhone("");
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
            <Input
              type="text"
              value={name}
              label="Customer Number"
              size="lg"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="number"
              value={phone}
              label="Phone Number"
              size="lg"
              required
              onChange={(e) => setPhone(e.target.value)}
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

      {/* edit ticket */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit Customer Info"
        visible={edit}
        onHide={() => {
          setEdit(false);
          setName("");
          setPhone("");
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
                value={custID}
                label="Customer Id"
                size="lg"
                required
                onChange={(e) => setCustID(e.target.value)}
              />
              <Input
                type="text"
                value={name}
                label="Customer Name"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                type="number"
                value={phone}
                label="Phone Number"
                size="lg"
                required
                onChange={(e) => setPhone(e.target.value)}
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




      {/* edit ticket */}
      <Dialog
        blockScroll="false"
        aria-expanded={show ? true : false}
        header={`Sales For ${custname.name}`}
        visible={show}
        onHide={() => {
          setShow(false);
        
        }}
        style={{ width: "60vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <Card>
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
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                     "Customer",
                     "Phone",
                     "Order Items",
                     "Total Price",
                     "Date",
                     "Billing Status",
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
              {loadingMyTasks ? (
                <ProgressSpinner
                  style={{ width: "20px", height: "20px" }}
                  strokeWidth="6"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                />
              ) : errorMyTasks ? (
                <Message severity="error" text={error} />
              ) : (
                <tbody className="overflow-y-auto">
                      {sales.map((item) => (
                        <tr key={item._id}>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                                {item.customer ? item.customer.name : item.customerName}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                                {item.customer ? item.customer.phone : item.phone}
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
                                  setMyOrderItems(item.orderItems);
                                  setCustname(item.customer);
                                  setShow2(true);
                                }}
                              />
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              ${item.totalPrice}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              {item.date && item.date.substring(0, 10)}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              {item.isPaid ? (
                                <i
                                  className="pi pi-check"
                                  style={{ color: "green" }}
                                ></i>
                              ) : (
                                <i
                                  className="pi pi-times"
                                  style={{ color: "red" }}
                                ></i>
                              )}
                            </Typography>
                          </td>
                          <td>
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
                                    setEdit(true);
                                    setId(item._id);
                                  }}
                                >
                                  Change Billing Status
                                </MenuItem>
                                <MenuItem>Move To Bin</MenuItem>
                                <MenuItem
                                  onClick={() => deleteSalesItems(item._id)}
                                >
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
          </CardBody>
        </Card>

      </Dialog>


      <Dialog
        blockScroll="false"
        aria-expanded={show2 ? true : false}
        header={`Order Items For ${custname.name}`}
        visible={show2}
        onHide={() => {
          setShow2(false);
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


    </>
  );
}

export default Customers2Screen;
