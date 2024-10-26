import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller } from "react-hook-form";
import { get } from "lodash";
import { MdErrorOutline } from "react-icons/md";

export default function GroupBySelect({
  options: inputOptions = [],
  control,
  name,
  label,
  onChange,
  keyValue,
  errors,
  required,
}) {
  const options = (inputOptions || []).map((option) => {
    const label = option.label || option.title || "";
    const firstLetter = label[0]?.toUpperCase() || "";
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={options.sort((a, b) =>
              (b.firstLetter || "").localeCompare(a.firstLetter || "")
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.label || option.title || ""}
            onChange={onChange}
            value={
              field.value != null
                ? typeof field.value == "object"
                  ? typeof field.value?.[0] != "object" &&
                    field.value?.length > 0
                    ? options?.filter((it) =>
                        field.value?.includes(it[keyValue])
                      )
                    : field.value
                  : options?.find(
                      (option) => get(option, keyValue) == field.value
                    )
                : undefined
            }
            size="small"
            renderInput={(params) => (
              <TextField
                {...params}
                label={label || "With categories"}
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