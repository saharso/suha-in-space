import React, { useState } from 'react';

interface IAddItemProps {
    onAddItem?: (val: string) => void;
}

const AddItem: React.FunctionComponent<IAddItemProps> = ({onAddItem}) => {
    const [value, setValue] = useState('')
    return (
        <div className="ui">
            <input type="text"
                onChange={(e)=>{setValue(e.target.value)}}
            />
            <button
                onClick={()=>{onAddItem && onAddItem(value)}}
            >+</button>
        </div>
    )
}

export default AddItem;