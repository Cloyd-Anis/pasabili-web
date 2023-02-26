import React,{useEffect, useContext} from 'react';
import PageLayout from './PageLayout';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Helmet } from 'react-helmet';
import useAxios,{ configure } from 'axios-hooks'
import { CircularProgress } from '@mui/material';
import TransactionsComponent from '../components/transactions/TransactionsComponent';

const defaultContext= {
  queryResult: {data:null,loading:false,error:null},
  refetch: () => {},
};
const TransactionPageContext = React.createContext(defaultContext);
export const useTransactionPageContext = () => useContext(TransactionPageContext);

const TransactionsPage = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if(!Cookies.get('admin_id')){
        navigate("/login");
      }
    },[])
    const [{ data, loading, error }, refetch] = useAxios({
      url: `${process.env.REACT_APP_BACKEND_URL}/admin/transactions`,
      method:'get' 
    });

    useEffect(() => {
      refetch();
    },[])

    return (
        <PageLayout headerTitle={"Transactions"}>
          <Helmet>
            <title>Pasabili | Transactions</title>
          </Helmet>
          {loading?(
            <div className='my-5'>
                <CircularProgress size={80} color="success"/>
            </div>
            ):(
              <TransactionPageContext.Provider value={{queryResult:{data,loading,error},refetch}}>
                  <TransactionsComponent />
              </TransactionPageContext.Provider>
            )}
        </PageLayout>
    )
}

export default TransactionsPage