import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { useTable, useGlobalFilter } from "react-table";

export default function Home(props) {
  const [products, setProducts] = useState(props.products);

  const columns = [
    {
      Header: "Product Id",
      accessor: "id",
    },
    {
      Header: "Name",
      accessor: "title",
    },
  ];

  // Memoize
  const tableColumns = useMemo(() => columns, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns: tableColumns, data: products }, useGlobalFilter);

  const { globalFilter } = state;

  return (
    <div className={styles.main}>
      <div className={styles.pageHeader}>
        <h2>React Table Demo</h2>
      </div>
      <div className={styles.pageBody}>
        <h3>Details of users...</h3>
      </div>
      <div className={styles.searchStyles}>
        <input
          type="text"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      <div className={styles.tableStyles}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetch(`https://dummyjson.com/products?skip=0&limit=10`);
  const formattedData = await data.json();
  return {
    props: {
      products: formattedData.products,
    },
  };
}
