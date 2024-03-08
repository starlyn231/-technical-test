import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FunctionComponent } from 'react';

function maskCreditCard(value: any) {
    if (value.length >= 6) {
        return value.slice(0, 2) + '*'.repeat(value.length - 6) + value.slice(-4);
    } else {
        return value;
    }
}

export default function BasicTable({ rows, columns }: PropTypes) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                backgroundColor: 'rgb(240, 240, 240)',
                padding: '20px',
                borderTop: '2px solid beige',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Información de los clientes</h2>
            <TableContainer
                component={Paper}
                sx={{
                    width: '80%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.7)',
                    borderRadius: '12px',
                    padding: '20px',
                }}
            >
                <Table sx={{ minWidth: 350 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {columns.map((item) => (
                                <TableCell align="left" key={item.accesor}>
                                    {item.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {columns.map((column: any) => (
                                    <TableCell align="left" key={`${column.accesor}-${row.id}`}>
                                        {/* Aplicar la función maskCreditCard al número de tarjeta de crédito */}
                                        {column.accesor === 'cardNumber'
                                            ? maskCreditCard(row[column.accesor])
                                            : row[column.accesor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

interface PropTypes {
    id: string;
    dataLoading?: boolean;
    columns: {
        accesor: string;
        title: string;
    }[];
    rows: RowItem[];
}
interface RowItem {
    [key: string]:
    | string
    | number
    | JSX.Element
    | React.ReactElement
    | undefined
    | null
    | any;
    id: number | string;
    customTitle?: string;
    imageURL?: string;
}
