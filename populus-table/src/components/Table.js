import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import moment from "moment";
import { SearchBar } from "./SearchBar";

export default function Table({ policies }) {

  const headers = [
    { accessor: "name", Header: "Name" },
    { accessor: "start_date", Header: "Start Date", Cell: ({value}) => {
        if(value){
            return moment(value * 1000).local().format('MM/DD/YYYY')
        }else{
            return ""
        }
    }}
  ];

  const columns = useMemo(() => headers, []);
  const data = useMemo(() => policies, []);

  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state, 
    setGlobalFilter
  } = tableInstance;

  const {globalFilter} = state


  return (
      <>
      <SearchBar search={globalFilter} setSearch={setGlobalFilter}/>
    <table {...getTableProps()} className='table-container'>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((col) => (
              <th
                {...col.getHeaderProps(col.getSortByToggleProps())}
                className="header"
              >
                {col.render("Header")}
                <span>
                  {col.isSorted ? (
                    col.isSortedDesc ? (
                      <AiOutlineArrowDown />
                    ) : (
                      <AiOutlineArrowUp />
                    )
                  ) : (
                    ""
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()} className='table-body'>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}
