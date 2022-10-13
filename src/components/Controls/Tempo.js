import ControlSelect from "../ControlSelect";
import { tempos } from "./../Arrays"

function formatTempo(tempo) {
    // if (tempo.length === 3) {
    //     return tempo[0] + " " + tempo[1] + " - " + tempo[2] + " bpm";
    // }
    // return tempo[0] + " " + tempo[1] + " bpm";

    return tempo[0];
}

function formatHtmlTempo(tempo) {
    if (tempo.length === 3) {
        return (
            <span>
                {tempo[0]} <i>{tempo[1]} - {tempo[2]} bpm</i>
            </span>
        );
    }
    return (
        <span>
            {tempo[0]} <i>{tempo[1]} bpm</i>
        </span>
    );
}

export default function Tempo(props) {
    return (
        <ControlSelect
            name="metro"
            search="tempo marking"
            opt={props.tempo}
            optList={tempos}
            formatOpt={formatTempo}
            formatHtmlOpt={formatHtmlTempo}
            setOpt={props.setTempo}
        />
    )
}