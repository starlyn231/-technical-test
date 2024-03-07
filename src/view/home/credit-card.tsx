/* eslint-disable */
import './styles/credit-card.css';

import { Grid, Icon, IconButton, Typography } from '@mui/material';
import TextField from '../../components/text-field/text-field';
import { FormikHelpers, useFormik } from 'formik';
import columns, {
    FormSchema,
    TCreditCardFormData,
    initialValues,
} from './credit-card-constants';
import { useMemo, useState } from 'react';
import { ButtonContainer, StyledButtonOutlined } from './styles/Styles';
import CreditCard from '../../components/card/card-creditcard';
import BasicTable from '../../components/table/table';
import creditCardList, { addNewCreditCard } from '../../api/credit-card';
import { Toast } from '../../components/sweet-alert';
import LoadingScreen from '../../components/loading-screen';

const CrediCardView = () => {
    const [formInitialState, setFormInitialState] =
        useState<TCreditCardFormData>(initialValues);
    const [creditCards, setCreditCards] = useState([]);
    const [mutationIsLoading, setMutationIsLoading] = useState<boolean>(false);
    const { data, error, isLoading, isFetching, refetch } = creditCardList();
    console.log(data);
    console.log(columns)
    const formik = useFormik({
        initialValues: formInitialState,
        validationSchema: FormSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            handlePayment(values, actions);
        },
    });

    const handlePayment = async (
        formData: TCreditCardFormData,
        actions: FormikHelpers<TCreditCardFormData>
    ) => {
        // const response = await addNewGuestService({

        try {
            setMutationIsLoading(true);
            const response = await addNewCreditCard({
                name: formData.name,
                expDate: formData.expDate,
                cardNumber: formData.creditCard,
                cvv: formData.cvv,
            });

            if (response) {
                await Toast.fire({
                    icon: 'success',
                    title: 'Tarjeta agregado correctamente.',
                });
            }
            await refetch();
            setMutationIsLoading(false);
            actions.resetForm();
        } catch (error) {
            setMutationIsLoading(false);
            Toast.fire({
                icon: 'error',
                title: 'Ha ocurrido un error inesperado.',
            });
            console.error('Error al crear la tarjeta de crédito:', error);
        }
    };


    const dataRows = useMemo(
        () =>
            data?.data.map((item: any) => ({
                /* prepare data for table */

                name: item.cardholderName,

                expirationDate: item.expirationDate,
                cardNumber: item.cardNumber,
                imageURL: 'https://www.quanzhanketang.com/w3css/img_avatar3.png',
                /*   delete: (
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      <IconButton >
                          <Icon fontSize="medium" color="error">
                              delete
                          </Icon>
                      </IconButton>
                  ),
                  edit: (
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      <IconButton >
                          <Icon fontSize="medium" color="primary">
                              settings
                          </Icon>
                      </IconButton>
                  ), */
            })),

        [data],
    );

    console.log(dataRows)
    if (isLoading || typeof dataRows === 'undefined') return <LoadingScreen />;
    if (error) return <Typography variant="h1">Ha ocurrido un error</Typography>;
    return (
        <>
            <div className="wrapper" id="app">
                <div className="card-form">
                    <CreditCard
                        name={formik.values.name}
                        cardNumber={formik.values.creditCard}
                        date={formik.values.expDate}
                    />
                    {/* Aquí van los campos del formulario */}
                    <div className="card-form__inner">
                        {/* Campos de entrada */}
                        <div className="card-input">
                            <Grid
                                alignItems="center"
                                container
                                sx={{ marginBottom: '25px' }}
                                spacing={{ xs: 1, md: 2 }}
                                columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
                            >
                                <Grid item xs={12} sm={6} md={6} lg={8}>
                                    <TextField
                                        title="Número de Tarjeta"
                                        id="creditCard"
                                        mask="9999-9999-9999-9999"
                                        unMaskedValue
                                        value={formik.values.creditCard}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.creditCard &&
                                            Boolean(formik.errors.creditCard)
                                        }
                                        helperText={
                                            formik.touched.creditCard && formik.errors.creditCard
                                        }
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={8}>
                                    <TextField
                                        title="Fecha Vencimiento"
                                        id="expDate"
                                        mask="99/99"
                                        unMaskedValue={true}
                                        value={formik.values.expDate}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={
                                            formik.touched.expDate && Boolean(formik.errors.expDate)
                                        }
                                        helperText={formik.touched.expDate && formik.errors.expDate}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={8}>
                                    <TextField
                                        title="Nombre Titular"
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={8}>
                                    <TextField
                                        title="CVV"
                                        id="cvv"
                                        unMaskedValue
                                        value={formik.values.cvv}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                                        helperText={formik.touched.cvv && formik.errors.cvv}
                                        required
                                    />
                                </Grid>
                            </Grid>

                            <div style={{ display: 'flex' }}>
                                <ButtonContainer>
                                    <StyledButtonOutlined
                                        onClick={formik.handleSubmit}
                                        variant="container"
                                        colorletter="white"
                                        bg="blue"
                                    >
                                        {mutationIsLoading ? 'Cargando...' : 'Agregar tarjeta'}
                                    </StyledButtonOutlined>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <StyledButtonOutlined
                                        variant="outlined"
                                        onClick={() => formik.resetForm()}
                                    >
                                        Cancelar
                                    </StyledButtonOutlined>
                                </ButtonContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BasicTable rows={dataRows} columns={columns} />
        </>
    );
};

export default CrediCardView;
