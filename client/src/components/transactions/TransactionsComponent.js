import React, { useEffect, useState } from 'react'
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTransactionPageContext } from '../../pages/TransactionsPage';
import moment from 'moment';
const theme = createTheme({
  components: {
      MUIDataTableBodyRow: {
        styleOverrides:{
          root: {
              "&.MuiTableRow-hover": {
                  "&:hover": {
                    cursor:'pointer'
                  }
                }
          }
        }
      },
    }})
const TransactionsComponent = () => {
  const [data,setData]=useState([]);
  const {queryResult}=useTransactionPageContext();
  console.log(queryResult);
  const transactions = queryResult.data.data.transactions;
  useEffect(() => {
    var temp = [];
    transactions && transactions.map((item) => {
      temp.push([item.transaction_id && item.transaction_id,
    `${item.transactionOrders.customer.fname ? item.transactionOrders.customer.fname : ""} ${item.transactionOrders.customer.lname ? item.transactionOrders.customer.lname : ""}`,
    `${item.transactionOrders.itinerant.fname ? item.transactionOrders.itinerant.fname : ""} ${item.transactionOrders.itinerant.lname ? item.transactionOrders.itinerant.lname : ""}`,
      item.amount && " \u20B1" + item.amount,
      item.payment_method && item.payment_method ,
      item.status && item.status === true ? 'PAID' : 'PENDING',
      item.createdAt && moment(item.createdAt).format("MMMM DD, YYYY, h:mm A")
      ]);
    })
    setData(temp);
  }, [transactions])

    const columns = [
        {
        name:"ID",
        label:"ID",
        options: {
            filter:true,
            sort:true,
        }
        },
        {
            name:"Customer",
            label:"Customer",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Itinerant",
            label:"Itinerant",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Amount",
            label:"Amount",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Payment Method",
            label:"Payment Method",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name:"Status",
            label:"Status",
            options: {
                filter:true,
                sort:true,
            }
        },
        {
            name: "Date Added",
            label: "Date Added",
            options: {
              filter: true,
              sort: true
            }
        }
]
    const options = {
    selectableRowsHeader: false,
    selectableRows:'none',
    filter: true,
    filterType: 'dropdown'
    };
    return (
        <div>
            <ThemeProvider theme={theme}>
            <MUIDataTable
                title={"Transactions List"}
                data={data}
                columns={columns}
                options={options}
            />
            </ThemeProvider>
        </div>
        
        
    )
}

export default TransactionsComponent