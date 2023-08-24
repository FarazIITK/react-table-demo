import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";
import { useTable, useGlobalFilter, useFilters } from "react-table";
import FilterForm from "../components/filterForm";

export default function Home(props) {
  const [products, setProducts] = useState(props.products);

  const columns = [
    {
      Header: "Product Id",
      accessor: "id",
      Filter: FilterForm,
    },
    {
      Header: "Name",
      accessor: "title",
      Filter: FilterForm,
    },
    {
      Header: "Category",
      accessor: "category",
      Filter: FilterForm,
    },
    {
      Header: "Price",
      accessor: "price",
      Filter: FilterForm,
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
  } = useTable(
    { columns: tableColumns, data: products },
    useFilters,
    useGlobalFilter
  );

  const { globalFilter } = state;

  return (
    <div className={styles.main}>
      <div className={styles.pageHeader}>
        <h2>React Table Demo</h2>
      </div>
      <div className={styles.pageBody}>
        <h3>List of products...</h3>
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
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
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
