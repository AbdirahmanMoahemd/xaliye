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
  Textarea,
  Input,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewTransaction,
  deleteTransaction,
  listTransactions,
  listTransactionsByRangeDate,
} from "@/actions/transaction2Actions";
import { listSubAccounts } from "@/actions/subAccount2Actions";
import { AutoComplete } from "primereact/autocomplete";
import { Dialog } from "primereact/dialog";
import { TRANSACTION_CREATE_RESET } from "@/constants/transactions2Constants";
import DatePicker from "react-datepicker";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { confirmAlert } from "react-confirm-alert";
import moment from "moment";
import { listAccounts } from "@/actions/account2Actions";
import { Button } from "primereact/button";

export function Transactions2Screen() {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [Account, setAccount] = useState("");
  const [subAccount, setSubAccount] = useState("");
  const [Amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [ref, setRef] = useState("");
  const [id, setId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [dateRange, setDateRange] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createTransaction = useSelector((state) => state.createTransaction);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createTransaction;

  const transactionsList = useSelector((state) => state.transactionsList);
  const { loading, error, transactions } = transactionsList;

  const transactionDelete = useSelector((state) => state.transactionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = transactionDelete;

  const transactionUpdate = useSelector((state) => state.transactionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = transactionUpdate;

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    customer,
  } = transactionDetails;

  const subaccountsList = useSelector((state) => state.subaccountsList);
  const { loading: loadingSub, error: errorSub, subaccounts } = subaccountsList;
  const accountsList = useSelector((state) => state.accountsList);
  const { loading:loadingAc, error:errorAc, accounts } = accountsList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successCreate) {
      dispatch({ type: TRANSACTION_CREATE_RESET });
      setCreate(false);
      setAmount("");
      setAccount("");
      setSubAccount("");
      setDate(moment(new Date()).toDate());
      setId("");
      setRef("");
      setKeyword("");
      setKeyword2("");
    }
    dispatch(listTransactions());
  }, [dispatch, userInfo, successUpdate, successDelete, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createNewTransaction(
        Account,
        subAccount,
        Amount,
        date,
        ref
      )
    );
  };

  const deleteTransactions = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteTransaction(id)),
        },
      ],
    });
  };

  return (
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
              Transactions ({transactions && transactions.length})
            </Typography>
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
                Add New Transaction
              </MenuItem>
              <MenuItem onClick={()=> setDateRange(true)} className=" capitalize">Search By Date Range</MenuItem>
              <MenuItem className=" capitalize">Prepare Income Statement</MenuItem>
              <MenuItem onClick={() => dispatch(listTransactions())} className=" capitalize">
                Get All Transactions
              </MenuItem>
            </MenuList>
          </Menu>
        </CardHeader>
        <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="sticky top-0 z-40 border-b bg-white">
              <tr>
                {[
                  "Account",
                  "SubAccount",
                  "Date",
                  "Amount",
                  "Ref",
                  ""
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
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
              <>
                <tbody className="overflow-y-auto">
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {transaction.Account
                            ? transaction.Account.accountName
                            : "Not Found"}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {transaction.subAccount
                            ? transaction.subAccount.accountName
                            : "Not Found"}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {transaction.date &&
                            transaction.date.substring(0, 10)}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          ${transaction.Amount}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium capitalize text-blue-gray-400"
                        >
                          {transaction.ref}
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
                            <MenuItem>Update</MenuItem>
                            <MenuItem
                              onClick={() =>
                                deleteTransactions(transaction._id)
                              }
                            >
                              Delete
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
        </CardBody>
      </Card>


       {/* date rage  */}
       <Dialog
        blockScroll="false"
        aria-expanded={dateRange ? true : false}
        header="Select Date"
        visible={dateRange}
        onHide={() => {
          setDateRange(false)
          setStartDate(new Date())
          setEndDate(new Date())
          
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
            onClick={() =>  dispatch(listTransactionsByRangeDate(startDate, endDate))}
          >
            Search
          </Button>
        </div>
      </Dialog>

      {/* create subAccount */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Transaction"
        visible={create}
        onHide={() => {
          setCreate(false);
          setKeyword("");
          setAmount("");
          setEdit(false);
          setAccount("");
          setSubAccount("");
          setId("");
          setDate(moment(date).toDate());
          setRef("");
          setKeyword("");
          setKeyword2("");
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
                field="accountName"
                value={keyword}
                required
                inputClassName="w-full"
                className=" w-full"
                placeholder="Account"
                suggestions={accounts}
                completeMethod={() => dispatch(listAccounts(keyword))}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  setAccount(e.target.value);
                }}
              />

              <AutoComplete
                type="text"
                field="accountName"
                value={keyword2}
                required
                inputClassName="w-full"
                className="w-full"
                placeholder="SubAccount"
                suggestions={subaccounts}
                completeMethod={() => dispatch(listSubAccounts(keyword2))}
                onChange={(e) => {
                  setKeyword2(e.target.value);
                  setSubAccount(e.target.value);
                }}
              />
              <Input
                type="Number"
                value={Amount}
                label="Debit Amount"
                size="lg"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
             
           
            <div className=" rounded border border-gray-400 py-2 px-2">
              <DatePicker selected={date} onChange={(dt) => setDate(dt)} />
            </div>

            <Textarea
              label="Reference Message"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
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
    </div>
  );
}

export default Transactions2Screen;
