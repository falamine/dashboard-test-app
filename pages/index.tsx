import {NextPage} from "next";
import {useEffect, useState} from "react";
import axios from "axios";
import {headers} from "next/headers";
import {Router, useRouter} from "next/router";
import Pagination, {getDefaultDataParams} from "@/components/Pagination";


interface Transaction {
    id: string,
    sender: { name: string, account: string },
    receiver: { name: string, account: string },
    amount_with_currency: string,
    amount: number,
    amount_in_base_currency: number,
    currency: string,
    cause: string,
    sender_caption: string,
    receiver_caption: string,
    created_at_time: number
}

interface Transactions {
    data: Transaction[],
    lastPage: number
}

export interface DataTableParams {
    currentPage: number
    itemsPerPage: number
}

const Home: NextPage = () => {
    const [transactions, setTransactions] = useState({data: [], lastPage: 0} as Transactions);
    const [error, setError] = useState(false);
    const [searchBy, setSearchBy] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const [dataParams, setDataParams] = useState(getDefaultDataParams())
    const [pageCount, setPageCount] = useState(1);
    const router = useRouter();

    const search = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/search', JSON.stringify({[searchBy]: searchParam}), {
                headers: { "Content-Type": "application/json", accept: "*/*" },
            });

            if (response?.data?.length == 0) {
                setError(true);
            } else setTransactions(response.data);
        }catch (e) {
            
        }
       
    }
    const fetched = async () => {
        try {
            const res = await axios.get('/api/get-transactions', {params: {'p': dataParams.currentPage}});
            setPageCount(res?.data?.lastPage)
            setTransactions(res.data)

        } catch (e) {
            
        }
    }

    useEffect(() => {
        fetched();
    }, [dataParams]);

    return(
        <div className='container-md m-5 p-5'>
            <div className='row mb-3'>
                <form className='row' onSubmit={search}>
                    <div className='col-4'>
                        <select className='form-select' onChange={event => setSearchBy(event.target.value)} required defaultValue={' '}>
                            <option value='' disabled>Search by</option>
                            <option value='id'>Transaction ID</option>
                            <option value='amount'>Amount</option>
                            <option value='currency'>Currency</option>
                            <option value='sender'>Sender</option>
                            <option value='receiver'>Receiver</option>
                        </select>
                    </div>
                    <div className='col-6'>
                        <input className='form-control' type='text' placeholder='search field'
                               onChange={event => setSearchParam(event.target.value)} required/>
                    </div>
                    <div className='col-2'>
                        <button type='submit' className='btn btn-primary'>Search</button>
                    </div>
                </form>
            </div>

            {!error &&
                <>
                    <div className='list-group mb-2'>{transactions?.data?.map(tr =>
                        <div className='list-group-item' key={tr.id}>
                            <div className="d-flex w-100 justify-content-between">
                                <h6 className="mb-1">{tr.id}</h6>
                                <small>{tr.created_at_time}</small>
                            </div>
                            <div className="d-flex w-100 justify-content-between">
                                <div>
                                    <p>{tr.sender.name}</p>
                                    <p>{tr.receiver.name}</p>
                                </div>
                                <small>{tr.amount_with_currency}</small>
                            </div>
                            <small>{tr.cause}</small>
                        </div>
                    )}</div>

                    <Pagination dataParams={dataParams} setDataParams={setDataParams} pageCount={pageCount}/>
                </>
}
            {error && <>
                <button className=' btn btn-secondary' onClick={router.reload}>Back</button>
                <p color='red'>No Data Found</p></>}
        </div>


    )
}


export default Home;