import {NextPage} from "next";
import {useEffect, useState} from "react";
import axios from "axios";


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
    const fetched = async (searchParam: string) => {
        const res = await axios.get('/api/get-transactions');
        setTransactions(res)
    }


    useEffect(() => {
        fetched('');
    }, []);
    return(
        <div className='container-md m-lg-5 p-lg-5'>
            <div>
                <input className='form-control' type='text' placeholder='search' onChange={event => fetched(event.target.value)}/>
            </div>
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
        </div>


    )
}


export default Home;