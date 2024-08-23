import React from "react";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";
import { styled } from "@mui/material/styles";

const NoArrowInput = styled(TextField)({
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      WebkitAppearance: "none",
      margin: 0,
    },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=date]::-webkit-calendar-picker-indicator": {
    display: "none",
  },
});

const StringField = ({
  name,
  control,
  label,
  size,
  variant = "outlined",
  errors,
  maxLength,
  required,
  mandatory = false,
  type = "text",
  minLength,
  onChange,
  endAdornment = null,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={{
          required: required || mandatory,
          pattern: type === "email" && {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
          maxLength: {
            value: maxLength?.length,
            message: maxLength?.message,
          },
          minLength: {
            value: minLength?.length,
            message: minLength?.message,
          },
        }}
        render={({ field }) => (
          <NoArrowInput
            {...field}
            label={label}
            fullWidth
            size={size}
            error={errors ? !!errors[name] : false}
            variant={variant}
            onChange={(e) => {
              field.onChange(e);
              if (typeof onChange === "function") {
                onChange(e);
              }
            }}
            required={!!required}
            type={type}
            helperText={
              errors && errors[name] ? (
                <span style={{ color: "red" }} className="d-flex">
                  <MdErrorOutline
                    className="mx-1"
                    style={{ fontSize: "15px" }}
                  />{" "}
                  {errors[name].message}
                </span>
              ) : (
                ""
              )
            }
            InputProps={{
              endAdornment: endAdornment && <>{endAdornment}</>,
            }}
          />
        )}
      />
    </>
  );
};

export default StringField;
