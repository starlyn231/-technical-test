
import './styles/credit-card.css';

import { Grid, Icon, IconButton, Typography } from '@mui/material';
import TextField from '../../components/text-field/text-field';
import { FormikHelpers, useFormik } from 'formik';
import columns, {
    FormSchema,
    TCreditCardFormData,
    initialValues,
} from './credit-card-constants';
import { useCallback, useMemo, useState } from 'react';
import { ButtonContainer, StyledButtonOutlined } from './styles/Styles';
import CreditCard from '../../components/card/card-creditcard';
import BasicTable from '../../components/table/table';
import creditCardList, {
    addNewCreditCard,
    deleteCreditCardService,
    updateCreditCardService,
} from '../../api/credit-card';
import { SweetAlert, Toast } from '../../components/sweet-alert';
import LoadingScreen from '../../components/loading-screen';

const CrediCardView = () => {
    const [formInitialState, setFormInitialState] =
        useState<TCreditCardFormData>(initialValues);
    const [mutationIsLoading, setMutationIsLoading] = useState<boolean>(false);
    const { data, error, isLoading, isFetching, refetch } = creditCardList();

    const formik = useFormik({
        initialValues: formInitialState,
        validationSchema: FormSchema,
        enableReinitialize: true,
        onSubmit: (values, actions) => {
            console.log(values);
            if (!values.id) {
                handlePayment(values, actions);
            } else {
                updateFormData(values);
            }
        },
    });

    const handlePayment = async (
        formData: TCreditCardFormData,
        actions: FormikHelpers<TCreditCardFormData>
    ) => {
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
    console.log(formik.values);
    const updateFormData = (formData: TCreditCardFormData) => {
        (async () => {
            try {
                console.log(formData);
                const response = await updateCreditCardService({
                    _id: formData.id,
                    cardholderName: formData.name,
                    expirationDate: formData.expDate,
                    cardNumber: formData.creditCard,
                    cvv: formData.cvv,
                });

                if (response) {
                    await Toast.fire({
                        icon: 'success',
                        title: 'Registro Actualizado correctamente.',
                    });

                    await refetch();
                    formik.resetForm();
                } else {
                    await Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error inesperado.',
                    });
                }
                setMutationIsLoading(false);
            } catch (err) {
                setMutationIsLoading(false);
                await Toast.fire({
                    icon: 'error',
                    title: 'Error .',
                });
            }
        })().catch((err) => {
            // Manejar errores en la ejecución del IIFE (opcional)
            console.error('Error en IIFE:', err);
        });
    };
    const deleteItem = useCallback(
        async (id: string) => {
            try {
                const response = await deleteCreditCardService(id);
                await refetch();
                if (response.success) {
                    await Toast.fire({
                        icon: 'success',
                        title: 'Registro eliminado correctamente.',
                    });
                } else {
                    await Toast.fire({
                        icon: 'error',
                        title: 'Ha ocurrido un error inesperado.',
                    });
                }
            } catch (err) {
                console.log('Error');
            }
        },
        [refetch]
    );
    const handleOnEditClick = (_data: { _id: number | string }) => {
        const selectedRecord = data?.data.find(
            (selectedItem) => selectedItem._id === _data._id
        );
        console.log(' selectedRecord', selectedRecord);

        if (selectedRecord !== undefined) {
            const formikFieldMappings: TCreditCardFormData = {
                id: selectedRecord._id,
                name: selectedRecord.cardholderName,
                creditCard: selectedRecord.cardNumber,
                expDate: selectedRecord.expirationDate,
                cvv: selectedRecord.cvv,
            };

            formik.setValues(formikFieldMappings).then(
                () => { },
                () => { }
            );
        }
    };
    const handleOnDeleteClick = (_data: { _id: number | string }) => {
        (async () => {
            const selectedRecord = data?.data.find(
                (selectedItem) => selectedItem._id === _data._id
            );

            if (!selectedRecord) {
                console.log('Registro no encontrado');
                return;
            }
            const result = await SweetAlert.fire({
                icon: 'warning',
                title: '¿Está seguro que desea eliminar este registro',
                text: 'Una vez ejecutada esta acción no podrá deshacerla',
                showDenyButton: true,
                confirmButtonText: 'Confirmar',
                denyButtonText: 'Cancelar',
            });
            if (result.isConfirmed) {
                await deleteItem(selectedRecord?._id);
            }
        })().catch((err) => {
            // Manejar errores en la ejecución del IIFE (opcional)
            console.error('Error en IIFE:', err);
        });
    };
    const memoizedHandleOnEditClick = useCallback(handleOnEditClick, [
        data,
        formik,
    ]);
    const memoizedHandleOnDeleteClick = useCallback(handleOnDeleteClick, [
        data,
        deleteItem,
    ]);

    const dataRows = useMemo(
        () =>
            data?.data.map((item: any) => ({
                /* prepare data for table */
                name: item.cardholderName,
                expirationDate: item.expirationDate,
                cardNumber: item.cardNumber,
                delete: (
                    <IconButton onClick={() => memoizedHandleOnDeleteClick(item)}>
                        <Icon fontSize="medium" color="error">
                            delete
                        </Icon>
                    </IconButton>
                ),
                edit: (
                    <IconButton onClick={() => memoizedHandleOnEditClick(item)}>
                        <Icon fontSize="medium" color="primary">
                            settings
                        </Icon>
                    </IconButton>
                ),
            })),
        [data, memoizedHandleOnDeleteClick, memoizedHandleOnEditClick]
    );

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

                    <div className="card-form__inner">

                        <div className="card-input">
                            <Grid
                                alignItems="center"
                                container
                                sx={{ marginBottom: '30px' }}
                                spacing={{ xs: 1, md: 3 }}

                            >
                                <Grid item xs={12} sm={6} md={6} lg={6} >
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
                                <Grid item xs={12} sm={6} md={6} lg={6}>
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

                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <TextField
                                        title="Nombre Titular"
                                        maxLength={25}
                                        id="name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6} lg={6}>
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

                            <div style={{ display: 'flex', }}>
                                <ButtonContainer>
                                    <StyledButtonOutlined
                                        onClick={formik.handleSubmit}
                                        variant="container"
                                        colorletter="white"
                                        bg="blue"
                                    >
                                        {mutationIsLoading
                                            ? 'Cargando...'
                                            : `${formik.values.id ? 'Guardar' : 'Agregar'}`}
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
