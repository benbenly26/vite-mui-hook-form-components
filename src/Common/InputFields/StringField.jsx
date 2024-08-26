import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";

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
  currency = false,
  readOnly,
  placeholder = label,
}) => {
  // Determine if the special class is needed based on the input type
  const inputClassName =
    type === "number" || type === "date" ? "input-no-arrows" : "";

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
          <TextField
            {...field}
            label={label}
            placeholder={!readOnly && placeholder}
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
            className={inputClassName}
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
              disableUnderline: true,
              readOnly: readOnly,
              startAdornment: currency && (
                <>
                  {currency && (
                    <Box
                      className="d-flex flex-row"
                      sx={{ padding: "0px 3px 4px" }}
                    >
                      $
                    </Box>
                  )}
                </>
              ),
              endAdornment: endAdornment && <>{endAdornment}</>,
            }}
          />
        )}
      />
    </>
  );
};

export default StringField;
