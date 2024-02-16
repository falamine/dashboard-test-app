
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
        <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
            <li className="page-item">
                <button className="page-link" onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                    ...prev,
                    currentPage: 0
                }))} tabIndex={-1}>First Page</button>
            </li>
            <li className="page-item"><button className="page-link" disabled={props.dataParams.currentPage <=0} onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                ...prev,
                currentPage: prev.currentPage - 1
            }))}>Previous Page</button></li>

            <li><a className="page-link" >Page{" "}{props.dataParams.currentPage + 1}{" of "}{props.pageCount}</a></li>

            <li className="page-item" ><button className="page-link" disabled={props.dataParams.currentPage == props.pageCount - 1} onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                ...prev,
                currentPage: prev.currentPage + 1
            }))}>Next Page</button></li>
            <li className="page-item"><a className="page-link" href="#"  onClick={_ => props.setDataParams((prev: DataTableParams) => ({
                ...prev,
                currentPage: props.pageCount - 1
            }))}>Last Page</a></li>

        </ul>
    </nav>
    )
}
export default Pagination