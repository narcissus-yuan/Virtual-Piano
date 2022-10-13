import { useEffect, useState } from "react";
import { ReactComponent as MetroImg } from "./../../icons/metro.svg"
import { ReactComponent as MetroActiveImg } from "./../../icons/metro_active.svg"
import ControlSelect from "../ControlSelect";
import { tempos } from "./../Arrays"

function formatTempo(tempo) {
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

let metroInter;

export default function Metronome() {
    const metroBeat = new Audio("/audios/metronome.mp3");
    const [metroDur, setMetroDur] = useState(0);

    useEffect(() => {
        metroBeat.addEventListener("canplaythrough", () => {
            setMetroDur(metroBeat.duration);
        })
    }, []);

    const [tempo, setTempo] = useState(null);

    useEffect(() => {
        clearInterval(metroInter);
        if (tempo && tempo[1] > 0) {
            const speed = 60000 / (tempo[1] + tempo[tempo.length - 1]) * 2 - metroDur;
            console.log("speed", speed, metroDur);
            metroInter = setInterval(() => {
                metroBeat.play();
            }, speed);
        } else {
            metroInter = null;
        }
    }, [tempo]);

    const [selOpen, setSelOpen] = useState(false);

    return (
        <div>
            <button
                className="control-panel"
                tabIndex="0"
                onClick={() => {setSelOpen(!selOpen)}}
            >
                <div
                    className="control-panel-pic metro-pic"
                >
                    <MetroImg />
                </div>
            </button>
            <div className={`selector-cont metro-num-cont sel-cont-${selOpen ? "open" : "close"}`}>
                <div className="metro-opts">
                    <ControlSelect
                        name="metro"
                        search="tempo marking"
                        opt={tempo}
                        optList={tempos}
                        formatOpt={formatTempo}
                        formatHtmlOpt={formatHtmlTempo}
                        setOpt={setTempo}
                        setSelOpen={setSelOpen}
                    />
                </div>
            </div>
        </div>
    )
}