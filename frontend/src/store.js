import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";



import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userReducerCount,
  userRegisterReducer,
  userUpdateReducer,
  userUpdReducer,
  userUpdatePasswordReducer,
} from "./reducers/userReducers";

import {createTaskReducer, taskDeleteReducer, tasksBinReducer, tasksDetailsReducer, tasksListInBinReducer, tasksListReducer, tasksListReducer2, tasksUnBinReducer, tasksUpdateReducer, tasksUpdateStageReducer, totalTasksReducerCount} from './reducers/tasksReducers'
import { createStoreItemReducer, storeItemDeleteReducer, storeItemDetailsReducer, storeItemListReducer, storeItemUpdateReducer } from "./reducers/storeReducers";
import { createIncomeItemReducer, incomeItemDeleteReducer, incomeItemDetailsReducer, incomeItemListReducer, incomeItemUpdateReducer, totalTasksIncomeReducerCount } from "./reducers/incomeReducers";
import { blanceReducerCount, createExpenseItemReducer, expenseItemDeleteReducer, expenseItemDetailsReducer, expenseItemListReducer, expenseItemUpdateReducer } from "./reducers/expenseReducers";
import { createCustomerReducer, customerDeleteReducer, customerDetailsReducer, customerUpdateReducer, customersListReducer, totalCustomerReducerCount } from "./reducers/customerReducer";
import { createSalesReducer, salesDeleteReducer, salesDetailsReducer, salesListReducer, salesRecentListReducer, salesUpdateBillingReducer, salesUpdateReducer } from "./reducers/salesReducers";


const reducer = combineReducers({
  
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpd: userUpdReducer,
  userCount: userReducerCount,
  userUpdatePassword: userUpdatePasswordReducer,


  createTask: createTaskReducer,
  tasksList: tasksListReducer,
  tasksList2: tasksListReducer2,
  taskDelete: taskDeleteReducer,
  tasksUpdate:tasksUpdateReducer,
  tasksDetails:tasksDetailsReducer,
  tasksUpdateStage:tasksUpdateStageReducer,
  tasksBin:tasksBinReducer,
  tasksListInBin:tasksListInBinReducer,
  tasksUnBin:tasksUnBinReducer,
  totalTasks:totalTasksReducerCount,


  createStoreItem:createStoreItemReducer,
  storeItemList:storeItemListReducer,
  storeItemDelete:storeItemDeleteReducer,
  storeItemUpdate:storeItemUpdateReducer,
  storeItemDetails:storeItemDetailsReducer,


  createIncomeItem:createIncomeItemReducer,
  incomeItemList:incomeItemListReducer,
  incomeItemDelete:incomeItemDeleteReducer,
  incomeItemUpdate:incomeItemUpdateReducer,
  incomeItemDetails:incomeItemDetailsReducer,
  totalTasksIncomeCount:totalTasksIncomeReducerCount,

  createExpenseItem:createExpenseItemReducer,
  expenseItemList:expenseItemListReducer,
  expenseItemDelete:expenseItemDeleteReducer,
  expenseItemUpdate:expenseItemUpdateReducer,
  expenseItemDetails:expenseItemDetailsReducer,


  blanceCount:blanceReducerCount,
  

  createCustomer:createCustomerReducer,
  customersList:customersListReducer,
  customerDetails:customerDetailsReducer,
  customerUpdate:customerUpdateReducer,
  customerDelete:customerDeleteReducer,
  totalCustomer:totalCustomerReducerCount,


  createSales:createSalesReducer,
  salesList:salesListReducer,
  salesDetails:salesDetailsReducer,
  salesUpdate:salesUpdateReducer,
  salesDelete:salesDeleteReducer,
  salesUpdateBilling:salesUpdateBillingReducer,
  salesRecentList:salesRecentListReducer





  
});







const middleware = [thunk];

const store = createStore(
  reducer,
  
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
