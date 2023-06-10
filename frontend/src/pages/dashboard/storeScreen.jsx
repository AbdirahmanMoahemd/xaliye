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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewStoreItem,
  deleteStoreItem,
  listStoreItemDetails,
  listStoreItems,
  updateStoreItem,
} from "@/actions/storeActions";
import { confirmAlert } from "react-confirm-alert";
import {
  GET_STORES_RESET,
  STORE_CREATE_RESET,
  STORE_DETAILS_RESET,
  STORE_UPDATE_RESET,
} from "@/constants/storeConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

export function StoreScreen() {
  const [keyword, setKeyword] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState();
  const [selling, setSelling] = useState();
  const [countInStock, setCountInStock] = useState();
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const storeItemList = useSelector((state) => state.storeItemList);
  const { loading, error, items } = storeItemList;

  const storeItemDelete = useSelector((state) => state.storeItemDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = storeItemDelete;

  const createStoreItem = useSelector((state) => state.createStoreItem);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createStoreItem;

  const storeItemDetails = useSelector((state) => state.storeItemDetails);
  const { loading: loadingEdit, error: errorEdit, item } = storeItemDetails;

  const storeItemUpdate = useSelector((state) => state.storeItemUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = storeItemUpdate;

  useEffect(() => {
    dispatch({ type: GET_STORES_RESET });

    if (!userInfo) {
      navigate("/sign-in");
    } else {
      dispatch(listStoreItems(keyword));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successUpdate,
    successCreate,
    keyword,
  ]);

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: STORE_CREATE_RESET });
      setCreate(false);
      setName();
      setCost();
      setSelling();
      setCountInStock();
    }
  }, [dispatch, , successCreate]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STORE_UPDATE_RESET });
      dispatch({ type: STORE_DETAILS_RESET });
      setEdit(false);
      setName();
      setCost();
      setSelling();
      setCountInStock();
    } else {
      if (id != "") {
        if (!item.name || item._id !== id) {
          dispatch(listStoreItemDetails(id));
        } else {
          setName(item.name);
          setCost(item.cost);
          setSelling(item.selling);
          setCountInStock(item.countInStock);
        }
      }
    }
  }, [dispatch, id, item, successUpdate]);

 

  const submitHandler = (e) => {
    e.preventDefault();
    // DISPACTH REGISTER
    dispatch(createNewStoreItem(name, selling, cost, countInStock));
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateStoreItem(id, name, selling, cost, countInStock));
  };

  const deleteStoreItems = (id) => {
    confirmAlert({
      title: "Permanent Delete",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(deleteStoreItem(id)),
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
                Inventory
              </Typography>
            </div>
            <div>
              <Input
                label="Search by item name"
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
                <MenuItem onClick={() => setCreate(true)}>
                  Add New Item
                </MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
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
          <CardBody className="table-wrp block max-h-[34rem] overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                    "Item NAME",
                    "Cost Price",
                    "Selling PRICE",
                    "CountInStock",
                    "",
                    "",
                  ].map((el) => (
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
                <>
                  <tbody className="overflow-y-auto">
                    {items.map((item) => (
                      <tr>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {item.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            ${item.cost}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            ${item.selling}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {item.countInStock}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-6 text-left">
                          <Button
                            label=""
                            icon="pi pi-file-edit"
                            className="h-8"
                            onClick={() => {
                              setId("")
                              setId(item._id);
                              setEdit(true);
                            }}
                          />
                        </td>
                        <td>
                          <Button
                            className="h-8 text-red-700"
                            label=""
                            icon="pi pi-delete-left"
                            onClick={() => deleteStoreItems(item._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </CardBody>
        </Card>
      </div>
      {/* Create Inventory */}
      <Dialog
        blockScroll="false"
        aria-expanded={create ? true : false}
        header="New item"
        visible={create}
        onHide={() => {
          setCreate(false);
          setName();
          setCost();
          setSelling();
          setCountInStock();
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
              label="Item name"
              size="lg"
              required
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type="number"
              value={cost}
              label="Cost Price"
              size="lg"
              required
              onChange={(e) => setCost(e.target.value)}
            />

            <Input
              type="number"
              value={selling}
              label="Selling Price"
              size="lg"
              required
              onChange={(e) => setSelling(e.target.value)}
            />

            <Input
              type="number"
              value={countInStock}
              label="CountInStock"
              size="lg"
              required
              onChange={(e) => setCountInStock(e.target.value)}
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

      {/* Edit Inventory */}
      <Dialog
        blockScroll="false"
        aria-expanded={edit ? true : false}
        header="Edit item"
        visible={edit}
        onHide={() => {
          setEdit(false);
          setName();
          setCost();
          setSelling();
          setCountInStock();
        }}
        style={{ width: "40vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      >
        <form onSubmit={updateHandler}>
          {loadingEdit ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errorEdit ? (
            <Message severity="error" text={errorEdit} />
          ) : (
            <div className="mx-auto space-y-4 p-4">
              <Input
                type="text"
                value={name}
                label="Item name"
                size="lg"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                type="number"
                value={cost}
                label="Cost Price"
                size="lg"
                required
                onChange={(e) => setCost(e.target.value)}
              />

              <Input
                type="number"
                value={selling}
                label="Selling Price"
                size="lg"
                required
                onChange={(e) => setSelling(e.target.value)}
              />

              <Input
                type="number"
                value={countInStock}
                label="CountInStock"
                size="lg"
                required
                onChange={(e) => setCountInStock(e.target.value)}
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

export default StoreScreen;
