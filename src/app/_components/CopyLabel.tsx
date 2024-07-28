'use client';
import {useState} from "react";

interface Props {
    labelText: string,
    labelValue: string,
}

export default function CopyToClipBoardButton({labelText, labelValue}: Props) {
    const [copySuccess, setCopySuccess] = useState(' ');

    function copyToClipboard() {
        if (typeof navigator != "undefined") {
            navigator.clipboard.writeText(labelValue).then(() => {
                setCopySuccess('Copied!')
            }, function (err) {
                setCopySuccess("Failed to copy text")
            });
        }
    }

    const [isHovering, setIsHovering] = useState(false);
    const onMouseEnter = () => setIsHovering(true);
    const onMouseExit = () => setIsHovering(false);
    

    return (
        <div style={{display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
            <label style={{fontWeight: "bold"}}>
                {labelText}
            </label>
            <label style={{
                wordWrap: "break-word",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                minWidth: 0,
            }}>{labelValue}</label>
            <button style={{
                padding: "0px",
                outline: "0px transparent",
                borderRadius: "5px"
            }}
                    onClick={copyToClipboard}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseExit}>
                {isHovering ?
                    <img style={{
                        width: "30px",
                        height: "auto"
                    }}

                         src={"inverted_copy_icon.png"} alt={"icon"}/> :
                    <img style={{
                        width: "30px",
                        height: "auto"
                    }}

                         src={"copy_icon.png"} alt={"icon"}/>
                }
            </button>
        </div>
    )
}