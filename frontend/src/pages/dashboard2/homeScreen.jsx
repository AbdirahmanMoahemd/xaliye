import { getCustomerTotal } from "@/actions/customer2Actions";
import {
  addToOrderItems,
  createExSales,
  createExSalesAndPrint,
  createNewSales,
  createNewSalesAndPrint,
  deleteSalesItem,
  getSalesTotal,
  listRecentSales,
  removeFromOrder,
  updateSalesBillingItem,
} from "@/actions/sales2Actions";
import StatisticsCard2 from "@/widgets/cards/statistics-card2";
import StatisticsCard3 from "@/widgets/cards/statistics-card3";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useRef, useState } from "react";
import { AiFillDollarCircle, AiOutlineWarning } from "react-icons/ai";
import { FaFilter, FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import {
  ORDER_REMOVE_ITEM_ALL,
  SALES2_CREATE_RESET,
  SALES_CREATE_RESET,
  SALES_UPDATE_BILLING_RESET,
} from "@/constants/sales2Constants";
import {
  listStoreItems,
  updateStoreItemCountInStock,
} from "@/actions/store2Actions";
import { Dialog } from "primereact/dialog";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginator } from "primereact/paginator";
import { InputText } from "primereact/inputtext";
import { confirmAlert } from "react-confirm-alert";
import { listCustomers } from "@/actions/customer2Actions";
import ReactToPrint from "react-to-print";

const HomeScreen = () => {
  const [id, setId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [itemsale, setItemSale] = useState("");
  const [customer, setCustomer] = useState("");
  const [customersale, setCustomerSale] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [phone, setPhone] = useState();
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(true);
  const [isSalesPrinting, setIsSalesPrinting] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [toltalAmount, setToltalAmount] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [myOrderItems, setMyOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const [custname, setCustname] = useState("");
  const [first, setFirst] = useState(1);
  const [rows, setRows] = useState(200);
  const [createSale, setCreateSale] = useState(false);
  const [countInStockError, setCountInStockError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isPaidBilling, setIsPaidBilling] = useState(false);
  const [paidSales, setPaidSales] = useState(false);
  const [unPaidSales, setUnPaidSales] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const toastBottomCenter = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let componentRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const totalSales = useSelector((state) => state.totalSales);
  const {
    loading: loadingSalesTotal,
    error: errorSalesTotal,
    counter: counterSalesTotal,
  } = totalSales;

  const totalCustomer2 = useSelector((state) => state.totalCustomer2);
  const {
    loading: loadingCounterCustomer,
    error: errorCounterCustomer,
    counter: counterCustomer,
  } = totalCustomer2;

  const salesRecentList2 = useSelector((state) => state.salesRecentList2);
  const {
    loading: loadingSales,
    error: errorSales,
    sales,
    salesCount,
  } = salesRecentList2;

  const createSales2 = useSelector((state) => state.createSales2);
  const {
    loading: loadingSaleCreate,
    error: errorSaleCreate,
    success: successSaleCreate,
  } = createSales2;

  const salesDelete2 = useSelector((state) => state.salesDelete2);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = salesDelete2;

  const createSalesAndPrint = useSelector((state) => state.createSalesAndPrint);
  const {
    loading: loadingSaleCreateAndPrint,
    error: errorSaleCreateAndPrint,
    success: successSaleCreateAndPrint,
  } = createSalesAndPrint;

  const order2 = useSelector((state) => state.order2);
  const { orderItems } = order2;

  const storeItemList2 = useSelector((state) => state.storeItemList2);
  const { items } = storeItemList2;

  const salesUpdateBilling2 = useSelector((state) => state.salesUpdateBilling2);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = salesUpdateBilling2;

  const customersList = useSelector((state) => state.customersList);
  const {
    loading: loadingCustomer,
    error: errorCustomer,
    customers,
  } = customersList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    dispatch(getCustomerTotal());
    dispatch(getSalesTotal());
    dispatch(listCustomers(keyword2));
  }, [dispatch, successSaleCreate]);

  useEffect(() => {
    if (successSaleCreateAndPrint) {
      setCreateSale(false);
     
    }
  }, [dispatch]);
  useEffect(() => {
    setIsSalesPrinting(true);
    if (successSaleCreate) {
      setIsSalesPrinting(true);
      dispatch({ type: SALES_CREATE_RESET });
      dispatch({ type: SALES2_CREATE_RESET });
      setCreateSale(false);
      setItemSale("");
      setCustomerSale("");
      setQuantity("");
      setPrice("");
      setIsPaid(false);
      setDate(new Date());
      setCountInStockError(false);
      countInStockHandler();
      dispatch({ type: ORDER_REMOVE_ITEM_ALL });
    }
    if (successUpdate) {
      dispatch({ type: SALES_UPDATE_BILLING_RESET });
      setEdit(false);
    }
    dispatch(listRecentSales(keyword, pageNumber));
  }, [
    dispatch,
    successSaleCreate,
    keyword,
    pageNumber,
    successUpdate,
    successSaleCreateAndPrint,
    successDelete,
  ]);

  const countInStockHandler = () => {
    for (let index = 0; index < orderItems.length; index++) {
      const element = orderItems[index];

      dispatch(updateStoreItemCountInStock(element.item, element.quantity));
    }
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPageNumber(event.page + 1);
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (id != "") {
      dispatch(updateSalesBillingItem(id, isPaidBilling));
    } else {
    }
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

  let invoiceId = Math.floor(10000 + Math.random() * 9000);

  let toltal;
  const getTotal = (e) => {
    e.preventDefault();
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    let totalIncome = addDecimals(
      (toltal = sales.reduce((acc, item) => acc + item.totalPrice, 0))
    );
    setToltalAmount(totalIncome);
    setShowTotal(true);
  };

  let subTotalPrice = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let totalPrice = orderItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const itemqty = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  const submitSaleHandler = (e) => {
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
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard2
          color="pink"
          title={"Total Sales"}
          icon={<FcSalesPerformance className="h-6 w-6" />}
          value={counterSalesTotal == null ? "0" : counterSalesTotal.totalSales}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className={
                  counterSalesTotal == null
                    ? ""
                    : counterSalesTotal.todaySalesPerc >
                      counterSalesTotal.yesterdaySalesPerc
                    ? "text-green-500"
                    : counterSalesTotal.todaySalesPerc <
                      counterSalesTotal.yesterdaySalesPerc
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {counterSalesTotal == null
                  ? "0"
                  : counterSalesTotal.todaySalesPerc >
                    counterSalesTotal.yesterdaySalesPerc
                  ? "+"
                  : counterSalesTotal.todaySalesPerc <
                    counterSalesTotal.yesterdaySalesPerc
                  ? "-"
                  : ""}
                {counterSalesTotal == null
                  ? "0"
                  : counterSalesTotal.todaySalesPerc >
                    counterSalesTotal.yesterdaySalesPerc
                  ? counterSalesTotal.todaySalesPerc
                  : counterSalesTotal.todaySalesPerc <
                    counterSalesTotal.yesterdaySalesPerc
                  ? counterSalesTotal.yesterdaySalesPerc
                  : 0}
                %
              </strong>
              &nbsp;
              {counterSalesTotal == null
                ? ""
                : counterSalesTotal.todaySalesPerc >
                  counterSalesTotal.yesterdaySalesPerc
                ? "more than yesterday"
                : counterSalesTotal.todaySalesPerc <
                  counterSalesTotal.yesterdaySalesPerc
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

      <div className="mb-4 grid grid-cols-1 gap-2">
        <Card>
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
          >
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Sales Overview
            </Typography>
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
                  <MenuItem onClick={() => setCreateSale(true)}>
                    New Sale
                  </MenuItem>
                  <MenuItem onClick={getTotal}>Get Total</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </CardHeader>
          <CardBody className="table-wrp block max-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
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
                                    setIsPaidBilling(item.isPaid);
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

      <Dialog
        blockScroll="false"
        aria-expanded={showTotal ? true : false}
        header="Sales Total Amount"
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

      {/* Edit sales */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit Billing Status"
        visible={edit}
        onHide={() => {
          setEdit(false);
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

      {/* Create Sale */}
      <Dialog
        blockScroll="false"
        aria-expanded={createSale ? true : false}
        header="New Sale"
        visible={createSale}
        onHide={() => {
          dispatch({ type: SALES_CREATE_RESET });
          dispatch({ type: SALES2_CREATE_RESET });
          setCreateSale(false);
          setCustomer("");
          setPhone("");
          setQuantity("");
          setPrice("");
          setIsPaid(true);
          setDate(new Date());
          setKeyword2("");
          setCountInStockError(false);
          setIsSalesPrinting(false);
          dispatch({ type: ORDER_REMOVE_ITEM_ALL });
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        {/* <form onSubmit={submitHandler}> */}
        {loadingSaleCreate && (
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        )}
        {errorSaleCreate && <Message severity="error" text={errorSaleCreate} />}
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
            className="w-full"
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
            <InputText
              type="number"
              value={phone}
              inputClassName="w-full"
              className="p-inputtext-sm w-full"
              placeholder="Phone Number"
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
              value={itemsale}
              suggestions={items}
              completeMethod={() => dispatch(listStoreItems())}
              onChange={(e) => {
                setItemSale(e.value);
                if (itemsale.selling != null) {
                  setPrice(itemsale.selling);
                }
              }}
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
                if (itemsale != "" && quantity != "" && price != "") {
                  if (itemsale.countInStock > 0) {
                    setCountInStockError(false);

                    dispatch(addToOrderItems(itemsale._id, quantity, price));
                    setItemSale("");
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
                <th className="w-24 border border-blue-gray-50 py-3 px-2 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-medium uppercase text-blue-gray-600"
                  ></Typography>
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
                  submitSaleHandler(e);
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
                setCreateSale(false);
                setCustomer("");
                setPhone("");
                setQuantity("");
                setPrice("");
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
          totalPrice={totalPrice}
          orderItems={orderItems}
        />
      </div>
    </div>
  );
};

export default HomeScreen;

import invoice from "@/data/images/invoicebg.png";
import { IoMdCall } from "react-icons/io";
import { Toast } from "primereact/toast";

class ComponentToPrint extends React.Component {
  render() {
    const { customer } = this.props;
    const { phone } = this.props;
    const { totalPrice } = this.props;
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
                <span className="pl-2 text-xl">{totalPrice}</span>
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
                <span className="pl-2 text-xl">{totalPrice}</span>
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
