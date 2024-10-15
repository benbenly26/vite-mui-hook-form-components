import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { Each } from "./helpers";

export default function RadioField({
  name,
  control,
  disabled,
  radios = [],
  onChange,
}) {
  const inputRef = React.useRef(null);
  const scrollToInput = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: false,
        }}
        render={({ field, formState }) => (
          <FormControl key={field.value}>
            <RadioGroup
              row
              aria-labelledby="radio-group-n"
              defaultValue={field.value}
              name={name}
              onChange={onChange}
            >
              <Each
                of={radios}
                render={(radio) => (
                  <FormControlLabel
                    value={radio.value}
                    disabled={disabled}
                    control={
                      <Radio
                        ref={field.ref()}
                        onFocus={scrollToInput}
                        inputRef={(e) => {
                          // Connect the ref provided by Controller to your custom ref
                          field.ref(e);
                          inputRef.current = e;
                        }}
                      />
                    }
                    label={radio.label}
                  />
                )}
              />
            </RadioGroup>
            <FormLabel error={formState.errors[name]?.message}>
              {" "}
              {formState.errors[name]?.message}
            </FormLabel>
          </FormControl>
        )}
      />
    </>
  );
}
