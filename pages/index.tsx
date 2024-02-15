import {NextPage} from "next";
import {useEffect, useState} from "react";
import axios from "axios";
import {headers} from "next/headers";
import {Router, useRouter} from "next/router";


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
    data: Transaction[]
}
const Home: NextPage = () => {
    const [transactions, setTransactions] = useState({data: []} as Transactions);
    const [error, setError] = useState(false);
    const [searchBy, setSearchBy] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const router = useRouter();

    const search = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const response = await axios.post('/api/search', JSON.stringify({[searchBy]: searchParam}), {
            headers: { "Content-Type": "application/json", accept: "*/*" },
        });

        if (response?.data?.length == 0) {
            setError(true);
        } else setTransactions(response.data);
    }
    const fetched = async () => {
        const res = await axios.get('/api/get-transactions');
        setTransactions(res.data)
    }


    useEffect(() => {
        fetched();
    }, []);
    return(
        <div className='container-md m-5 p-5'>
            <div className='row mb-3'>
                <form className='row' onSubmit={search}>
                    <div className='col-4'>
                        <select className='form-select' onChange={event => setSearchBy(event.target.value)} required>
                            <option value='' disabled selected>Search by</option>
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
                    <div className='list-group mb-2'>{transactions?.data?.map(tr => <div className='list-group-item'
                                                                                         key={tr.id}>
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
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>
                </>
}
            {error && <>
                <button className=' btn btn-secondary' onClick={router.reload}>Back</button>
                <p color='red'>No Data Found</p></>}
        </div>


    )
}


export default Home;