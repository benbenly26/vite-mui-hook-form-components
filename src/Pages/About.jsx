import React, { useState } from "react";
import "./styles.css";
import { Box, Button, Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StringField from "../Common/InputFields/StringField";
import { toast } from "sonner";
import CheckBoxField from "../Common/InputFields/CheckBoxField";
import MulltiOrSingleSelect from "../Common/InputFields/MultiOrSingleSelect";
import { accessOptions, genderValues, switchData, top100Films } from "../helpers/helpers";
import Switch from "../Common/Switch/Switch";
import SelectField from "../Common/InputFields/SelectField";
import DateField from "../Common/InputFields/DateField";
import SearchSelect from "../Common/InputFields/SearchSelect";

export default function About() {
  const navigate = useNavigate();
  const [val, setVal] = useState("");

  const handleOnChange = (name, selectedOption) => {
    setVal(selectedOption);
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  console.log("errors", errors);

  const handleSave = (data) => {
    toast.success("Submitted");
    const v = val.map((e) => e.id);
    console.log("data", data, v);
    setVal("");
    reset();
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleSwitch = async (id, status) => {
    try {
      console.log("id, status", id, status ? 1 : 0);
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Paper className="mt-2" sx={{ backgroundColor: "aliceblue" }}>
          <Typography
            sx={{
              color: "#000080",
              fontWeight: "600",
              fontSize: "25px",
              textAlign: "center",
            }}
          >
            About Page
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Box sx={{ padding: "8px", width: "100%" }}>
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
              <Box sx={{ padding: "8px", width: "100%" }}>
                <SearchSelect
                  label="Search Select"
                  name="nameSelect"
                  control={control}
                  required={"Required mmbu"}
                  errors={errors}
                  options={top100Films}
                  onChange={(e, v) => {
                    setValue('nameSelect', v.value, {
                      shouldDirty: true,
                      shouldValidate: true
                    })
                  }}
                />
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                <CheckBoxField
                  label="I Understand"
                  name="agree"
                  control={control}
                  min={{
                    value: 1,
                    message: "*You must accept by clicking the checkbox.",
                  }}
                  required={"*You must accept by clicking the checkbox."}
                />
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                <MulltiOrSingleSelect
                  options={accessOptions}
                  value={val}
                  keyValue="id"
                  keyLabel="name"
                  onChange={(e) => handleOnChange("val", e)}
                  isMulti={true}
                  placeholder="Select Here..."
                />
              </Box>
              <Switch
                defaultChecked={switchData.is_active == 1}
                onChange={(e) => handleSwitch(switchData.id, e.target.checked)}
              />
              <Box sx={{ padding: "8px", width: "100%" }}>
                <SelectField
                  options={genderValues}
                  control={control}
                  label={"Gender"}
                  name={"gender"}
                  required={"Please"}
                />
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                <DateField control={control} name={"dob"} required={"Please"} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
              padding: "5px",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSubmit(handleSave)}
            >
              Save
            </Button>
          </Box>
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button variant="outlined" color="success" onClick={handleBack}>
            Back
          </Button>
        </Box>
      </Container>
    </>
  );
}
