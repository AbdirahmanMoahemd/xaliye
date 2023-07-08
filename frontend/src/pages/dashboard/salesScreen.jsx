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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listStoreItems } from "@/actions/storeActions";
import {
  createNewSales,
  deleteSalesItem,
  listPaidSalesItems,
  listSalesByDateRange,
  listSalesItems,
  listUnPaidSalesItems,
  updateSalesBillingItem,
} from "@/actions/salesActions";
import {
  SALES_CREATE_RESET,
  SALES_UPDATE_BILLING_RESET,
} from "@/constants/salesConstants";
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



export function SalesScreen() {
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [item, setItem] = useState("");
  const [customer, setCustomer] = useState();
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [isPaid, setIsPaid] = useState(false);
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const salesList = useSelector((state) => state.salesList);
  const { loading: loadingSales, error: errorSales, sales, salesCount } = salesList;

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
  }, [dispatch, successCreate, successUpdate, keyword,pageNumber, successDelete]);

  useEffect(() => {
    dispatch(listStoreItems());
  }, [dispatch, successCreate]);

  useEffect(() => {}, [id]);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SALES_CREATE_RESET });
    }

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
    }
  }, [dispatch, successCreate]);

  useEffect(() => {
    dispatch(listCustomers());
  }, [dispatch]);
  let invoiceId = Math.floor(10000 + Math.random() * 9000);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createNewSales(
        item,
        customer,
        phone,
        quantity,
        price,
        date,
        invoiceId,
        isPaid
      )
    );
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
    setPageNumber(event.page +1)
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
                    "Item Name",
                    "Customer",
                    "Phone",
                    "Quantity",
                    "Price",
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
                            {item.item ? item.item.name : item.itemName}
                          </Typography>
                        </td>
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
                            ${item.quantity}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium capitalize text-blue-gray-400"
                          >
                            ${item.price}
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

      {/* Create Inventory */}
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
          setIsPaid(false);
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
              placeholder="item name"
              inputClassName="w-full"
              className=" w-full"
              field="name"
              value={item}
              suggestions={items}
              completeMethod={() => dispatch(listStoreItems())}
              onChange={(e) => setItem(e.value)}
              required
            />

            <Input
              type="text"
              value={customer}
              label="Customer Name"
              size="lg"
              required
              onChange={(e) => setCustomer(e.target.value)}
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
              type="number"
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
            <div className=" rounded border border-gray-400 py-2 px-2">
              <DatePicker selected={date} onChange={(dt) => setDate(dt)} />
            </div>

            <div>
              IsPaid
              <span className="px-2"></span>
              <Checkbox
                onChange={(e) => setIsPaid(e.checked)}
                checked={isPaid}
              ></Checkbox>
            </div>

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
    </>
  );
}

export default SalesScreen;
