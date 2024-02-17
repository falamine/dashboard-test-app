import {NextPage} from "next";
import {useEffect, useState} from "react";
import axios from "axios";
import {Router, useRouter} from "next/router";
import Pagination, {getDefaultDataParams} from "@/components/Pagination";
import Search from "@/components/Search";


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

const Home: NextPage = () => {
    const [transactions, setTransactions] = useState({data: [], lastPage: 0} as Transactions);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [dataFetched, setDataFetched] = useState(false);
    const [dataParams, setDataParams] = useState(getDefaultDataParams())
    const [pageCount, setPageCount] = useState(1);
    const router = useRouter();

    const fetched = async () => {
        try {
            const res = await axios.get('/api/get-transactions', {params: {'p': dataParams.currentPage}});
            setPageCount(res?.data?.lastPage)
            setTransactions(res.data)
            setDataFetched(true)

        } catch (e) {
            setError(true)
            setErrorMsg('Error fetching data')
        }
    }

    useEffect(() => {
        fetched();
    }, [dataParams]);

    return(
        <div className="flex flex-col gap-2 p-10">
            <Search setTransactions={setTransactions} setError={setError}></Search>
            {error ? <div className="flex flex-col">
                    <span className="text-red-900 text-center">{errorMsg != ""? errorMsg : "No Data Found"}</span>
                    <span><button className="" onClick={router.reload}>Back</button></span>
                </div>
                : !dataFetched ? <div className="font-bold">Loading...</div>
                : <>
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
                            </div>
                        )}</div>

                        <Pagination dataParams={dataParams} setDataParams={setDataParams} pageCount={pageCount}/>
                    </>
                }
        </div>
)
}

export default Home;