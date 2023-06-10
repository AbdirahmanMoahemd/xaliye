import {
  HomeIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Home, StoreScreen, SalesScreen, CustomersScreen, TasksScreen, AccountsScreen, TransactionsScreen } from "@/pages/dashboard";
import { FcSalesPerformance } from "react-icons/fc";
import { MdAccountBalanceWallet } from "react-icons/md";
import { BiTask, BiHistory, BiTransfer } from "react-icons/bi";
import { AiTwotoneAppstore } from "react-icons/ai";
import { SignIn, SignUp } from "./pages/auth";


const icon = {
  className: "w-5 h-5 text-inherit ",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <AiTwotoneAppstore {...icon} />,
        name: "Inventory",
        path: "/inventory",
        element: <StoreScreen />,
      },
      {
        icon: <FcSalesPerformance  {...icon}/>,
        name: "Sales",
        path: "/sales",
        element: <SalesScreen />,
      },
      {
        icon: <BiTask  {...icon} />,
        name: "Tasks",
        path: "/tasks",
        element: <TasksScreen />,
      },
      {
        icon: <BiHistory {...icon} />,
        name: "Tasks Events",
        path: "/tasks-events",
        element: <TasksScreen />,
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Customers",
        path: "/customers",
        element: <CustomersScreen />,
      },
      {
        icon: <MdAccountBalanceWallet {...icon} />,
        name: "Accounts",
        path: "/account",
        element: <AccountsScreen />,
      },
      {
        icon: <BiTransfer   {...icon} />,
        name: "Transactions",
        path: "/transactions",
        element: <TransactionsScreen />,
      },
    ],
  },
  
  
];

export default routes;
