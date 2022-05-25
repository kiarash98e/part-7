import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { ITask } from '../../data/data';
import moment from 'jalali-moment';
import { IconButton } from '@material-ui/core';
import { IoTrashOutline, IoCreateOutline } from 'react-icons/io5'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: ITask[], comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [ITask, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof ITask;
  label: string;
  numeric: boolean;
  type?: 'string' | 'boolean' | 'numeric' | 'date' | 'datetime' | 'time' | 'currency'

  dateSetting?: { locale?: string; format?: string };

}


const headCells: HeadCell[] = [
  {
    id: 'task',
    numeric: false,
    disablePadding: true,
    label: 'Task name',
    type: 'string'
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    type: "string"
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Priority',
    type: "string"
  },
  {
    id: 'deadline',
    numeric: false,
    disablePadding: false,
    label: 'Deadline',
    dateSetting: { locale: "fa", format: "YYYY/MM/DD" }
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ITask) => void;
  order: Order;
  orderBy: string;

}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof ITask) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}



export default function EnhancedTable(data: any) {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ITask>('task');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ITask,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };





  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };




  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.data?.length) : 0;






  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 4, pt: 5, px: 3, backgroundColor: "#333" }}>
        <TableContainer className='bg-white pl-2'>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            className="p-2 pt-4"

          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody

            >
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(data?.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {

                  const convertedDeadline = moment(row.deadline)
                    .locale("fa")
                    .format("YYYY/MM/DD");
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >

                      <TableCell
                        component="th"

                        scope="row"
                        className='p-2'
                      >
                        {row.task}
                      </TableCell>
                      <TableCell
                        className='p-2' align="justify">{row.status}</TableCell>
                      <TableCell
                        className='p-2' align="justify">{row.priority}</TableCell>
                      <TableCell
                        className='p-2' align="justify">{convertedDeadline}</TableCell>
                      <TableCell
                        className='p-2' align="justify">{<>
                          <IconButton onClick={
                            () => {
                              data?.setViwe("delete")
                              data?.setdeleteItem(row)
                              data?.openDelete()
                            }
                          }>
                            <IoTrashOutline />
                          </IconButton>

                        </>} {
                          <>
                            <IconButton onClick={() => {
                                 data?.setViwe("edit")
                                 data?.setdeleteItem(row)
                                 data?.openDelete()
                            }}>
                              <IoCreateOutline />
                            </IconButton>
                          </>
                        }</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (33) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className='bg-white flex flex-col'
          rowsPerPageOptions={[5, 10, 25]}

          component="div"
          count={data?.data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
