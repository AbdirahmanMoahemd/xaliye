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
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  deleteTasks,
  listTasksInBin,
  updateTasksToUnBin,
} from "@/actions/tasksActions";
import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidenav, DashboardNavbar, Configurator } from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController } from "@/context";

const BinTasksScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [controller] = useMaterialTailwindController();
  const { sidenavType } = controller;

  const tasksListInBin = useSelector((state) => state.tasksListInBin);
  const { loading, error, tasks } = tasksListInBin;

  const taskDelete = useSelector((state) => state.taskDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = taskDelete;

  const tasksUnBin = useSelector((state) => state.tasksUnBin);
  const {
    loading: loadingUnBin,
    error: errorUnBin,
    success: successUnBin,
  } = tasksUnBin;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    } else {
      dispatch(listTasksInBin());
    }
  }, [dispatch, navigate, userInfo, successDelete, successUnBin]);

  const UnBinTask = (id) => {
    confirmAlert({
      title: "Restore",
      message: "Are You Sure?",
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          onClick: () => dispatch(updateTasksToUnBin(id)),
        },
      ],
    });
  };

  const deleteTask = (id) => {
    confirmAlert({
      title: "Permanent Delete",
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
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
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
                  Tasks In Recycle Bin
                </Typography>
              </div>
              <div className="mr-auto md:mr-4 md:w-56">
                <Input label="Search tasks by phone" />
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
                  <MenuItem onClick={() => navigate("/dashboard/tasks")} className=" capitalize">
                    Back To Tasks
                  </MenuItem>
                </MenuList>
              </Menu>
            </CardHeader>

            <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead className="sticky top-0 border-b bg-white">
                  <tr>
                    {[
                      "NAME",
                      "Phone",
                      "Item",
                      "Problem Type",
                      "Date",
                      "Amount",
                      "",
                      "",
                      "",
                    ].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-4 text-left"
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
                    {tasks.map((task) => (
                      <tr id={task._id}>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {task.customer && task.customer.name}
                          </Typography>
                        </td>

                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {task.customer && task.customer.name}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {task.customer ? task.customer.phone : task.phone}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {task.problem}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            {task.date && task.date.substring(0, 10)}
                          </Typography>
                        </td>
                        <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                          <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                          >
                            ${task.amount}
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
                            <MenuItem onClick={() => UnBinTask(task._id)}>
                              Restore
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
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BinTasksScreen;
