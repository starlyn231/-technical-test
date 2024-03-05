/* eslint-disable */
import './styles/credit-card.css';
import Monobank from '../../assets/Monobank.jpg';
import { Button, Grid } from '@mui/material';
import TextField from '../../components/text-field/text-field';
import { useFormik } from 'formik';
import { FormSchema, TCreditCardFormData, initialValues } from './contansts';
import { useState } from 'react';
import { ButtonContainer, StyledButtonOutlined } from './styles/Styles';
const CrediCardView = () => {
    const [formInitialState, setFormInitialState] =
        useState<TCreditCardFormData>(initialValues);

    const formik = useFormik({
        initialValues: formInitialState,
        validationSchema: FormSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            handlePayment(values);
        },
    });

    const handlePayment = async (formData: TCreditCardFormData) => {
        console.log(formData);
    };
    return (
        <div className="wrapper" id="app">
            <div className="card-form">
                <div className="card-list">
                    <div className="card-item">
                        <div className="card-item__side -front">
                            <img src={Monobank} alt="Tarjeta de Crédito" />
                        </div>
                    </div>
                </div>

                {/* Aquí van los campos del formulario */}
                <div className="card-form__inner">
                    {/* Campos de entrada */}
                    <div className="card-input">
                        <Grid
                            alignItems="center"
                            container
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
                                        formik.touched.creditCard && Boolean(formik.errors.creditCard)
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
                                    Agregar Tarjeta
                                </StyledButtonOutlined>
                            </ButtonContainer>
                            <ButtonContainer>
                                <StyledButtonOutlined variant="outlined">
                                    Cancelar
                                </StyledButtonOutlined>
                            </ButtonContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrediCardView;
