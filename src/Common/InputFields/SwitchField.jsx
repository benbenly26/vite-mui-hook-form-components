import { Box, FormLabel, Switch, TextField, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

export default function SwitchField({
  name,
  control,
  label1,
  label2,
  multiline = false,
  minRows = 1,
  type = "text",
  readOnly,
  size = "medium",
}) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => (
          <Box className="row-align-center gap-2">
            <Typography>{label1}</Typography>
            <Switch
              disabled={readOnly}
              size={size}
              checked={field.value == 1 || field.value}
              defaultChecked={field.value == 1 || field.value}
              onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
            />
            <Typography>{label2}</Typography>
            <FormLabel error={formState.errors[name]?.message}>
              {formState.errors[name]?.message && (
                <ErrorOutlineOutlinedIcon
                  style={{ fontSize: "13px", marginRight: "4px" }}
                />
              )}
              {formState.errors[name]?.message}
            </FormLabel>
          </Box>
        )}
      />
    </>
  );
}
