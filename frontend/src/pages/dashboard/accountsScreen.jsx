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
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewAccount,
  deleteAccount,
  listAccountDetails,
  listAccounts,
  updateAccount,
} from "@/actions/accountActions";
import {
  ACCOUNT_CREATE_RESET,
  ACCOUNT_DETAILS_RESET,
  ACCOUNT_LIST_RESET,
  ACCOUNT_UPDATE_RESET,
} from "@/constants/accountConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { AutoComplete } from "primereact/autocomplete";
import {
  createNewSubAccount,
  deleteSubAccount,
  listSubAccountDetails,
  listSubAccounts,
  updateSubAccount,
} from "@/actions/subAccountActions";
import {
  SUBACCOUNT_CREATE_RESET,
  SUBACCOUNT_DETAILS_RESET,
  SUBACCOUNT_LIST_RESET,
  SUBACCOUNT_UPDATE_RESET,
} from "@/constants/subAccountConstants";
import { confirmAlert } from "react-confirm-alert";

export function AccountsScreen() {
  const [create, setCreate] = useState(false);
  const [subcreate, setSubCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [subedit, setSubEdit] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  const [subid, setSubId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [generalAccount, setGeneralAccount] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createAccount = useSelector((state) => state.createAccount);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createAccount;

  const createSubAccount = useSelector((state) => state.createSubAccount);
  const {
    loading: loadingSubCreate,
    error: errorSubCreate,
    success: successSubCreate,
  } = createSubAccount;

  const accountsList = useSelector((state) => state.accountsList);
  const { loading, error, accounts } = accountsList;

  const subaccountsList = useSelector((state) => state.subaccountsList);
  const { loading: loadingSub, error: errorSub, subaccounts } = subaccountsList;

  const accountDelete = useSelector((state) => state.accountDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = accountDelete;

  const subaccountDelete = useSelector((state) => state.subaccountDelete);
  const {
    loading: loadingSubDelete,
    error: errorSubDelete,
    success: successSubDelete,
  } = subaccountDelete;

  const accountUpdate = useSelector((state) => state.accountUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = accountUpdate;

  const subaccountUpdate = useSelector((state) => state.subaccountUpdate);
  const {
    loading: loadingSubUpdate,
    error: errorSubUpdate,
    success: successSubUpdate,
  } = subaccountUpdate;

  const accountDetails = useSelector((state) => state.accountDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    account,
  } = accountDetails;

  const subaccountDetails = useSelector((state) => state.subaccountDetails);
  const {
    loading: loadingSubDetails,
    error: errorSubDetails,
    subaccount,
  } = subaccountDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successCreate) {
      dispatch({ type: ACCOUNT_LIST_RESET });
      dispatch({ type: ACCOUNT_CREATE_RESET });
      setCreate(false);
      setSubCreate(false);
      setEdit(false);
      setAccountName("");
      setDescription("");
      setId("");
      setSubId("");
    }
    dispatch(listAccounts());
  }, [dispatch, navigate, successCreate, successUpdate, successDelete]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ACCOUNT_UPDATE_RESET });
      dispatch({ type: ACCOUNT_DETAILS_RESET });
      setCreate(false);
      setSubCreate(false);
      setEdit(false);
      setSubEdit(false);
      setAccountName("");
      setDescription("");
      setId("");
      setSubId("");
    }
  }, [dispatch, successUpdate]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
    if (successSubCreate) {
      dispatch({ type: SUBACCOUNT_LIST_RESET });
      dispatch({ type: SUBACCOUNT_CREATE_RESET });
      setCreate(false);
      setSubEdit(false);
      setSubCreate(false);
      setKeyword("");
      setGeneralAccount("");
      setEdit(false);
      setAccountName("");
      setDescription("");
      setId("");
      setSubId("");
    }
    dispatch(listSubAccounts(keyword));
  }, [
    dispatch,
    navigate,
    successSubCreate,
    successSubUpdate,
    keyword,
    successSubDelete,
  ]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ACCOUNT_UPDATE_RESET });
      dispatch({ type: ACCOUNT_DETAILS_RESET });
    } else {
      if (id != "") {
        if (!account.accountName || account._id !== id) {
          dispatch(listAccountDetails(id));
        } else {
          setAccountName(account.accountName);
          setDescription(account.description);
        }
      }
    }
  }, [dispatch, id, account, successUpdate]);

  useEffect(() => {
    if (successSubUpdate) {
      dispatch({ type: SUBACCOUNT_UPDATE_RESET });
      dispatch({ type: SUBACCOUNT_DETAILS_RESET });
      setSubEdit(false);
      console.log(subedit);
    } else {
      if (subid !== "") {
        if (!subaccount.accountName || subaccount._id !== subid) {
          dispatch(listSubAccountDetails(subid));
        } else {
          setAccountName(subaccount.accountName);
          setGeneralAccount(subaccount.generalAccount);
          setKeyword2(subaccount.generalAccount.accountName);
          setDescription(subaccount.description);
          console.log(subaccount);
        }
      }
    }
  }, [dispatch, subid, subaccount, successSubUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewAccount(accountName, description));
  };

  const submitHandler2 = (e) => {
    e.preventDefault();

    dispatch(createNewSubAccount(accountName, generalAccount, description));
    dispatch({ type: ACCOUNT_LIST_RESET });
  };

  const updateAccountHandler = (e) => {
    e.preventDefault();

    dispatch(updateAccount(id, accountName, description));
  };

  const updateSubAccountHandler = (e) => {
    e.preventDefault();
    dispatch(updateSubAccount(subid, accountName, generalAccount, description));
  };

  const deleteSubAcc = (id) => {
    confirmAlert({
      title: "Permanently Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteSubAccount(id)),
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
              Account
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
                Add New Account
              </MenuItem>
              
            </MenuList>
          </Menu>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="sticky top-0 z-40 border-b bg-white">
              <tr>
                {["Account No", "Account Name", "Description"].map((el) => (
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
              <tbody className="overflow-y-auto">
                {accounts.map((acc) => (
                  <tr id={acc._id}>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {acc.accountNo}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {acc.accountName}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {acc.description}
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
                              setId(acc._id);
                              setEdit(true);
                            }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              confirmAlert({
                                title: "Permanently Delete",
                                message: "Are You Sure?",
                                buttons: [
                                  {
                                    label: "No",
                                  },
                                  {
                                    label: "Yes",
                                    onClick: () =>
                                      dispatch(deleteAccount(acc._id)),
                                  },
                                ],
                              })
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
            )}
          </table>
        </CardBody>
      </Card>

      <Card className="overflow-hidden xl:col-span-3">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Sub Account
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
              <MenuItem onClick={() => setSubCreate(true)}>
                Add New SubAccount
              </MenuItem>
              <MenuItem>Another Action</MenuItem>
              <MenuItem>Something else here</MenuItem>
            </MenuList>
          </Menu>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Account No",
                  "Account Name",
                  "General Account",
                  "Description",
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
            {loadingSub ? (
              <ProgressSpinner
                style={{ width: "20px", height: "20px" }}
                strokeWidth="6"
                fill="var(--surface-ground)"
                animationDuration=".5s"
              />
            ) : errorSub ? (
              <Message severity="error" text={errorSub} />
            ) : (
              <tbody className="overflow-y-auto">
                {subaccounts.map((subacc) => (
                  <tr id={subacc._id}>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {subacc.accountNo}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {subacc.accountName}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {subacc.generalAccount
                          ? subacc.generalAccount.accountName
                          : "Not Found"}
                      </Typography>
                    </td>
                    <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
                      >
                        {subacc.description}
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
                              setSubId(subacc._id);
                              setSubEdit(true);
                            }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem onClick={() => deleteSubAcc(subacc._id)}>
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
        </CardBody>
      </Card>

      {/* create account */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Account"
        visible={create}
        onHide={() => {
          setCreate(false);
          setSubCreate(false);
          setKeyword("");
          setGeneralAccount("");
          setEdit(false);
          setAccountName("");
          setDescription("");
          setId("");
          setSubId("");
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
              value={accountName}
              label="Account Name"
              size="lg"
              required
              onChange={(e) => setAccountName(e.target.value)}
            />

            <Input
              type="text"
              value={description}
              label="Description"
              size="lg"
              required
              onChange={(e) => setDescription(e.target.value)}
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

      {/* upodate account */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit Account"
        visible={edit}
        onHide={() => {
          setEdit(false);
          setCreate(false);
          setSubCreate(false);
          setKeyword("");
          setGeneralAccount("");
          setEdit(false);
          setAccountName("");
          setDescription("");
          setId("");
          setSubId("");
          dispatch({ type: ACCOUNT_DETAILS_RESET });
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateAccountHandler}>
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
                value={accountName}
                label="Account Name"
                size="lg"
                required
                onChange={(e) => setAccountName(e.target.value)}
              />

              <Input
                type="text"
                value={description}
                label="Description"
                size="lg"
                required
                onChange={(e) => setDescription(e.target.value)}
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

      {/* create subAccount */}
      <Dialog
        blockScroll="false"
        aria-expanded={subcreate ? true : false}
        header="Add New SubAccount"
        visible={subcreate}
        onHide={() => {
          setSubCreate(false);
          setCreate(false);
          setKeyword("");
          setGeneralAccount("");
          setEdit(false);
          setAccountName("");
          setDescription("");
          setId("");
          setSubId("");
          dispatch({ type: SUBACCOUNT_CREATE_RESET });
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={submitHandler2}>
          {loadingSubCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSubCreate && <Message severity="error" text={errorSubCreate} />}
          <div className="mx-auto space-y-4 p-4">
            <Input
              type="text"
              value={accountName}
              label="Account Name"
              size="lg"
              required
              onChange={(e) => setAccountName(e.target.value)}
            />

            <AutoComplete
              type="text"
              inputClassName="w-full"
              className=" w-full"
              field="accountName"
              value={keyword2}
              required
              placeholder="General Account name"
              suggestions={accounts}
              completeMethod={() => dispatch(listAccounts(keyword2))}
              onChange={(e) => {
                setKeyword2(e.target.value);
                setGeneralAccount(e.target.value);
              }}
            />

            <Input
              type="text"
              value={description}
              label="Description"
              size="lg"
              required
              onChange={(e) => setDescription(e.target.value)}
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

      {/* update subAccount */}
      <Dialog
        blockScroll="false"
        aria-expanded={subedit ? true : false}
        header="Edit SubAccount"
        visible={subedit}
        onHide={() => {
          setSubEdit(false);
          setSubEdit(false);
          setSubCreate(false);
          setCreate(false);
          setKeyword("");
          setGeneralAccount("");
          setEdit(false);
          setAccountName("");
          setDescription("");
          setId("");
          setSubId("");
          dispatch({ type: SUBACCOUNT_DETAILS_RESET });
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateSubAccountHandler}>
          {loadingSubUpdate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorSubUpdate && <Message severity="error" text={errorSubUpdate} />}
          {loadingSubDetails ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errorSubDetails ? (
            <Message severity="error" text={errorSubDetails} />
          ) : (
            <div className="mx-auto space-y-4 p-4">
              <Input
                type="text"
                value={accountName}
                label="Account Name"
                size="lg"
                required
                onChange={(e) => setAccountName(e.target.value)}
              />

              <AutoComplete
                type="text"
                inputClassName="w-full"
                className=" w-full"
                field="accountName"
                value={keyword2}
                required
                placeholder="General Account name"
                suggestions={accounts}
                completeMethod={() => dispatch(listAccounts(keyword2))}
                onChange={(e) => {
                  setKeyword2(e.target.value);
                  setGeneralAccount(e.target.value);
                }}
              />

              <Input
                type="text"
                value={description}
                label="Description"
                size="lg"
                required
                onChange={(e) => setDescription(e.target.value)}
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
    </div>
  );
}

export default AccountsScreen;
