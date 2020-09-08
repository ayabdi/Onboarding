import React from "react";
import { Dropdown } from "semantic-ui-react";

import "../css/Dropdown.scss";

const friendOptions = [
  {
    key: "Workflow for HR",
    text: "Workflow for HR",
    value: "Workflow for HR",
  },
  {
    key: "Workflow for Tech",
    text: "Workflow for Tech",
    value: "Workflow for Tech",
  },
  {
    key: "Workflow for Engineering",
    text: "Workflow for Engineering",
    value: "Workflow for Engineering",
  },
];

const DropdownExampleSelection = () => (
  <Dropdown
    placeholder="Choose a workflow template"
    fluid
    selection
    options={friendOptions}
  />
);

export default DropdownExampleSelection;
