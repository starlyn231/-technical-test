import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name: string, creditCard: number, dateExp: string) {
    return { name, creditCard, dateExp };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262, 16.0),
    createData('Cupcake', 305, 3.7),
    createData('Gingerbread', 356, 16.0),
];

function maskCreditCard(value: any) {
    if (value.length >= 6) {
        return value.slice(0, 2) + '*'.repeat(value.length - 6) + value.slice(-4);
    } else {
        return value;
    }
}
const cardNumber = '3333333333355555';
const maskedCard = maskCreditCard(cardNumber);

export default function BasicTable() {
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
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre Titular</TableCell>
                            <TableCell align="right">Numero de tarjeta</TableCell>
                            <TableCell align="right">Fecha de vencimiento</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{maskedCard}</TableCell>

                                <TableCell align="right">{row.dateExp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
