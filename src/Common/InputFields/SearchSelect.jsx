import * as React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { MdErrorOutline } from "react-icons/md";

export default function SearchSelect({
  control,
  name,
  size,
  errors,
  options,
  label,
  variant = "outlined",
  required,
  onChange,
  keyValue,
  value,
}) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options}
            getOptionLabel={(option) => option.label}
            onChange={onChange}
            value={field.value}
            defaultValue={field.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant}
                size="small"
                error={!!errors[name]}
                required={!!required}
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
              />
            )}
          />
        )}
      />
    </>
  );
}
