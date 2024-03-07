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
            .required('Este campo es requerido')
            .matches(/^[a-zA-ZáéíóúÁÉÍÓÚ\s]+$/, 'El nombre solo puede contener letras y espacios')
            .max(20, 'Debe de contener máximo 20 caracteres y numeros'),
        creditCard: yup
            .string()
            .required('Este campo es requerido')
            .matches(/^\d{16}$/, 'El número de tarjeta debe de tener 16 dígitos'),
        expDate: yup
            .string()
            .required('Este campo es requerido')
            .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'El formato debe ser mm/yy')
            .test(
                'is-valid-date',
                'La fecha de vencimiento debe ser válida',
                value => {
                    if (!value) return false;
                    const [month, year] = value.split('/');
                    const expiryYear = parseInt(year, 10);
                    const expiryMonth = parseInt(month, 10);
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