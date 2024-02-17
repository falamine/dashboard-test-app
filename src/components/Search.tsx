import axios from "axios";
import {useState} from "react";

interface Props {
    setTransactions: any,
    setError: any
}
const Search = (props: Props) => {

    const [searchBy, setSearchBy] = useState('');
    const [searchParam, setSearchParam] = useState('');
    const search = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/search', JSON.stringify({[searchBy]: searchParam}), {
                headers: { "Content-Type": "application/json", accept: "*/*" },
            });

            if (response?.data?.length == 0) {
                props.setError(true);
            } else props.setTransactions(response.data);
        }catch (e) {

        }

    }
    return (
        <form className='w-full' onSubmit={search}>
            <div className='flex flex-wrap gap-2 align-middle'>
                <div>
                    <select
                        className='block  w-full bg-gray-100  border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 '
                        onChange={event => setSearchBy(event.target.value)} required
                        defaultValue={'searchBy'}>
                        <option value='searchBy' disabled>Search by</option>
                        <option value='id'>Transaction ID</option>
                        <option value='amount'>Amount</option>
                        <option value='currency'>Currency</option>
                        <option value='sender'>Sender</option>
                        <option value='receiver'>Receiver</option>
                    </select>
                </div>
                <div className='grow'>
                    <input
                        className='appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"'
                        type='text' placeholder='search field'
                        onChange={event => setSearchParam(event.target.value)} required/>
                </div>
                <div className=''>
                    <button type='submit'
                            className='bg-gray-500 hover:bg-gray-900 text-white font-bold py-3 px-4 rounded'>Search
                    </button>
                </div>

            </div>

        </form>
    )
}
export default Search;