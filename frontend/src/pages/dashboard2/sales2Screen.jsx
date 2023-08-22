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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listStoreItems,
  updateStoreItemCountInStock,
} from "@/actions/store2Actions";
import {
  addToOrderItems,
  createExSales,
  createExSalesAndPrint,
  createNewSales,
  createNewSalesAndPrint,
  deleteSalesItem,
  listSalesByDateRange,
  listSalesItems,
  removeFromOrder,
  updateSalesBillingItem,
} from "@/actions/sales2Actions";
import { AiOutlineWarning } from "react-icons/ai";
import moment from "moment";
import {
  ORDER_REMOVE_ITEM_ALL,
  SALES2_CREATE_RESET,
  SALES_CREATE_RESET,
  SALES_UPDATE_BILLING_RESET,
} from "@/constants/sales2Constants";
import { listCustomers } from "@/actions/customer2Actions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-datepicker";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { FaFilter } from "react-icons/fa";

export function Sales2Screen() {
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [id, setId] = useState("");
  const [item, setItem] = useState("");
  const [customerId, setCustomerId] = useState();
  const [customer, setCustomer] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(true);
  const [isPaidBilling, setIsPaidBilling] = useState(false);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(200);
  const [pageNumber, setPageNumber] = useState(1);
  const [myOrderItems, setMyOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const [custname, setCustname] = useState("");
  const [countInStockError, setCountInStockError] = useState(false);
  const [paidSales, setPaidSales] = useState(false);
  const [unPaidSales, setUnPaidSales] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const toastBottomCenter = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let componentRef = useRef();

  const showMessage = (ref, severity) => {
    const label = "All fields are required";

    ref.current.show({
      severity: severity,
      summary: "Error",
      detail: label,
      life: 3000,
    });
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const salesList = useSelector((state) => state.salesList);
  const {
    loading: loadingSales,
    error: errorSales,
    sales,
    salesCount,
  } = salesList;

  const storeItemList = useSelector((state) => state.storeItemList);
  const { loading, error, items } = storeItemList;

  const salesDelete = useSelector((state) => state.salesDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = salesDelete;

  const createSales = useSelector((state) => state.createSales);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createSales;

  const salesUpdateBilling = useSelector((state) => state.salesUpdateBilling);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = salesUpdateBilling;

  const createSalesAndPrint = useSelector((state) => state.createSalesAndPrint);
  const {
    loading: loadingSaleCreateAndPrint,
    error: errorSaleCreateAndPrint,
    success: successSaleCreateAndPrint,
  } = createSalesAndPrint;

  const customersList = useSelector((state) => state.customersList);
  const {
    loading: loadingCustomer,
    error: errorCustomer,
    customers,
  } = customersList;

  const order = useSelector((state) => state.order);
  const { orderItems } = order;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SALES_UPDATE_BILLING_RESET });
      setEdit(false);
      setItem("");
      setCustomer("");
      setQuantity("");
      setPrice("");
      setIsPaid(false);
      setDate(new Date());
    }
    if (!userInfo) {
      navigate("/sign-in");
    } else {
      dispatch(listSalesItems(keyword, pageNumber));
    }
  }, [
    dispatch,
    successCreate,
    successUpdate,
    keyword,
    pageNumber,
    successDelete,
  ]);

  useEffect(() => {
    if (successSaleCreateAndPrint) {
      setCreate(false);
      dispatch({ type: SALES_CREATE_RESET });
      dispatch({ type: SALES_CREATE_RESET2 });
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(listStoreItems());
  }, [dispatch, successCreate]);

  useEffect(() => {}, [id]);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SALES_CREATE_RESET });
      setCreate(false);
      setKeyword2("");
      setItem("");
      setTotalAmount(0)
      setCustomer("");
      setPhone("");
      setQuantity("");
      setPrice("");
      setIsPaid(false);
      setDate(new Date());
      countInStockHandler();
      dispatch({ type: ORDER_REMOVE_ITEM_ALL });
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch, successSaleCreateAndPrint, totalAmount]);
  let invoiceId = Math.floor(10000 + Math.random() * 9000);
  let subTotalPrice = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  
  

  const itemqty = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (customer === "") {
      setName(keyword2);

      if (orderItems != null) {
       
        dispatch(
          createNewSales(
            orderItems,
            name,
            phone,
            date,
            subTotalPrice,
            discount,
            totalPrice - discount,
            invoiceId,
            isPaid
          )
        );
      }
    } else {
      if (orderItems != null) {
        
        
        dispatch(
          createExSales(
            orderItems,
            customer,
            name,
            phone,
            date,
            subTotalPrice,
            discount,
            totalPrice - discount,
            invoiceId,
            isPaid
          )
        );
      }
    }
  };

  const countInStockHandler = () => {
    for (let index = 0; index < orderItems.length; index++) {
      const element = orderItems[index];

      dispatch(updateStoreItemCountInStock(element.item, element.quantity));
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (id != "") {
      dispatch(updateSalesBillingItem(id, isPaidBilling));
    } else {
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const deleteSalesItems = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteSalesItem(id)),
        },
      ],
    });
  };

  const submitSaleHandler2 = () => {
    if (customer === "") {
      setName(keyword2);
      if (orderItems != null) {
        
        dispatch(
          createNewSalesAndPrint(
            orderItems,
            name,
            phone,
            date,
            subTotalPrice,
            discount,
            totalPrice - discount,
            invoiceId,
            isPaid
          )
        );
      }
    } else {
      if (orderItems != null) {
        dispatch(
          createExSalesAndPrint(
            orderItems,
            customer,
            name,
            phone,
            date,
            subTotalPrice,
            discount,
            totalPrice - discount,
            invoiceId,
            isPaid
          )
        );
      }
    }
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
                Sales
              </Typography>
            </div>
            <div>
              <Input
                label="Search by customer name"
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
                      setUnPaidSales(false);
                      setPaidSales(true);
                    }}
                    className=" capitalize"
                  >
                    Paid Sales
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setPaidSales(false);
                      setUnPaidSales(true);
                    }}
                    className=" capitalize"
                  >
                    UnPaid Sales
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setPaidSales(false);
                      setUnPaidSales(false);
                    }}
                    className=" capitalize"
                  >
                    clear filter
                  </MenuItem>
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
                    New Sale
                  </MenuItem>
                  <MenuItem
                    onClick={() => setDateRange(true)}
                    className=" capitalize"
                  >
                    Search By Date Range
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(listSalesItems(keyword))}
                    className=" capitalize"
                  >
                    Get All Sales
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </CardHeader>
          {loadingDelete && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorDelete && <Message severity="error" text={errorDelete} />}

          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                    "Customer",
                    "Phone",
                    "Order Items",
                    "SubTotal",
                    "Discount Amount",
                    "Total Price",
                    "Date",
                    "Billing Status",
                  ].map((el) => (
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
                <>
                  <tbody className="overflow-y-auto">
                    {sales
                      .filter((filtered) =>
                        paidSales
                          ? filtered.isPaid == true
                          : unPaidSales
                          ? filtered.isPaid == false
                          : filtered.isPaid == true || false
                      )
                      .map((item) => (
                        <tr key={item._id}>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              {item.customer
                                ? item.customer.name
                                : item.customerName}
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
                                  setShow(true);
                                }}
                              />
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              ${item.subTotalPrice}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              ${item.discountAmount}
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
                </>
              )}
            </table>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={salesCount}
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
              dispatch(listSalesByDateRange("", startDate, endDate))
            }
          >
            Search
          </Button>
        </div>
      </Dialog>

      {/* Create Sale */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="New Sale"
        visible={create}
        onHide={() => {
          dispatch({ type: SALES_CREATE_RESET });
          dispatch({ type: SALES2_CREATE_RESET });
          setCreate(false);
          setItem("");
          setCustomer("");
          setTotalAmount(0)
          setPhone("");
          setQuantity("");
          setPrice("");
          setIsPaid(true);
          setDate(new Date());
          setKeyword2("");
          setCountInStockError(false);
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
        {errorCreate && <Message severity="error" text={errorCreate} />}
        {countInStockError && (
          <Message
            severity="error"
            text={"This Item Not Available in the store"}
          />
        )}
        <div className="mx-auto space-y-4 p-4">
          <Toast ref={toastBottomCenter} position="bottom-center" />
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
              typeof keyword2 == "object"
                ? setCustomer(keyword2._id)
                : setCustomer("");
              typeof keyword2 == "object"
                ? setName(keyword2.name)
                : setName(keyword2);
              typeof keyword2 == "object"
                ? setPhone(keyword2.phone)
                : setPhone("");
            }}
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

          <div className="grid w-full grid-cols-1 gap-2 xl:grid-cols-12  xl:space-y-0">
            <AutoComplete
              placeholder="item name"
              inputClassName="w-full xl:h-11"
              className="xl:col-span-6"
              field="name"
              size="lg"
              value={item}
              suggestions={items}
              completeMethod={() => dispatch(listStoreItems())}
              onChange={(e) => setItem(e.value)}
              required
            />

            <InputText
              type="number"
              className="p-inputtext-sm xl:col-span-3"
              value={quantity}
              placeholder="Quantity"
              size="lg"
              required
              onChange={(e) => setQuantity(e.target.value)}
            />
            <InputText
              type="number"
              className="p-inputtext-sm xl:col-span-3"
              value={price}
              placeholder="Price"
              size="lg"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <div></div>
            <Button
              label="Add"
              onClick={() => {
              
                if (item != "" && quantity != "" && price != "") {
                  if (item.countInStock > 0) {
                    setCountInStockError(false);
                    dispatch(addToOrderItems(item._id, quantity, price));
                    
                    setItem("");
                    setQuantity("");
                    setPrice("");
                  } else {
                    setCountInStockError(true);
                  }
                }
              }}
            />
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
                      <i
                        className="pi pi-delete-left cursor-pointer"
                        onClick={() => dispatch(removeFromOrder(odr.item))}
                      />
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between">
            <div>
              
            </div>
            <div>
              <p className="text-left uppercase">Sub Total: ${subTotalPrice}</p>
              <spn className='flex gap-2 items-center'>
                <p>Discount:</p>
                
              <InputText
              type="number"
              className="p-inputtext-sm"
              value={discount}
              placeholder="amount"
              required
              onChange={(e) => setDiscount(e.target.value)}
            />
              </spn>
              <p className="text-left uppercase">Total: ${subTotalPrice == 0 ? subTotalPrice : subTotalPrice - discount}</p>
              

              <div>
                IsPaid
                <span className="px-2"></span>
                <Checkbox
                  onChange={(e) => setIsPaid(e.checked)}
                  checked={isPaid}
                  defaultValue={isPaid}
                ></Checkbox>
              </div> 
            </div>
          </div>
          <br></br>
          <br></br>

          <div className="mt-4 justify-center gap-4 xl:flex">
            <button
              type="submit"
              onClick={(e) => {
                if (orderItems.length != 0) {
                  submitHandler(e);
                } else {
                  showMessage(toastBottomCenter, "error");
                }
              }}
              className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
            >
              Save
            </button>
            <ReactToPrint
              trigger={() => <Button>Save & Print</Button>}
              content={() => componentRef}
              onBeforePrint={submitSaleHandler2}
              onAfterPrint={() => {
                dispatch({ type: SALES_CREATE_RESET });
                dispatch({ type: SALES2_CREATE_RESET });
                setCreate(false);
                setCustomer("");
                setPhone("");
                setQuantity("");
                setPrice("");
                setTotalAmount(0)
                setIsPaid(true);
                setDate(new Date());
                setKeyword2("");
                setCountInStockError(false);
                setIsSalesPrinting(false);
                dispatch({ type: ORDER_REMOVE_ITEM_ALL });
              }}
            />
          </div>
        </div>
        {/* </form> */}
      </Dialog>

      {/* Edit Inventory */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit Billing Status"
        visible={edit}
        onHide={() => {
          setEdit(false);
          setCustomer();
          setDate(new Date());
          setIsPaid();
          setItem();
          setQuantity();
          setPrice();
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
          <div className="mx-auto space-y-4 p-4">
            <div>
              IsPaid
              <span className="px-2"></span>
              <Checkbox
                onChange={(e) => setIsPaidBilling(e.checked)}
                checked={isPaidBilling}
              ></Checkbox>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="font-roboto rounded border border-primary bg-primary py-2 px-10 text-center font-medium uppercase text-white transition hover:bg-transparent hover:text-primary"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </Dialog>

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

      <div style={{ display: "none" }}>
        <ComponentToPrint
          ref={(el) => (componentRef = el)}
          customer={keyword2.name ? keyword2.name : keyword2}
          phone={phone}
          invoiceid={invoiceId}
          date={date}
          subTotalPrice={subTotalPrice}
          orderItems={orderItems}
        />
      </div>
    </>
  );
}

export default Sales2Screen;

import invoice from "@/data/images/invoicebg.png";
import { IoMdCall } from "react-icons/io";
import ReactToPrint from "react-to-print";

class ComponentToPrint extends React.Component {
  render() {
    const { customer } = this.props;
    const { phone } = this.props;
    const { subTotalPrice } = this.props;
    const { invoiceid } = this.props;
    const { date } = this.props;
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
              <p className="text-xl">
                Name:
                {customer}
              </p>
              <p className="text-xl">
                Phone:
                {phone}
              </p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">{invoiceid}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">{subTotalPrice}</span>
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
                {orderItems &&
                  orderItems.map((item, index) => (
                    <tr className="">
                      <td className="border border-blue-500 py-1 px-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        {item.itemName}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        {item.quantity}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        ${item.price}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
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
              <p className="text-xl">
                Name:
                {customer}
              </p>
              <p className="text-xl">
                Phone:
                {phone}
              </p>
            </div>
            <div className="">
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Invoice ID:</p>
                <span className="pl-2 text-xl">{invoiceid}</span>
              </div>
              <div className=" flex items-center">
                <p className=" text-2xl font-normal">Amount: </p>
                <span className="pl-2 text-xl">{subTotalPrice}</span>
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
                {orderItems &&
                  orderItems.map((item, index) => (
                    <tr className="">
                      <td className="border border-blue-500 py-1 px-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        {item.itemName}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        {item.quantity}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        ${item.price}
                      </td>
                      <td className="border border-blue-500 py-1 px-2">
                        ${item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
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
