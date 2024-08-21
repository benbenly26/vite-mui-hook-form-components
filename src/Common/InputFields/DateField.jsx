import React from "react";
import { Box, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { get } from "lodash";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function DateField({
  name,
  control,
  label,
  readOnly,
  dateOnly = false,
  variant = "outlined",
  minDate = false,
  required,
  disabled = false,
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: required,
        }}
        render={({ field, formState }) => (
          <Box className="d-flex flex-column">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {!dateOnly ? (
                <DateTimePicker
                  minDate={minDate ? dayjs() : undefined}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: get(formState?.errors, name)?.message,
                      helperText: get(formState?.errors, name)?.message && (
                        <Stack direction={"row"} alignItems={"center"}>
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: "13px", marginRight: "4px" }}
                          />
                          <Typography
                            color={"error"}
                            variant="light"
                            size="small"
                          >
                            {get(formState?.errors, name)?.message}
                          </Typography>
                        </Stack>
                      ),
                      variant: variant,

                      inputProps: {
                        sx: { padding: " 6.5px 14px ", outline: "none" },
                      },
                      InputProps: {
                        size: "small",
                      },
                    },
                  }}
                  label={label}
                  required={required}
                  format="MM/DD/YYYY hh:mm A"
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(e) => {
                    field.onChange(dayjs(e).format("YYYY-MM-DD HH:mm:ss"));
                  }}
                  disabled={disabled}
                />
              ) : (
                <DatePicker
                  minDate={minDate ? dayjs() : undefined}
                  slotProps={{
                    textField: {
                      size: "small",
                      error: get(formState?.errors, name)?.message,
                      helperText: get(formState?.errors, name)?.message && (
                        <Stack direction={"row"} alignItems={"center"}>
                          <ErrorOutlineOutlinedIcon
                            style={{ fontSize: "13px", marginRight: "4px" }}
                          />
                          <Typography
                            color={"error"}
                            variant="light"
                            size="small"
                          >
                            {get(formState?.errors, name)?.message}
                          </Typography>
                        </Stack>
                      ),
                      variant: variant,
                      inputProps: {
                        sx: { padding: " 6.5px 14px ", outline: "none" },
                      },
                      InputProps: {
                        size: "small",
                      },
                    },
                  }}
                  label={label}
                  required={required}
                  format="MM/DD/YYYY"
                  value={field.value ? dayjs(field.value) : undefined}
                  onChange={(e, v) => {
                    field.onChange(dayjs(e).format("YYYY-MM-DD"));
                  }}
                  disabled={disabled}
                />
              )}
            </LocalizationProvider>
          </Box>
        )}
      />
    </>
  );
}
