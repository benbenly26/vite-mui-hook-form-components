import React, { useState } from "react";
import "./styles.css";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StringField from "../Common/InputFields/StringField";
import SearchSelect from "../Common/InputFields/SearchSelect";
import { genderValues, top100Films } from "../helpers/options";
import CheckBoxField from "../Common/InputFields/CheckBoxField";
import SelectField from "../Common/InputFields/SelectField";
import DateField from "../Common/InputFields/DateField";
import useDocumentTitle from "../Common/UseDocumentTitle";
import RadioField from "../Common/InputFields/RadioField";
import SwitchField from "../Common/InputFields/SwitchField";
import Switch from "../Common/Switch/Switch";

export default function Home() {
  const navigate = useNavigate();

  const [isToggle, setIsToggle] = useState(false);

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "First Name length is very short")
      .max(6, "First Name is large")
      .required("First name is required"),
    phoneNumber: yup
      .string()
      .min(3, "Number is Short")
      .max(6, "Number is large")
      .required("Number is required")
      .nullable(),
    email: yup.string().email("Invalid email address"),
    movie: yup.mixed().nullable().required("Movie is required"),
    agree: yup.string().required("*Please Check"),
    gender: yup.string().required("Please Select"),
    dob: yup
      .string()
      .required("Please Select i need to send you birthday cake"),
    password: yup.string().when("isValue", {
      is: (isValue) => {
        return isValue == 1;
      },
      then: () => yup.string().required("Please enter password"),
      otherwise: () => yup.string().nullable(),
    }),
    nameOne: yup.string().when({
      is: () => isToggle == 0,
      then: () => yup.string().required("Please enter the Name One"),
      otherwise: () => yup.string().nullable(),
    }),
    nameTwo: yup.string().when({
      is: () => isToggle == 1,
      then: () => yup.string().required("Please enter the Name Two"),
      otherwise: () => yup.string().nullable(),
    }),
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      radio: 1,
    },
    resolver: yupResolver(schema),
  });
  console.log("getValues", getValues());
  console.log("errors", errors);

  const handleSave = async (data) => {
    try {
      toast.success("Happy Happy... 😁");
      console.log("data", data);
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const handelToogle = (checked) => {
    setIsToggle(checked);
    // when we use reset all the inputs will be reset only rest the nameOne and nameTwo so use setValue
    if (checked) {
      setValue("nameOne", "");
    } else {
      setValue("nameTwo", "");
    }
    console.log("checked", checked ? 1 : 0);
  };

  const handleNavigate = () => {
    navigate("/About");
  };
  // title change
  useDocumentTitle("Review");

  console.log("movie", watch("movie"));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          paddingTop: "5%",
        }}
      >
        <Box sx={{ width: "20%", textAlign: "center" }}>
          <Box>
            <Typography>Hook Form</Typography>
            <i className="fas fa-heartbeat" />
          </Box>
          <Box className="p-2">
            <DateField
              control={control}
              name="dob"
              errors={errors}
              dateOnly={true}
              minDate={false}
            />
          </Box>
          <Box className="p-2">
            <StringField
              label="First Name"
              name="firstName"
              control={control}
              errors={errors}
            />
          </Box>
          <Box className="p-2">
            <StringField
              label="Phone Number"
              name="phoneNumber"
              type="number"
              control={control}
              errors={errors}
            />
          </Box>
          <Box className="p-2">
            <StringField
              type="email"
              label="Email"
              name="email"
              control={control}
              errors={errors}
            />
          </Box>
          <Box className="p-2">
            <SearchSelect
              key={watch("movie")}
              label="Search Select"
              control={control}
              options={top100Films}
              name="movie"
              errors={errors}
              keyValue={"value"}
              onChange={(e, v) => {
                console.log("vvvv", v);
                setValue("movie", v.value, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />
          </Box>
          <Box className="p-2">
            <CheckBoxField
              control={control}
              name={"agree"}
              label={"I Understand"}
              errors={!!errors.agree}
            />
          </Box>
          <Box className="p-2">
            <SelectField
              control={control}
              options={genderValues}
              name="gender"
              label="Gender"
              errors={errors}
            />
          </Box>
          <Box>
            <RadioField
              control={control}
              name="radio"
              onChange={(e, v) => {
                console.log("v", v);
                setValue("radio", v);
              }}
              radios={[
                { label: "Home", value: "1" },
                { label: "Office", value: "2" },
              ]}
            />
          </Box>
          <Box className="p-2">
            <SwitchField control={control} name="isValue" />
            {watch("isValue") == 1 && (
              <StringField
                control={control}
                name={"password"}
                type="password"
                errors={errors}
              />
            )}
          </Box>
          <Box>
            <Switch
              checked={isToggle}
              onChange={(e) => {
                handelToogle(e?.target?.checked);
              }}
            />
            {!isToggle ? (
              <StringField
                control={control}
                name={"nameOne"}
                label={"Name One"}
                errors={errors}
              />
            ) : (
              <StringField
                control={control}
                name={"nameTwo"}
                label={"Name Two"}
                errors={errors}
              />
            )}
          </Box>
          <Box className="mt-3">
            <Button variant="outlined" onClick={handleSubmit(handleSave)}>
              Save
            </Button>
          </Box>
        </Box>
        <Box className="mt-5">
          <Button variant="contained" onClick={handleNavigate}>
            Next Page
          </Button>
        </Box>
      </Box>
    </>
  );
}
