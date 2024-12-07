import React, { useEffect, useState } from "react";
import "./styles.css";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import StringField from "../Common/InputFields/StringField";
import { toast } from "sonner";
import CheckBoxField from "../Common/InputFields/CheckBoxField";
import MulltiOrSingleSelect from "../Common/InputFields/MultiOrSingleSelect";
import {
  accessOptions,
  genderValues,
  switchData,
  top100Films,
} from "../helpers/options";
import Switch from "../Common/Switch/Switch";
import SelectField from "../Common/InputFields/SelectField";
import DateField from "../Common/InputFields/DateField";
import SearchSelect from "../Common/InputFields/SearchSelect";
import { MdErrorOutline } from "react-icons/md";
import { Each } from "../helpers/utils";

export default function About() {
  const navigate = useNavigate();
  const [desErr, setDesErr] = useState(false);
  const [val, setVal] = useState({
    teamLead: "",
    team: "",
    description: "",
  });

  const handleOnChange = (name, value) => {
    setVal((preVal) => ({
      ...preVal,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (val.description.length > 3) {
      setDesErr(false);
    }
  }, [val.description]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  console.log("errors", errors);

  const handleSave = async (data) => {
    if (val.description.length < 3) {
      setDesErr(true);
    }
    if (val.description.length >= 3) {
      try {
        const v = val.teamLead.id;
        const vv = val.team.map((e) => e.id);
        console.log("data", data, v, vv, val.description);
        setVal({
          teamLead: "",
          description: "",
        });
        toast.success("Submitted");
        reset();
      } catch (e) {
        console.log("e", e);
      }
    }
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
  console.log("watch()", watch("nameSelect"));

  const valNew = [
    {
      name: "xxx",
      age: "22",
      year: "1999",
    },
    {
      name: "yyy",
      age: "12",
      year: "6999",
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Each
          of={valNew}
          render={(item) => {
            return (
              <div>
                <h4>{item.year}</h4>
              </div>
            );
          }}
        />
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
                <StringField
                  label="Password"
                  name="password"
                  type="password"
                  control={control}
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
                  key={watch("nameSelect")}
                  label="Search Select One"
                  name="nameSelect"
                  control={control}
                  required={"Required mmbu"}
                  errors={errors}
                  options={top100Films}
                  keyValue={"value"}
                  onChange={(e, v) => {
                    console.log("vvvv", v);
                    setValue("nameSelect", v.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                />
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                <SearchSelect
                  key={watch("nameSelectNew")}
                  label="Search Select"
                  name="nameSelectNew"
                  control={control}
                  required={"Required mmbu"}
                  errors={errors}
                  options={top100Films?.filter(
                    (item) => item.value != watch("nameSelect")
                  )}
                  keyValue={"value"}
                  onChange={(e, v) => {
                    console.log("vvvv", v);
                    setValue("nameSelectNew", v.value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
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
                  value={val.teamLead}
                  keyValue="id"
                  keyLabel="name"
                  onChange={(e) => {
                    handleOnChange("teamLead", e);
                  }}
                  isMulti={false}
                  placeholder="Select Here..."
                />
                {/* 
                1) when we use multi true value will be in [] when false {}
                2) when array use map and pass the id to backend
                3) when object just pass the id like this // const teamLeadId = val.teamLead.id;
                */}
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                {/* 
                1) when above data is in [] use option 1st
                2) when false use normal filter
                */}
                <MulltiOrSingleSelect
                  value={val.team}
                  keyValue="id"
                  keyLabel="name"
                  onChange={(e) => {
                    console.log("eee", e);
                    handleOnChange("team", e);
                  }}
                  // options={accessOptions.filter((value) => {
                  //   return (
                  //     val.teamLead &&
                  //     !val.teamLead.some((v) => v.id == value.id)
                  //   );
                  // })}
                  options={accessOptions.filter(
                    (item) => item.id != val.teamLead?.id
                  )}
                  isMulti={true}
                />
              </Box>
              <Box sx={{ padding: "8px", width: "100%" }}>
                <Box className="d-flex align-items-center justify-content-center">
                  <Typography>Switch me*</Typography>
                  <Switch
                    defaultChecked={switchData.is_active == 1}
                    onChange={(e) =>
                      handleSwitch(switchData.id, e.target.checked)
                    }
                  />
                </Box>
              </Box>

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
              <Box sx={{ padding: "8px", width: "100%" }}>
                <Typography>Noraml Text Field</Typography>
                <TextField
                  className="w-100"
                  size="small"
                  label="Hey"
                  placeholder="Type.."
                  value={val.description}
                  onChange={(e) =>
                    handleOnChange("description", e.target.value)
                  }
                  error={desErr}
                />
                {desErr && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <MdErrorOutline className="mx-1" style={{ color: "red" }} />
                    <Typography
                      sx={{ color: "red", fontSize: "13px !important" }}
                    >
                      Please enter
                    </Typography>
                  </Box>
                )}
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
