import { useState } from "react";
import { ReactComponent as NoteImg } from "./../../icons/note.svg"

function Slider(props) {
    return (
        <div className="slider-opt">
            <div className="slider-label">
                <span>{props.label}</span>
                <i>{props.val}</i>
            </div>
            <div className="slider-cont">
                <input
                    className="slider"
                    type="range"
                    min="0.0"
                    max="5.0"
                    step="0.1"
                    value={props.val}
                    onChange={(e) => {
                        props.setVal(prevState => ({
                            ...prevState,
                            [props.label]: parseFloat(e.target.value),
                        }))
                    }}
                />
            </div>
        </div>
    )
}

export default function Note(props) {
    const [selOpen, setSelOpen] = useState(false);

    const opts = ["attack", "decay", "sustain", "release"];
    const switches = opts.map((opt, i) => {
        return (
            <Slider
                key={i}
                label={opt}
                val={props.adsr[opt]}
                setVal={props.setAdsr}
            />
        )
    });

    return (
        <>
            <button
                className="control-panel"
                tabIndex="0"
                onClick={() => {setSelOpen(!selOpen)}}
                title="Note control"
                aria-label="Note settings"
            >
                <div
                    className="control-panel-pic display-pic"
                >
                    <NoteImg />
                </div>
            </button>
            <div className={`switch-cont note-switch-cont swi-cont-${selOpen ? "open" : "close"}`}>
                {switches}
            </div>
        </>
    )
}