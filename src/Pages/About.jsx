import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StringField from "../Components/StringField";
import { toast } from "sonner";

export default function About() {
  const naviagte = useNavigate();

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
  });
  console.log("errors", errors);

  const handleSave = (data) => {
    toast.success("Submitted");
    console.log("data", data);
    reset();
  };

  const handleBack = () => {
    naviagte("/");
  };

  return (
    <Box>
      <Typography
        sx={{ color: "#000080", fontWeight: "600", fontSize: "25px" }}
      >
        About Page
      </Typography>
      <Box className="p-2" sx={{ width: "150%" }}>
        <StringField
          label="First Name"
          name="firstName"
          control={control}
          size="small"
          maxLength={{
            message: "Please enter the valid name",
            length: 10,
          }}
          required={"Required"}
          errors={errors}
        />
      </Box>
      <Box className="mt-2">
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleSubmit(handleSave)}
        >
          Save
        </Button>
      </Box>
      <Box className="mt-4">
        <Button variant="outlined" color="success" onClick={handleBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
}
