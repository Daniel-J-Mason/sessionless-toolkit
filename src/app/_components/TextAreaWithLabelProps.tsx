'use client';

import { ChangeEvent } from "react";

export interface TextAreaWithLabelProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaWithLabel: React.FC<TextAreaWithLabelProps> = ({label, value, onChange}) => {
    const areaStyle = {
        minHeight: "75px"
    };

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
            <label>{label}</label>
            <textarea style={areaStyle} value={value} onChange={onChange}/>
        </div>
    )
}

export default TextAreaWithLabel;