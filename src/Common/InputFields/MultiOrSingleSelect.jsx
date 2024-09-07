import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export default function MulltiOrSingleSelect({
  onChange,
  value,
  options = [],
  isSearchable,
  isLoading,
  isMulti,
  placeholder = "Select...",
  isDisabled,
  noOptionsMessage = () => {},
  keyLabel = "label",
  keyValue = "value",
  //  here value is id and label is is value and when data has no value and label put keyValue and keyLabel and pass inside
}) {
  // custom styles for the control (the main input);
  const customStyles = {
    // Custom styles for the option (each dropdown option)
    control: (provided, state) => ({
      ...provided,
      border: `1px solid  #e0e0eb`,
      borderRadius: "5px",
      boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
      padding: "3px 0px",
      "&:hover": {
        borderColor: "#007bff",
      },
    }),
    // Custom styles for the menu (the dropdown)
    option: (provided, state) => ({
      ...provided,
      fontSize: "13px",
      fontWeight: "500",
      color: "black",
    }),
    // Custom styles for the menu (the dropdown)
    menu: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "0px",
    }),
    // placeholder style
    placeholder: (provided) => ({
      ...provided,
      color: "#b3b3cc",
      fontSize: "13px",
      fontWeight: "500",
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      padding: "0px",
    }),
  };

  const animatedComponents = makeAnimated();

  return (
    <>
      <Select
        getOptionLabel={(opt) => opt[keyLabel]}
        getOptionValue={(opt) => opt[keyValue]}
        value={value}
        onChange={onChange}
        options={options}
        isSearchable={isSearchable}
        isLoading={isLoading}
        isMulti={isMulti}
        placeholder={placeholder}
        isDisabled={isDisabled}
        noOptionsMessage={noOptionsMessage}
        styles={customStyles}
        components={animatedComponents}
      />
    </>
  );
}
