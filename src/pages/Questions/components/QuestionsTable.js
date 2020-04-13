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

        //const count = preGlobalFilteredRows.length

        return (
            <span>
                Procurar: {' '}
                <input
                    value={globalFilter || ''}
                    onChange={e => {
                        setGlobalFilter(e.target.value) // Set undefined to remove the filter entirely
                    }}
                    placeholder={`Procure aqui as perguntas...`}
                    style={{
                        paddingLeft: '2px',
                        fontSize: '0.9rem',
                        border: '0',
                        width: '50%'
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

    function Table({ columns, data, selectAddTab }) {

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
            footerGroups,
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
                columns, data, initialState: { pageIndex: 0, pageSize: 10 }, filterTypes,
            },
            useGlobalFilter, useSortBy, usePagination)


        return (
            <div className='card'>
                <div className='card-body table-responsive p-0'>
                    <table {...getTableProps()} className='table table-hover projects'>
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
                                    colSpan={columns.length - 2}
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
                                <th>{' '}</th>
                                <th>
                                    <div className="project-actions text-right">
                                        <button className="btn primary-color text-color btn-sm" title='Incluir Nova Pergunta' onClick={() => selectAddTab()} href="/#/" type='button'>
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
                        <tfoot>
                            {footerGroups.map(group => (
                                <tr {...group.getFooterGroupProps()}>
                                    {group.headers.map(column => (
                                        <td {...column.getFooterProps()} style={{ borderTop: '2px solid #dee2e6', borderBottom: '2px solid #dee2e6', paddingLeft: 20, fontWeight: 'bold' }} >{column.render('Footer')}</td>
                                    ))}
                                </tr>
                            ))}
                        </tfoot>


                    </table>
                    {/* Pagination UI */}
                    <div className="" style={{ marginRight: 23, marginTop: 15 }}>
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
                                    {[10, 20, 30, 50, 100].map(pageSize => (
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

        <Table columns={props.columns} data={props.questions} selectAddTab={props.selectAddTab} />
    )
}