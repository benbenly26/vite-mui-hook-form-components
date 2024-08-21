import React from "react";
import "./styles.css";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StringField from "../Common/InputFields/StringField";
import SearchSelect from "../Common/InputFields/SearchSelect";
import { genderValues, top100Films } from "../helpers/helpers";
import CheckBoxField from "../Common/InputFields/CheckBoxField";
import SelectField from "../Common/InputFields/SelectField";
import DateField from "../Common/InputFields/DateField";

export default function Home() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "First Name length is very short")
      .max(6, "First Name is large")
      .required("First name is required"),
    email: yup.string().email("Invalid email address"),
    movie: yup.object().nullable().required("Movie is required"),
    agree: yup.string().required("*Please Check"),
    gender: yup.string().required("Please Select"),
    dob: yup
      .string()
      .required("Please Select i need to send you birthday cake"),
  });

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

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

  const handleNavigate = () => {
    navigate("/About");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
              size="small"
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
              size="small"
            />
          </Box>
          <Box className="p-2">
            <SearchSelect
              label="Search Select"
              control={control}
              options={top100Films}
              name="movie"
              size="small"
              errors={errors}
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
