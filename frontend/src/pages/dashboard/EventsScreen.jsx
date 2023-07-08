import React, { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listEvents } from "@/actions/eventsActions";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const EventsScreen = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const eventsList = useSelector((state) => state.eventsList);
  const { loading, error, events } = eventsList;


  useEffect(()=> {
    if (!userInfo) {
      navigate("/sign-in");
    }

    dispatch(listEvents())

  },[dispatch,userInfo, navigate])



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
                Events
              </Typography>
            </div>
            <div className="mr-auto md:mr-4 md:w-56">
              <Input
                label="Search tasks by phone"
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
                  Add New Ticket
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(listTasksByThisWeek(keyword))}
                  className=" capitalize"
                >
                  Tasks of this Week
                </MenuItem>
                <MenuItem>Tasks of this Month</MenuItem>
                <MenuItem
                  onClick={() => navigate("/dashboard/bin")}
                  className=" capitalize"
                >
                  Tasks In Recycle Bin
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(listTasksByphone(keyword))}
                  className=" capitalize"
                >
                  All Tasks
                </MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>

          <CardBody className="table-wrp block max-h-screen overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[
                    "Username",
                    "Phone",
                    "date",
                    "event",
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
                {events.map((event) => (
                <tr id={event._id}>
                  <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {event.user ? event.user.name : 'Not Found'}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {event.user ? event.user.phone : 'Not Found'}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                     {event.createdAt && event.createdAt.substring(0, 10)}
                    </Typography>
                  </td>
                  <td className="border-b border-blue-gray-50 py-3 px-4 text-left">
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {event.event}
                    </Typography>
                  </td>
                </tr>
                ))}
              </tbody>
              )}
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default EventsScreen;
