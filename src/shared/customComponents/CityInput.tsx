import { Input, Select, Tooltip } from "antd";
import React from "react";

import { CITIES } from "./CityList";

const { Option } = Select;

const CityInput = (props: any) => {
  const { city, setCity, placeholder, style } = props;

  function onChange(value: any) {
    console.log(`selected ${value}`);
    setCity(value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val: any) {
    console.log("search:", val);
  }

  return (
    // <Input
    //   value={city}
    //   onChange={(e: any) => setCity(e.target.value)}
    //   placeholder={placeholder}
    // />
    <Tooltip
      trigger={["focus"]}
      title={"If you can't find your city, use Other"}
      placement="topLeft"
      overlayClassName="numeric-input"
    >
      <Select
        showSearch
        placeholder="Select City"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input: any, option: any) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        style={style}
        value={city ? city : "Select city"}
      >
        {CITIES.map((city) => (
          <Option value={city}>{city}</Option>
        ))}
      </Select>
    </Tooltip>
  );
};

export default CityInput;
