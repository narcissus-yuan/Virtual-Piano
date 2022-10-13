import { useState } from "react";
import ControlSelect from "../ControlSelect";
import { ReactComponent as ScaleImg } from "./../../icons/scale2.svg"
import { scales } from "../Arrays"

function formatScale(scale) {
    return scale;
}

// export default function Instrument(props) {
//     return (
//         <ControlSelect
//             name="instr"
//             search="scale"
//             opt={props.scale}
//             optList={scales}
//             formatOpt={formatScale}
//             setOpt={props.setScale}
//         />
//     )
// }

export default function Instrument(props) {
    const [selOpen, setSelOpen] = useState(false);

    return (
        <>
            <button
                className="control-panel"
                tabIndex="0"
                onClick={() => {setSelOpen(!selOpen)}}
            >
                <div
                    className="control-panel-pic scale-pic"
                >
                    <ScaleImg />
                </div>
            </button>
            <div className={`selector-cont scale-num-cont sel-cont-${selOpen ? "open" : "close"}`}>
                <div className="instr-opts">
                    <ControlSelect
                        name="instr"
                        search="scale"
                        opt={props.scale}
                        optList={scales}
                        formatOpt={formatScale}
                        setOpt={props.setScale}
                        setSelOpen={setSelOpen}
                    />
                </div>
            </div>
        </>
    )
}