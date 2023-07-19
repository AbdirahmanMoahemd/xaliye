import {
  HomeIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Home, StoreScreen, SalesScreen, CustomersScreen, TasksScreen, AccountsScreen, TransactionsScreen } from "@/pages/dashboard";
import { FcSalesPerformance } from "react-icons/fc";
import { MdAccountBalanceWallet, MdOutlineEventRepeat } from "react-icons/md";
import { BiTask, BiTransfer } from "react-icons/bi";
import { AiTwotoneAppstore } from "react-icons/ai";
import { HiUserGroup } from "react-icons/hi";
import { BsPersonLinesFill } from "react-icons/bs";
import UsersScreen from "./pages/dashboard/usersScreen";
import EventsScreen from "./pages/dashboard/EventsScreen";
import HomeScreen from "./pages/dashboard2/homeScreen";



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
        icon: <MdOutlineEventRepeat {...icon} />,
        name: "Events",
        path: "/events",
        element: <EventsScreen />,
      },
      {
        icon: <HiUserGroup {...icon} />,
        name: "Customers",
        path: "/customers",
        element: <CustomersScreen />,
      },
      {
        icon: <BsPersonLinesFill {...icon} />,
        name: "Users",
        path: "/users",
        element: <UsersScreen />,
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



export const electronicRoutes = [
  {
    layout: "electronics",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <HomeScreen />,
      },
      {
        icon: <AiTwotoneAppstore {...icon} />,
        name: "Inventory",
        path: "/inventory",
        element: <></>,
      },
      {
        icon: <FcSalesPerformance  {...icon}/>,
        name: "Sales",
        path: "/sales",
        element: <></>,
      },
      {
        icon: <MdOutlineEventRepeat {...icon} />,
        name: "Events",
        path: "/events",
        element: <></>,
      },
      {
        icon: <HiUserGroup {...icon} />,
        name: "Customers",
        path: "/customers",
        element: <></>,
      },
      {
        icon: <BsPersonLinesFill {...icon} />,
        name: "Users",
        path: "/users",
        element: <></>,
      },
      {
        icon: <MdAccountBalanceWallet {...icon} />,
        name: "Accounts",
        path: "/account",
        element: <></>,
      },
      {
        icon: <BiTransfer   {...icon} />,
        name: "Sales Transactions",
        path: "/transactions",
        element: <></>,
      },
    ],
  },
  
  
];


