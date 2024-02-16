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
        <div className="flex flex-col gap-2">

                    <form className='w-full' onSubmit={search}>
                        <div className='flex flex-wrap gap-2 align-middle'>
                            <div>
                                <select
                                    className='block appearance-none w-full  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                    onChange={event => setSearchBy(event.target.value)} required
                                    defaultValue={' '}>
                                    <option value='' disabled>Search by</option>
                                    <option value='id'>Transaction ID</option>
                                    <option value='amount'>Amount</option>
                                    <option value='currency'>Currency</option>
                                    <option value='sender'>Sender</option>
                                    <option value='receiver'>Receiver</option>
                                </select>
                            </div>
                            <div className='grow'>
                                <input
                                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"'
                                    type='text' placeholder='search field'
                                    onChange={event => setSearchParam(event.target.value)} required/>
                            </div>
                            <div className=''>
                                <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
                            </div>

                        </div>

                    </form>


            {!error &&
                <>
                    <div className="">{transactions?.data?.map(tr =>
                            <div className='w-100 bg-white border-bottom border-black my-1' key={tr.id}>
                                <div className="flex p-2">
                                    <div className="grow">
                                        <p className="font-bold text-lg">
                                            {tr.sender.name} <i className="bi bi-arrow-right"></i> {tr.receiver.name}
                                        </p>
                                        <div>
                                            <code className="p-1 rounded bg-red-100">
                                                {tr.id.substring(0, 8)}
                                                &nbsp;
                                                <button title="Copy Code"><i className="bi bi-copy"></i></button>
                                            </code>
                                        </div>
                                        {tr.cause
                                            ? <div>
                                                <i className="bi bi-info-circle"></i> {tr.cause}
                                            </div>
                                        : <></>}

                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-2xl text-gray-500">
                                            {tr.amount_with_currency}
                                        </div>
                                        <div>
                                            <span>
                                                <i className="bi bi-calendar-date text-gray-300"></i> {new Date(1000*tr.created_at_time).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{tr.id}</h6>

                                </div>
                                <div className="d-flex w-100 justify-content-between">
                                    <div>

                                    </div>

                                </div>
                                <small>{tr.cause}</small>*/}
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