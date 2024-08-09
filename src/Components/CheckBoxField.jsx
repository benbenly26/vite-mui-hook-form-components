import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
  } from '@mui/material';
  import { get } from 'lodash';
  import React from 'react';
  import { Controller } from 'react-hook-form';
  
  export default function CheckBoxField({
    label,
    control,
    name,
    readOnly,
    value,
    onChange,
    required = false,
    disabled = false,
    min,
  }) {
    return (
      <Box sx={{ pointerEvents: readOnly && 'none' }}>
        <Controller
          control={control}
          name={name}
          rules={{ required: required, min }}
          render={({ field, formState }) => (
            <>
              <FormGroup
                sx={{
                  '& .MuiFormControlLabel-asterisk': {
                    color: 'red',
                  },
                }}
              >
                <FormControl error={!!get(formState?.errors, name)}>
                  <FormControlLabel
                    slotProps={{
                      typography: {
                        fontSize: '12px!important',
                      },
                    }}
                    control={
                      <Checkbox
                        disabled={disabled}
                        inputProps={{}}
                        readOnly={readOnly}
                        {...field}
                        checked={value ?? field.value == 1 ? true : false}
                        onChange={(e) => {
                          typeof onChange == 'function' && onChange(e);
                          field.onChange(e.target.checked ? 1 : 0);
                        }}
                      />
                    }
                    label={label}
                  />
                  <FormHelperText>
                    {get(formState?.errors, name)?.message}
                  </FormHelperText>
                </FormControl>
              </FormGroup>
            </>
          )}
        />
      </Box>
    );
  }
  