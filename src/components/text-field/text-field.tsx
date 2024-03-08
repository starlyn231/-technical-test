/* eslint-disable */
//@ts-nocheck
import { FunctionComponent, memo, Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField as MuiTextField, Typography } from '@mui/material';
import CheckRender from '../check-render/check-render';
import InputMask from 'react-input-mask';
import { removeGuionFromString } from '../../utilities/stringUtil';
import { ErrorOutline } from '@mui/icons-material';

const TextField: FunctionComponent<PropTypes> = function ({
  title,
  required,
  disabled,
  multiline,
  id,
  placeholder,
  value,
  onBlur,
  onChange,
  onKeyDown,
  onClick,
  type,
  helperText,
  error,
  minRows,
  maxRows,
  maxLength,
  minLength,
  autoFocus,
  max,
  min,
  isLoading,
  endAdornment,
  startAdornment,
  size,
  mask,
  useMaskPresets,
  unMaskedValue,
}) {
  const removeTextFromInputMaskValue = (value: any) => {
    /*  let NewValue = value.replace(/[^0-9\.]+/g, '');
     return NewValue; */
    let NewValue = removeGuionFromString(value);
    return NewValue;
  };

  const maskPresets = {
    cvv: '999',
    expDate: '99/99',
    passport: '*',
    rnc: '9-99-99999-9',
    'solo numero': '999999999999999999999999999',
    mascaraRut: 'aa-aaaa-9999-99999',
  };
  const inputStyles = {
    '& .MuiInputBase-input': {
      width: '100%',
      fontSize: '17px',
      backgroundColor: 'transparent',
      padding: 1,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: '10px',
        minHeight: '40px',
        borderWidth: '1px',
      },
    },
    '&:hover fieldset': {},
    '&.Mui-focused fieldset': {
      borderColor: 'blue',
    },
  };

  return (
    <Fragment key={id}>
      <Typography variant="caption" fontWeight={'bold'} fontSize={'15px'}>
        {title}
        <CheckRender allowed={required}>
          <Typography variant="caption" color="error">
            &#160;*
          </Typography>
        </CheckRender>
      </Typography>
      {mask ? (
        <InputMask
          id={id}
          mask={useMaskPresets ? maskPresets[mask] : mask}
          maskChar={null}
          value={value}
          disabled={disabled}
          onBlur={
            unMaskedValue
              ? (e) => {
                onBlur &&
                  onBlur({
                    target: {
                      id: e.target.id,
                      value: removeTextFromInputMaskValue(e.target.value),
                    },
                  });
              }
              : onBlur
          }
          onChange={
            unMaskedValue
              ? (e) => {
                onChange({
                  target: {
                    id: e.target.id,
                    value: removeTextFromInputMaskValue(e.target.value),
                  },
                });
              }
              : onChange
          }
        >
          {(inputProps) => (
            <MuiTextField
              {...inputProps}
              disabled={disabled}
              sx={inputStyles}
              fullWidth
              variant="outlined"
              placeholder={placeholder}
              type={type}
              helperText={
                error ? (
                  <div
                    style={{
                      height: '2em',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ fontSize: '0.57rem' }}
                    >
                      {helperText}
                    </Typography>
                  </div>
                ) : (
                  helperText
                )
              }
              FormHelperTextProps={{ sx: { fontSize: '0.90rem' } }}
              error={error}
              InputProps={{
                /*     sx: { borderRadius: '5%' }, */
                endAdornment: isLoading ? (
                  <CircularProgress size="1em" />
                ) : endAdornment !== undefined ? (
                  endAdornment
                ) : null,
              }}
            />
          )}
        </InputMask>
      ) : (
        <MuiTextField
          sx={inputStyles}
          fullWidth
          size={size}
          disabled={disabled}
          multiline={multiline}
          id={id}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onClick={onClick}
          type={type}
          helperText={
            error ? (
              <div
                style={{
                  height: '1.9em',
                }}
              >
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ fontSize: '0.65rem' }}
                >
                  {helperText}
                </Typography>
              </div>
            ) : (
              helperText
            )
          }
          error={error}
          minRows={minRows}
          maxRows={maxRows}
          //  maxLength={maxLength}
          // minLength={minLength}
          autoFocus={autoFocus}
          /* the mui text field accept inputProps and InputProps but eslint detect as same prop */
          /* eslint-disable */
          InputProps={{
            /*         sx: { borderRadius: '5%' }, */
            endAdornment: isLoading ? (
              <CircularProgress size="1em" />
            ) : (
              endAdornment
            ),
            startAdornment,
            inputProps: {
              max,
              min,
              maxLength,
              minLength,
            },
          }}
        />
      )}
    </Fragment>
  );
};

interface PropTypes {
  id: string;
  title?: string;
  placeholder?: string;
  value: string | number | null | undefined;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
  mask?: string;
  error?: boolean;
  required?: boolean;
  unMaskedValue?: boolean;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
  disabled?: boolean;
  isLoading?: boolean;
  endAdornment?: JSX.Element | React.ReactElement | undefined;
  startAdornment?: JSX.Element | React.ReactElement | undefined;
  helperText?: string | undefined | boolean;
  minRows?: number;
  maxRows?: number;
  autoFocus?: boolean;
  size?: 'small' | 'medium';
}

TextField.defaultProps = {
  helperText: ' ',
  minRows: 2,
  maxRows: undefined,
  autoFocus: false,
  title: '',
  placeholder: '',
  onChange: undefined,
  onBlur: undefined,
  onKeyDown: undefined,
  type: 'text',
  mask: '',
  error: false,

  unMaskedValue: false,
  required: false,
  multiline: false,
  minLength: undefined,
  maxLength: undefined,
  min: undefined,
  max: undefined,
  disabled: false,
  isLoading: false,
  endAdornment: undefined,
  startAdornment: undefined,
  onClick: undefined,
  size: 'medium',
};

export default memo(TextField);
