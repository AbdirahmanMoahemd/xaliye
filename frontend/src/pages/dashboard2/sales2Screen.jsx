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
  import { useEffect, useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import {
    listStoreItems,
    updateStoreItemCountInStock,
  } from "@/actions/store2Actions";
  import {
    addToOrderItems,
    createNewSales,
    deleteSalesItem,
    listPaidSalesItems,
    listSalesByDateRange,
    listSalesItems,
    listUnPaidSalesItems,
    updateSalesBillingItem,
  } from "@/actions/sales2Actions";
  import {
    ORDER_REMOVE_ITEM_ALL,
    SALES_CREATE_RESET,
    SALES_UPDATE_BILLING_RESET,
  } from "@/constants/sales2Constants";
  import { listCustomers } from "@/actions/cusomerActions";
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
  
  export function Sales2Screen() {
    const [keyword, setKeyword] = useState("");
    const [id, setId] = useState("");
    const [item, setItem] = useState("");
    const [customer, setCustomer] = useState();
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [date, setDate] = useState(new Date());
    const [isPaid, setIsPaid] = useState(true);
    const [isPaidBilling, setIsPaidBilling] = useState(false);
    const [create, setCreate] = useState(false);
    const [edit, setEdit] = useState(false);
    const [dateRange, setDateRange] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [phone, setPhone] = useState();
    const [first, setFirst] = useState(1);
    const [rows, setRows] = useState(200);
    const [pageNumber, setPageNumber] = useState(1);
    const [myOrderItems, setMyOrderItems] = useState([]);
    const [show, setShow] = useState(false);
    const [custname, setCustname] = useState("");
    const [countInStockError, setCountInStockError] = useState(false);
    const toastBottomCenter = useRef(null);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
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
      dispatch(listStoreItems());
    }, [dispatch, successCreate]);
  
    useEffect(() => {}, [id]);
  
    useEffect(() => {
      if (successCreate) {
        dispatch({ type: SALES_CREATE_RESET });
        setCreate(false);
        setItem("");
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
    }, [dispatch]);
    let invoiceId = Math.floor(10000 + Math.random() * 9000);
    let totalPrice = orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    const itemqty = orderItems.reduce((acc, item) => acc + item.quantity, 0);
  
    const submitHandler = (e) => {
      e.preventDefault();
      console.log(orderItems);
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
                    onClick={() => dispatch(listUnPaidSalesItems)}
                    className=" capitalize"
                  >
                    UnPaid Orders
                  </MenuItem>
                  <MenuItem
                    onClick={() => dispatch(listPaidSalesItems)}
                    className=" capitalize"
                  >
                    Paid Orders
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
                      {sales.map((item) => (
                        <tr key={item._id}>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              {item.customer}
                            </Typography>
                          </td>
                          <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                            <Typography
                              variant="small"
                              className="text-[11px] font-medium capitalize text-blue-gray-400"
                            >
                              {item.phone}
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
            setCreate(false);
            setItem("");
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
          {errorCreate && <Message severity="error" text={errorCreate} />}
          {countInStockError && <Message severity="error" text={'This Item Not Available in the store'} />}
          <div className="mx-auto space-y-4 p-4">
            <Toast ref={toastBottomCenter} position="bottom-center" />
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
                value={item}
                suggestions={items}
                completeMethod={() => dispatch(listStoreItems())}
                onChange={(e) => setItem(e.value)}
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
              <Button
                label="Add"
                onClick={() => {
                  if (item != "" && quantity != "" && price != "") {
                    if (item.countInStock > 0) {
                      setCountInStockError(false)
                      dispatch(addToOrderItems(item._id, quantity, price));
                      setItem("");
                      setQuantity("");
                      setPrice("");
                    }else{
                      setCountInStockError(true)
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
      </>
    );
  }
  
  export default Sales2Screen;
  