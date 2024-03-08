import { styled } from '@mui/system';
import Button, { ButtonProps } from '@mui/material/Button';

interface StyledButtonProps extends ButtonProps {
    colorletter?: 'white' | 'black';
    bg?: 'blue' | 'gray';
}
export const StyledButtonOutlined = styled(Button)<StyledButtonProps>(props => ({

    width: '100%',
    color: props.colorletter == 'white' ? ' white' : ' black',
    background: props.bg == 'blue' ? ' #004481' : ' lightgray',
    borderRadius: '40px',
    marginRight: '17px',
    fontSize: '11px',
    '&:hover,&:focus,&:active': {
        background: props.bg === 'blue' ? '#00356c' : 'lightgray',

    }
}));

export const ButtonContainer = styled('div')({

    marginRight: '7px'

});