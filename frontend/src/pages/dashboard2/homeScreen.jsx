import { getCustomerTotal } from "@/actions/cusomerActions";
import StatisticsCard2 from "@/widgets/cards/statistics-card2";
import StatisticsCard3 from "@/widgets/cards/statistics-card3";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const totalCustomer = useSelector((state) => state.totalCustomer);
  const {
    loading: loadingCounterCustomer,
    error: errorCounterCustomer,
    counter: counterCustomer,
  } = totalCustomer;

  useEffect(() => {
    if (!userInfo) {
      navigate("/sign-in");
    }
    dispatch(getCustomerTotal());
  }, [dispatch, userInfo]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard2
          color="pink"
          title={"Total Sales"}
          icon={<FcSalesPerformance className="h-6 w-6" />}
          value={counterCustomer == null ? "0" : counterCustomer.totalSales}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong
                className={
                  counterCustomer == null
                    ? ""
                    : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                    ? "text-green-500"
                    : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                    ? "text-red-500"
                    : "text-green-500"
                }
              >
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                  ? "+"
                  : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                  ? "-"
                  : ""}
                {counterCustomer == null
                  ? "0"
                  : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                  ? counterCustomer.todayPerc
                  : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
                  ? counterCustomer.yesterdayPerc
                  : 0}
                %
              </strong>
              &nbsp;
              {counterCustomer == null
                ? ""
                : counterCustomer.todayPerc > counterCustomer.yesterdayPerc
                ? "more than yesterday"
                : counterCustomer.todayPerc < counterCustomer.yesterdayPerc
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
                <MenuItem>New Sale</MenuItem>
              </MenuList>
            </Menu>
          </CardHeader>
          <CardBody className="table-wrp block max-h-screen  overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full table-auto">
              <thead className="sticky top-0 z-40 border-b bg-white">
                <tr>
                  {[ 
                    "Customer",
                    "Phone",
                    "Order Items",
                    "Total Price",
                    "Date",
                    "Billing Status"
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
            </table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default HomeScreen;
