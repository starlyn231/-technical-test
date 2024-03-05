/* eslint-disable */
import { FunctionComponent, memo, Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField as MuiTextField, Typography } from '@mui/material';
import CheckRender from '../check-render/check-render';
import InputMask from 'react-input-mask';
import { removeGuionFromString } from '../../utilities/stringUtil';


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
  unMaskedValue
}) {
  const removeTextFromInputMaskValue = (value: any) => {
    /*  let NewValue = value.replace(/[^0-9\.]+/g, '');
     return NewValue; */
    let NewValue = removeGuionFromString(value);
    return NewValue;

  }

  const maskPresets = {
    cvv: "999",
    expDate: "99/99",
    passport: "*",
    rnc: "9-99-99999-9",
    'solo numero': "999999999999999999999999999",
    mascaraRut: "aa-aaaa-9999-99999"
  }

  return (
    <Fragment key={id}>
      <Typography variant="caption">
        {title}
        <CheckRender allowed={required}>
          <Typography variant="caption" color="error">
            &#160;*
          </Typography>
        </CheckRender>
      </Typography>
      {
        mask ? <InputMask
          id={id}
          mask={useMaskPresets ? maskPresets[mask] : mask}
          maskChar={null}
          value={value}
          disabled={disabled}
          onBlur={
            unMaskedValue ?
              (e) => {
                onBlur && onBlur({
                  target:
                  {
                    id: e.target.id,
                    value: removeTextFromInputMaskValue(e.target.value)
                  }
                })
              }
              :
              onBlur
          }
          onChange={
            unMaskedValue ?
              (e) => {
                onChange({
                  target:
                  {
                    id: e.target.id,
                    value: removeTextFromInputMaskValue(e.target.value)
                  }
                })
              }
              :
              onChange
          }>

          {(inputProps) =>
            <MuiTextField
              {...inputProps}
              disabled={disabled}
              fullWidth
              variant='outlined'
              placeholder={placeholder}
              type={type}
              helperText={helperText}
              FormHelperTextProps={{ sx: { fontSize: '0.90rem' } }}
              error={error}
              InputProps={{
                endAdornment: isLoading ? (
                  <CircularProgress size='1em' />
                )
                  :
                  endAdornment !== undefined ? endAdornment
                    :
                    null
              }}
            />
          }
        </InputMask>
          :
          <MuiTextField

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
            helperText={helperText}
            error={error}
            minRows={minRows}
            maxRows={maxRows}

            //  maxLength={maxLength}
            // minLength={minLength}
            autoFocus={autoFocus}
            /* the mui text field accept inputProps and InputProps but eslint detect as same prop */
            /* eslint-disable */
            InputProps={{
              sx: { borderRadius: '8%' },
              endAdornment: isLoading ? <CircularProgress size="1em" /> : endAdornment,
              startAdornment,
              inputProps: {
                max,
                min,
                maxLength,
                minLength,
              },
            }}
          />
      }
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
  error?: boolean;
  required?: boolean;
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
  error: false,
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
