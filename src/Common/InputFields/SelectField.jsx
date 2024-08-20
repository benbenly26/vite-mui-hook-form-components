import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import React from "react";
import { Controller, useController } from "react-hook-form";
import { IoMdArrowDropdown } from "react-icons/io";

export default function SelectField({
  options = [],
  name,
  handleChange,
  control,
  label,
  width = "100%",
  keyLabel = "label",
  keyValue = "value",
  readOnly,
  variant = "outlined",
  disabled,
  required,
}) {
  const { field } = useController({
    control: control,
    name: name,
  });

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "40vh",
      },
    },
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ required: required }}
        render={({ field, formState }) => {
          const errorMessage = formState.errors[name]?.message;

          return (
            <FormControl sx={{ width: width }} size="small" key={field.value}>
              <InputLabel id={`${name}-label`}>{label}</InputLabel>
              <Select
                IconComponent={
                  variant === "standard"
                    ? null
                    : () => <IoMdArrowDropdown className="mr-2" size={20} />
                }
                readOnly={readOnly}
                ref={field.ref}
                {...field}
                label={label}
                labelId={`${name}-label`}
                value={field.value}
                name={name}
                MenuProps={MenuProps}
                onChange={(e) => {
                  field.onChange(e);
                  if (typeof handleChange === "function") {
                    handleChange(e);
                  }
                }}
                error={!!errorMessage}
                id="demo-simple-select-helper"
                variant={variant}
                size={"small"}
                sx={{
                  width: "100%",
                  fontSize: "14px !important",
                  textAlign: "left",
                  ".MuiSelect-select": {
                    textAlign: "left",
                  },
                }}
                disabled={disabled}
                inputProps={{
                  style: { color: "black" },
                  "aria-label": "Without label",
                }}
              >
                {options?.map((item, index) => (
                  <MenuItem
                    value={item[keyValue]}
                    key={`${item[keyValue]}-${index}`}
                  >
                    {item[keyLabel]}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error={!!errorMessage}>
                {errorMessage && (
                  <>
                    <i className="fas fa-star mx-1" />
                    {errorMessage}
                  </>
                )}
              </FormHelperText>
            </FormControl>
          );
        }}
      />
    </>
  );
}
