import { FunctionComponent, memo } from 'react';

const CheckRender: FunctionComponent<PropTypes> = ({
  allowed,
  children,
  notAllowedReturn,
}) => (allowed ? children : notAllowedReturn);

interface PropTypes {
  allowed?: boolean;
  notAllowedReturn?:
    | JSX.Element
    | JSX.Element[]
    | undefined
    | false
    | string
    | undefined;
  children:
    | JSX.Element
    | JSX.Element[]
    | undefined
    | false
    | string
    | undefined;
}

CheckRender.defaultProps = {
  allowed: false,
  notAllowedReturn: undefined,
};

export default memo(CheckRender);
