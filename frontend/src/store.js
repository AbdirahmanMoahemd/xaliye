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

import {
  createTaskReducer,
  taskDeleteReducer,
  tasksBinReducer,
  tasksDetailsReducer,
  tasksListInBinReducer,
  tasksListReducer,
  tasksListReducer2,
  tasksUnBinReducer,
  tasksUpdateReducer,
  tasksUpdateStageReducer,
  tasksUpdateStatusReducer,
  totalTasksReducerCount,
} from "./reducers/tasksReducers";
import {
  createStoreItemReducer,
  storeItemDeleteReducer,
  storeItemDetailsReducer,
  storeItemListReducer,
  storeItemUpdateReducer,
} from "./reducers/storeReducers";
import {
  createStoreItemReducer2,
  storeItemDeleteReducer2,
  storeItemDetailsReducer2,
  storeItemListReducer2,
  storeItemUpdateReducer2,
} from "./reducers/store2Reducers";
import {
  createIncomeItemReducer,
  incomeItemDeleteReducer,
  incomeItemDetailsReducer,
  incomeItemListReducer,
  incomeItemUpdateReducer,
  totalTasksIncomeReducerCount,
} from "./reducers/incomeReducers";
import {
  blanceReducerCount,
  createExpenseItemReducer,
  expenseItemDeleteReducer,
  expenseItemDetailsReducer,
  expenseItemListReducer,
  expenseItemUpdateReducer,
} from "./reducers/expenseReducers";
import {
  createCustomerReducer,
  customerDeleteReducer,
  customerDetailsReducer,
  customerUpdateReducer,
  customersListReducer,
  myTasksListReducer,
  totalCustomerReducerCount,
} from "./reducers/customerReducer";
import {
  createSalesReducer,
  orderReducer,
  salesDeleteReducer,
  salesDetailsReducer,
  salesListReducer,
  salesRecentListReducer,
  salesUpdateBillingReducer,
  salesUpdateReducer,
} from "./reducers/salesReducers";

import {
  createSales2Reducer2,
  createSalesReducer2,
  orderReducer2,
  salesDeleteReducer2,
  salesDetailsReducer2,
  salesListReducer2,
  salesRecentListReducer2,
  salesUpdateBillingReducer2,
  salesUpdateReducer2,
  totalSalesReducerCount,
} from "./reducers/sales2Reducers";
import {
  accountDeleteReducer,
  accountDetailsReducer,
  accountUpdateReducer,
  accountsListReducer,
  createAccountReducer,
} from "./reducers/accountReducers";
import {
  createSubAccountReducer,
  subAccountDeleteReducer,
  subAccountDetailsReducer,
  subAccountUpdateReducer,
  subAccountsListReducer,
} from "./reducers/subaccountReducers";
import {
  createTransactionReducer,
  transactionDeleteReducer,
  transactionDetailsReducer,
  transactionUpdateReducer,
  transactionsListReducer,
} from "./reducers/transactionReducers";
import { eventsListReducer } from "./reducers/eventReducers";
import {
  createCustomerReducer2,
  customerDeleteReducer2,
  customerDetailsReducer2,
  customerUpdateReducer2,
  customersListReducer2,
  mySalesListReducer2,
  totalCustomerReducer2Count,
} from "./reducers/customer2Reducers";
import {
  accountDeleteReducer2,
  accountDetailsReducer2,
  accountUpdateReducer2,
  accountsListReducer2,
  createAccountReducer2,
} from "./reducers/account2Reducers";
import {
  createSubAccountReducer2,
  subAccountDeleteReducer2,
  subAccountDetailsReducer2,
  subAccountUpdateReducer2,
  subAccountsListReducer2,
} from "./reducers/subAccount2Reducers";
import {
  createTransactionReducer2,
  transactionDeleteReducer2,
  transactionDetailsReducer2,
  transactionUpdateReducer2,
  transactionsListReducer2,
} from "./reducers/transactions2Reducers";

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
  userUpdateRole: userUpdateRoleReducer,

  createTask: createTaskReducer,
  tasksList: tasksListReducer,
  tasksList2: tasksListReducer2,
  taskDelete: taskDeleteReducer,
  tasksUpdate: tasksUpdateReducer,
  tasksDetails: tasksDetailsReducer,
  tasksUpdateStage: tasksUpdateStageReducer,
  tasksBin: tasksBinReducer,
  tasksListInBin: tasksListInBinReducer,
  tasksUnBin: tasksUnBinReducer,
  totalTasks: totalTasksReducerCount,
  myTasksList: myTasksListReducer,
  tasksUpdateStatus: tasksUpdateStatusReducer,

  createStoreItem: createStoreItemReducer,
  storeItemList: storeItemListReducer,
  storeItemDelete: storeItemDeleteReducer,
  storeItemUpdate: storeItemUpdateReducer,
  storeItemDetails: storeItemDetailsReducer,

  createStoreItem2: createStoreItemReducer2,
  storeItemList2: storeItemListReducer2,
  storeItemDelete2: storeItemDeleteReducer2,
  storeItemUpdate2: storeItemUpdateReducer2,
  storeItemDetails2: storeItemDetailsReducer2,

  createIncomeItem: createIncomeItemReducer,
  incomeItemList: incomeItemListReducer,
  incomeItemDelete: incomeItemDeleteReducer,
  incomeItemUpdate: incomeItemUpdateReducer,
  incomeItemDetails: incomeItemDetailsReducer,
  totalTasksIncomeCount: totalTasksIncomeReducerCount,

  createExpenseItem: createExpenseItemReducer,
  expenseItemList: expenseItemListReducer,
  expenseItemDelete: expenseItemDeleteReducer,
  expenseItemUpdate: expenseItemUpdateReducer,
  expenseItemDetails: expenseItemDetailsReducer,

  blanceCount: blanceReducerCount,

  createCustomer: createCustomerReducer,
  customersList: customersListReducer,
  customerDetails: customerDetailsReducer,
  customerUpdate: customerUpdateReducer,
  customerDelete: customerDeleteReducer,
  totalCustomer: totalCustomerReducerCount,

  createCustomer2: createCustomerReducer2,
  customersList2: customersListReducer2,
  customerDetails2: customerDetailsReducer2,
  customerUpdate2: customerUpdateReducer2,
  customerDelete2: customerDeleteReducer2,
  totalCustomer2: totalCustomerReducer2Count,

  createSales: createSalesReducer,
  salesList: salesListReducer,
  salesDetails: salesDetailsReducer,
  salesUpdate: salesUpdateReducer,
  salesDelete: salesDeleteReducer,
  salesUpdateBilling: salesUpdateBillingReducer,
  salesRecentList: salesRecentListReducer,
  order: orderReducer,
  totalSales: totalSalesReducerCount,

  createSales2: createSalesReducer2,
  createSalesAndPrint:createSales2Reducer2,
  salesList2: salesListReducer2,
  salesDetails2: salesDetailsReducer2,
  salesUpdate2: salesUpdateReducer2,
  salesDelete2: salesDeleteReducer2,
  salesUpdateBilling2: salesUpdateBillingReducer2,
  salesRecentList2: salesRecentListReducer2,
  order2: orderReducer2,
  mySalesList: mySalesListReducer2,

  createAccount: createAccountReducer,
  accountsList: accountsListReducer,
  accountDetails: accountDetailsReducer,
  accountUpdate: accountUpdateReducer,
  accountDelete: accountDeleteReducer,

  createAccount2: createAccountReducer2,
  accountsList2: accountsListReducer2,
  accountDetails2: accountDetailsReducer2,
  accountUpdate2: accountUpdateReducer2,
  accountDelete2: accountDeleteReducer2,

  createSubAccount: createSubAccountReducer,
  subaccountsList: subAccountsListReducer,
  subaccountDetails: subAccountDetailsReducer,
  subaccountUpdate: subAccountUpdateReducer,
  subaccountDelete: subAccountDeleteReducer,

  createSubAccount2: createSubAccountReducer2,
  subaccountsList2: subAccountsListReducer2,
  subaccountDetails2: subAccountDetailsReducer2,
  subaccountUpdate2: subAccountUpdateReducer2,
  subaccountDelete2: subAccountDeleteReducer2,

  createTransaction: createTransactionReducer,
  transactionsList: transactionsListReducer,
  transactionDetails: transactionDetailsReducer,
  transactionUpdate: transactionUpdateReducer,
  transactionDelete: transactionDeleteReducer,

  createTransaction2: createTransactionReducer2,
  transactionsList2: transactionsListReducer2,
  transactionDetails2: transactionDetailsReducer2,
  transactionUpdate2: transactionUpdateReducer2,
  transactionDelete2: transactionDeleteReducer2,

  eventsList: eventsListReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,

  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
