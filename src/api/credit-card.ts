import { api } from '../services/api-service';
import { useQuery } from '@tanstack/react-query';

const getCreditCartList = () =>
    api.get(`/creditCard`).then(({ data }: ICreditCardListResponse) => data);

const creditCardList = () => {
    const { data, error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['getCreditCartList'],
        queryFn: () => getCreditCartList(),
    });

    // Accede al queryClient en el custom hook
    return {
        isLoading,
        isFetching,
        error,
        data,
        refetch,
    };
};
export const addNewCreditCard = (data: IAddNewCreditCardServiceProps) =>
    api
        .post(`add-creditCard/`, data)
        .then(({ data: responseData }: any) => responseData);

export interface ICreditCardListResponse {
    data: {
        succes: boolean;
        _id: string;
        cardholderName: string;
        expirationDate: string;
        cardNumber: string;
        cvv: string;
        __v: number;
    }[];
}
export interface IAddNewCreditCardServiceProps {
    cardNumber: string;
    cvv: string;
    expDate: string;
    name: string;
}

export default creditCardList;
