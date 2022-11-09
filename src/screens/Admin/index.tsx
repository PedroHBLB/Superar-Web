import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";

import makeData from "../../utils/makeData";

// export function Admin() {
//   return <div></div>;
// }

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: any) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

interface Props {
  columns: any;
  data: any;
  updateMyData: any;
  skipPageReset: any;
}

function Table({ columns, data, updateMyData, skipPageReset }: any) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
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
    state: { pageIndex, pageSize },
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    } as any,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export function Admin() {
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Name",
  //       columns: [
  //         {
  //           Header: "First Name",
  //           accessor: "firstName",
  //         },
  //         {
  //           Header: "Last Name",
  //           accessor: "lastName",
  //         },
  //       ],
  //     },
  //     {
  //       Header: "Info",
  //       columns: [
  //         {
  //           Header: "Age",
  //           accessor: "age",
  //         },
  //         {
  //           Header: "Visits",
  //           accessor: "visits",
  //         },
  //         {
  //           Header: "Status",
  //           accessor: "status",
  //         },
  //         {
  //           Header: "Profile Progress",
  //           accessor: "progress",
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // );
  const columns = useMemo(
    () => [
      {
        Header: "Ranking Detalhado",
        columns: [
          {
            Header: "Ranking",
            accessor: "ranking",
          },
          {
            Header: "Colaborador",
            accessor: "colaborador",
          },
          {
            Header: "Unidade",
            accessor: "unidade",
          },
          {
            Header: "Resumo de Livros e Artigos",
            accessor: "resumoDeLivrosArtigos",
          },
          {
            Header: "Treinamentos, Palestras e Cursos",
            accessor: "treinamentosPalestrasCursos",
          },
          {
            Header: "Artigo",
            accessor: "artigo",
          },
          {
            Header: "Lições Aprendidas",
            accessor: "licoesAprendidas",
          },
          {
            Header: "Quiz",
            accessor: "quiz",
          },
          {
            Header: "Atividade Fisica",
            accessor: "atividadeFisica",
          },
          {
            Header: "Alimentação Saudavel",
            accessor: "alimentacaoSaudavel",
          },
          {
            Header: "Qualidade",
            accessor: "qualidade",
          },
          {
            Header: "Walk The Talk",
            accessor: "walkTheTalk",
          },
          {
            Header: "Responsabilidade Social Individual",
            accessor: "responsabilidadeSocialIndividual",
          },
          {
            Header: "TOTAL",
            accessor: "total",
          },
          {
            Header: "CARTEIRA",
            accessor: "carteira",
          },
        ],
      },
    ],
    []
  );

  const [data, setData] = useState(() => makeData(40));
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old: any) =>
      old.map((row: any, index: any) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData);

  return (
    <div>
      <Styles>
        <button onClick={resetData}>Reset Data</button>
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </Styles>
    </div>
  );
}
