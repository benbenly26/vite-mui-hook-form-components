import React from "react";
import "../App.css";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StringField from "../Components/StringField";
import SearchSelect from "../Components/SearchSelect";
import { top100Films } from "../helpers/helpers";

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
      <Box sx={{ width: "150%" }}>
        <Box>
          <Typography>Hook Form</Typography>
          <i className="fas fa-heartbeat" />
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
    </>
  );
}
