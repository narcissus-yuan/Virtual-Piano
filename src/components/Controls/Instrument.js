import { useState } from "react";
import { ReactComponent as InstrImg } from "./../../icons/instrument.svg"
import ControlSelect from "./../ControlSelect";

const instruments = require("../../musyngkite.json");

function formatInstr(instr) {
    return instr.split("_").join(" ");
}

export default function Instrument(props) {
    const [selOpen, setSelOpen] = useState(false);

    return (
        <>
            <button
                className="control-panel"
                tabIndex="0"
                onClick={() => {setSelOpen(!selOpen)}}
                title="Instrument"
                aria-label="Choose instrument"
            >
                <div
                    className="control-panel-pic instr-pic"
                >
                    <InstrImg />
                </div>
            </button>
            <div className={`selector-cont instr-num-cont sel-cont-${selOpen ? "open" : "close"}`}>
                <div className="instr-opts">
                    <ControlSelect
                        name="instr"
                        search="sound / instrument"
                        opt={props.instrument}
                        optList={instruments}
                        formatOpt={formatInstr}
                        setOpt={props.setInstrument}
                        setSelOpen={setSelOpen}
                    />
                </div>
            </div>
        </>
    )
}