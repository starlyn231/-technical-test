import { styled } from '@mui/system';
import Button, { ButtonProps } from '@mui/material/Button';

interface StyledButtonProps extends ButtonProps {
    colorletter?: 'white' | 'black';
    bg?: 'blue' | 'gray';
}
export const StyledButtonOutlined = styled(Button)<StyledButtonProps>(props => ({
    minHeight: '28px',
    width: '100%',
    color: props.colorletter == 'white' ? ' white' : ' black',
    background: props.bg == 'blue' ? ' blue' : ' gray',
    borderRadius: '40px',
    marginRight: '17px',
    '@media (min-width:320px)': {
        fontSize: '12px',
    },
    '@media (min-width:768px)': {
        fontSize: '13.5px',
    },
    '@media (min-width:1200px)': {
        fontSize: '15px',
    },
    '&:hover,&:focus,&:active': {
        color: 'white',

    }
}));

export const ButtonContainer = styled('div')({

    marginTop: '20px ',
    marginRight: '7px'



});