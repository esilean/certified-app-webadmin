import React from 'react'
import matchSorter from 'match-sorter'

import {
    useTable,
    useGlobalFilter,
    useSortBy,
    usePagination,
} from 'react-table'

export default function QuestionsTable(props) {

    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
        const count = preGlobalFilteredRows.length

        return (
            <span>
                Procurar: {' '}
                <input
                    value={globalFilter || ''}
                    onChange={e => {
                        setGlobalFilter(e.target.value) // Set undefined to remove the filter entirely
                    }}
                    placeholder={` ${count} perguntas...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
            </span>
        )
    }

    function fuzzyTextFilterFn(rows, id, filterValue) {
        return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
    }

    // Let the table remove the filter if the string is empty
    fuzzyTextFilterFn.autoRemove = val => !val

    function Table({ columns, data, showEditModal }) {

        const filterTypes = React.useMemo(
            () => ({
                // Add a new fuzzyTextFilterFn filter type.
                fuzzyText: fuzzyTextFilterFn,

                text: (rows, id, filterValue) => {
                    return rows.filter(row => {
                        const rowValue = row.values[id]
                        return rowValue !== undefined
                            ? String(rowValue)
                                .toLowerCase()
                                .startsWith(String(filterValue).toLowerCase())
                            : true
                    })
                },
            }),
            []
        )


        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,

            canPreviousPage,
            canNextPage,
            pageOptions,
            pageCount,
            gotoPage,
            nextPage,
            previousPage,
            setPageSize,


            state: { globalFilter, pageSize, pageIndex },
            preGlobalFilteredRows,
            setGlobalFilter,
        } = useTable(
            {
                columns, data, initialState: { pageIndex: 0, pageSize: 15 }, filterTypes,
            },
            useGlobalFilter, useSortBy, usePagination)


        return (
            <div className='card'>
                <div className='card-body p-0'>
                    <table {...getTableProps()} className='table projects'>
                        <thead>
                            {
                                headerGroups.map(headerGroup => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <div className="float-right">
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <i className="fa fa-arrow-up"></i>
                                                            : <i className="fa fa-arrow-down"></i>
                                                        : ''}
                                                </div>

                                            </th>
                                        ))}
                                    </tr>
                                ))}

                            <tr>
                                <th
                                    colSpan={columns.length - 1}
                                    style={{
                                        textAlign: 'left',
                                    }}
                                >
                                    <GlobalFilter
                                        preGlobalFilteredRows={preGlobalFilteredRows}
                                        globalFilter={globalFilter}
                                        setGlobalFilter={setGlobalFilter}
                                    />
                                </th>
                                <th>
                                    <div className="project-actions text-right">
                                        <button className="btn primary-color text-color btn-sm" title='Incluir Nova Pergunta' onClick={() => showEditModal({ id: 0, title: '', description: '', value: 1, active: true }, true)} href="/#/" type='button'>
                                            <i className='fa fa-file'></i>
                                        </button>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {
                                page.map((row, i) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            })}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    {/* Pagination UI */}
                    <div className="" style={{ marginRight: '23px' }}>
                        <ul className="pagination justify-content-end">
                            <li className="paginate_button page-item previous">
                                <button className="page-link primary-color text-color" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                                    {'<<'}
                                </button>{' '}
                            </li>
                            <li className="paginate_button page-item">
                                <button className="page-link primary-color text-color" onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>{' '}
                            </li>
                            <li className="paginate_button page-item">
                                <button className="page-link primary-color text-color" onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>{' '}
                            </li>
                            <li className="paginate_button page-item">
                                <button className="page-link primary-color text-color" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                                    {'>>'}
                                </button>{' '}
                            </li>
                            <li className="paginate_button page-item">
                                <select className="custom-select custom-select-md form-control form-control-sm primary-color text-color"
                                    value={pageSize}
                                    onChange={e => {
                                        setPageSize(Number(e.target.value))
                                    }}
                                >
                                    {[15, 30, 45, 60, 100].map(pageSize => (
                                        <option key={pageSize} value={pageSize}>
                                            {pageSize}
                                        </option>
                                    ))}
                                </select>
                            </li>
                            <li className="paginate_button page-item">
                                <div className="page-link primary-color text-color">
                                    {' '}
                                    <strong>
                                        {pageIndex + 1} de {pageOptions.length}
                                    </strong>{' '}
                                </div>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>
        )
    }

    return (

        <Table columns={props.columns} data={props.questions} showEditModal={props.showEditModal} />
    )
}