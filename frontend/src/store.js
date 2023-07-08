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
  userUpdateRoleReducer,
} from "./reducers/userReducers";

import {createTaskReducer, taskDeleteReducer, tasksBinReducer, tasksDetailsReducer, tasksListInBinReducer, tasksListReducer, tasksListReducer2, tasksUnBinReducer, tasksUpdateReducer, tasksUpdateStageReducer, tasksUpdateStatusReducer, totalTasksReducerCount} from './reducers/tasksReducers'
import { createStoreItemReducer, storeItemDeleteReducer, storeItemDetailsReducer, storeItemListReducer, storeItemUpdateReducer } from "./reducers/storeReducers";
import { createIncomeItemReducer, incomeItemDeleteReducer, incomeItemDetailsReducer, incomeItemListReducer, incomeItemUpdateReducer, totalTasksIncomeReducerCount } from "./reducers/incomeReducers";
import { blanceReducerCount, createExpenseItemReducer, expenseItemDeleteReducer, expenseItemDetailsReducer, expenseItemListReducer, expenseItemUpdateReducer } from "./reducers/expenseReducers";
import { createCustomerReducer, customerDeleteReducer, customerDetailsReducer, customerUpdateReducer, customersListReducer, myTasksListReducer, totalCustomerReducerCount } from "./reducers/customerReducer";
import { createSalesReducer, salesDeleteReducer, salesDetailsReducer, salesListReducer, salesRecentListReducer, salesUpdateBillingReducer, salesUpdateReducer } from "./reducers/salesReducers";
import { accountDeleteReducer, accountDetailsReducer, accountUpdateReducer, accountsListReducer, createAccountReducer } from "./reducers/accountReducers";
import { createSubAccountReducer, subAccountDeleteReducer, subAccountDetailsReducer, subAccountUpdateReducer, subAccountsListReducer } from "./reducers/subaccountReducers";
import { createTransactionReducer, transactionDeleteReducer, transactionDetailsReducer, transactionUpdateReducer, transactionsListReducer } from "./reducers/transactionReducers";
import { eventsListReducer } from "./reducers/eventReducers";


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
  userUpdateRole:userUpdateRoleReducer,


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
  myTasksList:myTasksListReducer,
  tasksUpdateStatus:tasksUpdateStatusReducer,


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
  salesRecentList:salesRecentListReducer,



  createAccount:createAccountReducer,
  accountsList:accountsListReducer,
  accountDetails:accountDetailsReducer,
  accountUpdate:accountUpdateReducer,
  accountDelete:accountDeleteReducer,



  createSubAccount:createSubAccountReducer,
  subaccountsList:subAccountsListReducer,
  subaccountDetails:subAccountDetailsReducer,
  subaccountUpdate:subAccountUpdateReducer,
  subaccountDelete:subAccountDeleteReducer,



  createTransaction:createTransactionReducer,
  transactionsList:transactionsListReducer,
  transactionDetails:transactionDetailsReducer,
  transactionUpdate:transactionUpdateReducer,
  transactionDelete:transactionDeleteReducer,



  eventsList:eventsListReducer










  
});







const middleware = [thunk];

const store = createStore(
  reducer,
  
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
