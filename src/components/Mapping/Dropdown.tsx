import React from 'react';
import Select from 'react-select';
import { dropDownOptions } from './BulkContainer';

const options = [
    {
        value: "mapDepartments",
        label: "Map Departments"
    },
    {
        value: "dmsMapping",
        label: "DMS Mapping"
    },
    {
        value: "createDepartments",
        label: 'Create Departments'
    },
    {
        value: "createStores",
        label: 'Create Stores'
    },
    {
        value: "creatingEnterprise",
        label: "Creating Enterprise"
    },
    {
        value: "removingIdentifiers",
        label: "Removing Identifiers"
    },
    {
        value: "addingExternalIdentifiers",
        label: "Adding External Identifiers"
    },
    {
        value: "updateExternalIdentifiers",
        label: "Update External Identifiers"
    },

];

interface DropdownProps {
    value: dropDownOptions | null,
    setValue: React.Dispatch<React.SetStateAction<dropDownOptions | null>>
}

const Dropdown: React.FC<DropdownProps> = ({ value, setValue }) => {

    return (
        <div className='dropdown-container'>
            <Select options={options} isSearchable isClearable placeholder="Select Operation" onChange={(value) => setValue(value)} values={value} />
        </div>
    )
}

export default Dropdown
