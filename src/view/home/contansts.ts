import * as yup from 'yup';

const today = new Date();
const currentYear = today.getFullYear() % 100;

export const initialValues: TCreditCardFormData = {
    name: '',
    creditCard: '',
    expDate: ' ',
    cvv: '',
};
export const FormSchema = yup
    .object({
        name: yup
            .string()
            .required('El nombre del titular es requerido')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, 'El nombre solo puede contener letras y espacios')
            .max(20, 'Debe de contener máximo 20 caracteres y numeros'),
        creditCard: yup
            .string()
            .required('El número de tarjeta es requerido')
            .matches(/^\d{16}$/, 'El número de tarjeta debe contener exactamente 16 dígitos'),
        expDate: yup
            .string()
            .required('La fecha de vencimiento es requerida')
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'El formato de fecha de vencimiento debe ser mm/yy')
            .test(
                'is-valid-date',
                'La fecha de vencimiento debe ser válida',
                value => {
                    if (!value) return false;
                    const [month, year] = value.split('/');
                    console.log(month, 'year: ', year)
                    const expiryYear = parseInt(year, 10);
                    console.log('expiryYear0', expiryYear)
                    const expiryMonth = parseInt(month, 10);
                    console.log('expirymonth', expiryMonth)
                    return (
                        expiryYear >= currentYear &&
                        expiryYear <= currentYear + 5 &&
                        expiryMonth >= 1 &&
                        expiryMonth <= 12
                    );
                }
            ),
        cvv: yup.string().required('El CVV es requerido').matches(/^\d{3}$/, 'El CVV debe tener exactamente 3 dígitos'),

    })
    .required();
export type TCreditCardFormData = yup.InferType<typeof FormSchema>;