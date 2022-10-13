import { useState } from "react";
import { ReactComponent as DisplayImg } from "./../../icons/note_text.svg"

function Switch(props) {
    return (
        <div className="switch-opt">
            <div className="switch-label">
                {props.label}
            </div>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={props.open}
                    onChange={() => {props.setOpen(!props.open)}}
                />
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default function Display(props) {
    const [selOpen, setSelOpen] = useState(false);

    return (
        <>
            <button
                className="control-panel"
                tabIndex="0"
                onClick={() => {setSelOpen(!selOpen)}}
                title="Note display"
                aria-label="Note display switches"
            >
                <div
                    className="control-panel-pic display-pic"
                >
                    <DisplayImg />
                </div>
            </button>
            <div className={`switch-cont display-switch-cont swi-cont-${selOpen ? "open" : "close"}`}>
                <Switch
                    label="note name"
                    open={props.nameOpen}
                    setOpen={props.setNameOpen}
                />
                <Switch
                    label="keyboard"
                    open={props.keyOpen}
                    setOpen={props.setKeyOpen}
                />
            </div>
        </>
    )
}