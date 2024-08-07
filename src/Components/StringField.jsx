import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { MdErrorOutline } from 'react-icons/md';

const StringField = ({
  name,
  control,
  label,
  size,
  variant = 'outlined',
  errors,
  maxLength,
  required,
  mandatory = false,
  type = 'text',
  minLength,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={{
        required: required || mandatory,
        pattern: type == 'email' && {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'invalid email address',
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
          fullWidth
          size={size}
          error={errors ? !!errors[name] : false}
          variant={variant}
          required={!!required}
          helperText={
            errors && errors[name] ? (
              <span style={{ color: 'red' }} className="d-flex">
                <MdErrorOutline className="mx-1" style={{ fontSize: '15px' }} />{' '}
                {errors[name].message}
              </span>
            ) : (
              ''
            )
          }
        />
      )}
    />
  );
};

export default StringField;
