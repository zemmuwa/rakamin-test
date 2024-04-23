import React, { type ReactNode } from "react";
import { NumericFormat } from "react-number-format";

import { ErrorLabel } from "../label/ErrorLabel";
import { TextField, InputAdornment } from "@mui/material";
interface PropsNumberFormatField {
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  value?: string | null;
  suffix?: string;
  prefix?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  readOnly?: boolean;
  isFocus?: boolean;
  placeholder?: string;
  decimalScale?: number;
  allowNegative?: boolean;
}
const NumberFormatField = React.forwardRef<
  HTMLInputElement,
  PropsNumberFormatField
>(function NumberFormatField(props, ref) {
  const {
    onChange,
    error,
    value,
    prefix,
    suffix,
    startAdornment,
    endAdornment,
    readOnly,
    onBlur,
    placeholder,
    decimalScale,
    allowNegative,
    ...other
  } = props;

  return (
    <NumericFormat
      readOnly={readOnly}
      customInput={TextField}
      size="small"
      {...other}
      fullWidth
      inputRef={ref}
      onBlur={onBlur}
      value={value}
      onValueChange={(values) => {
        onChange?.(values.value);
      }}
      decimalSeparator=","
      placeholder={placeholder}
      thousandSeparator="."
      valueIsNumericString
      decimalScale={decimalScale}
      error={!!error}
      helperText={<ErrorLabel>{error}</ErrorLabel>}
      suffix={suffix}
      prefix={prefix}
      allowNegative={allowNegative}
      InputProps={{
        readOnly: readOnly,
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
    />
  );
});
export default NumberFormatField;
