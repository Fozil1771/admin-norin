import React from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";
const RSelect = ({
    isSearchable = false,
    options,
    placeholder = '',
    //  border = true,
    primary = true,
    width = "100%",
    border,
    name,
    control,
    register,
}) => {
    const borderNone = {
        control: (base) => ({
            ...base,
            border: border && "1px solid #4ca6a9 !important",
            borderRadius: border && "10px",
            // This line disable the blue border
            boxShadow: "none",
            cursor: "pointer",
        }),
    };

    return (
        <div
            className={primary ? "primary-select" : "secondary-select"}
            style={{ width }}
        >
            <Controller
                name={name}
                isClearable
                control={control}
                render={({ field }) => (
                    <Select
                        {...field}
                        styles={borderNone}
                        options={options}
                        placeholder={placeholder}
                    />
                )}
            />


        </div>
    );
};

export default RSelect;
