import { ReactComponent as VolImg } from "./../../icons/volume2.svg"
import { ReactComponent as VolMuteImg } from "./../../icons/volume_mute.svg"

export default function Volume(props) {
    const volNums = [];
    for (let i = 1; i < 11; i++) {
        volNums.push(i);
    }

    const volLines = volNums.map((volNum, i) => {
        let lineClass;
        if (volNum === props.volume) {
            lineClass = "cur-vol-line";
        } else if (volNum < props.volume) {
            lineClass = "prev-vol-line";
        } else {
            lineClass = "next-vol-line";
        }

        return (
            <div
                key={i}
                className={`vol-line ${lineClass}`}
                onMouseEnter={() => {
                    props.setVolume(volNum);
                    props.setVolMute(false);
                }}
            />
        )
    })

    return (
        <button
            className="control-panel"
            tabIndex="0"
        >
            <div
                className="control-panel-pic"
                onClick={() => {
                    if (!props.volMute) {
                        props.setVolume(0);
                    }
                    props.setVolMute(!props.volMute);
                }}
            >
                {
                    props.volMute
                    ? <VolMuteImg />
                    : <VolImg />
                }
            </div>
            <div className="volume-num-cont">
                <div className="volume-num">
                    {volLines}
                </div>
                <div className="volume-val">
                    {props.volume}
                </div>
            </div>
        </button>
    )
}