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
} from "@/constants/customersConstants";
import {
  createNewCustomer,
  deleteCustomer,
  listCustomerDetails,
  listCustomers,
  updateCustomer,
} from "@/actions/cusomerActions";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { confirmAlert } from "react-confirm-alert";

export function CustomersScreen() {
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [keyword2, setKeyword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createCustomer = useSelector((state) => state.createCustomer);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createCustomer;

  const customersList = useSelector((state) => state.customersList);
  const { loading, error, customers } = customersList;

  const customerDelete = useSelector((state) => state.customerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = customerDelete;

  const customerUpdate = useSelector((state) => state.customerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = customerUpdate;

  const customerDetails = useSelector((state) => state.customerDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    customer,
  } = customerDetails;

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
    dispatch(listCustomers(keyword2));
  }, [dispatch, userInfo, keyword2, navigate, successCreate,successUpdate, successDelete]);

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
          setName(customer.name);
          setPhone(customer.phone);
        }
      }
    }
  }, [dispatch, id, customer, successUpdate]);

  const onClickFn = () => {
    setCreate(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNewCustomer(name, phone));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateCustomer(id, name, phone));
  };

  const getMyTasks = (id) => {
    setShow(true);
    dispatch(listMyTasks(id));
  };

  const getCustomers = (e) => {
    e.preventDefault();
    dispatch(listCustomers(keyword2));
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
                <MenuItem onClick={() => setCreate(true)}>
                  Add New Customer
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="table-wrp block max-h-[34rem] overflow-x-scroll px-0 pt-0 pb-2">
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
                  {["ID", "Name", "Phone", "Tickets", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-6 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-medium uppercase text-blue-gray-400"
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
                          XRC-{cust.custID}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {cust.name}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          {cust.phone}
                        </Typography>
                      </td>
                      <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                        <Typography
                          variant="small"
                          className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                          <Button
                            className="z-10 h-8"
                            label="Show"
                            icon=""
                            onClick={() => getMyTasks(cust._id)}
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
          </CardBody>
        </Card>
      </div>

      {/* create ticket */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="Add New Ticket"
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
        header="Update Ticket"
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

export default CustomersScreen;
