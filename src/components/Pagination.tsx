
interface DataTableProps {
    setDataParams: any
    dataParams: DataTableParams
    pageCount: number
}

export interface DataTableParams {
    currentPage: number
}

export function getDefaultDataParams() : DataTableParams {
    return {
        currentPage: 0,
    }
}
const Pagination = (props: DataTableProps) => {
    return (

        <div className="flex flex-wrap gap-5 border border-gray-300 bg-gray-100 rounded w-fit place-self-end my-1">
            <div className="bg-transparent  hover:bg-gray-500 hover:text-white text-black py-3 px-2 ">
                <button className="" onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                    ...prev,
                    currentPage: 0
                }))} tabIndex={-1}>First Page
                </button>
            </div>
            <div className="bg-transparent  hover:bg-gray-500 hover:text-white text-black py-3 px-2">
                <button className="" disabled={props.dataParams.currentPage <= 0}
                        onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                            ...prev,
                            currentPage: prev.currentPage - 1
                        }))}><i className="bi bi-chevron-double-left"></i>
                </button>
            </div>
            <div className="bg-transparent text-black py-3 px-2">
                <text>Page{" "}{props.dataParams.currentPage + 1}{" of "}{props.pageCount}</text>
            </div>
            <div className="bg-transparent hover:bg-gray-500 hover:text-white text-black py-3 px-2">
                <button className="" disabled={props.dataParams.currentPage == props.pageCount - 1}
                        onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                            ...prev,
                            currentPage: prev.currentPage + 1
                        }))}><i className="bi bi-chevron-double-right"/>
                </button>
            </div>
            <div className="bg-transparent  hover:bg-gray-500 hover:text-white text-black py-3 px-2">
                <button className=""
                   onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                       ...prev,
                       currentPage: props.pageCount - 1
                   }))}>Last Page</button>
        </div>
        </div>
    )
}
export default Pagination