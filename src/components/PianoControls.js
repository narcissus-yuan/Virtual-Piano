import Volume from "./Controls/Volume"
import FullScreen from "./Controls/FullScreen"
import Display from "./Controls/Display"
import Note from "./Controls/Note"
import Instrument from "./Controls/Instrument"
import Scale from "./Controls/Scale"
import Metronome from "./Controls/Metronome"

export default function PianoControls(props) {
    return (
        <div className="piano-controls">
            <div className="control-panel-cont">
                <Volume
                    volMute={props.volMute}
                    setVolMute={props.setVolMute}
                    volume={props.volume}
                    setVolume={props.setVolume}
                />
            </div>
            <div className="control-panel-cont" style={{marginLeft: "auto"}}>
                <Display
                    nameOpen={props.nameOpen}
                    setNameOpen={props.setNameOpen}
                    keyOpen={props.keyOpen}
                    setKeyOpen={props.setKeyOpen}
                />
            </div>
            <div className="control-panel-cont">
                <Note
                    adsr={props.adsr}
                    setAdsr={props.setAdsr}
                />
            </div>
            <div className="control-panel-cont">
                <Instrument
                    instrument={props.instrument}
                    setInstrument={props.setInstrument}
                />
            </div>
            <div className="control-panel-cont">
                <Scale
                    scale={props.scale}
                    setScale={props.setScale}
                />
            </div>
            <div className="control-panel-cont">
                <Metronome
                />
            </div>
            <div className="control-panel-cont">
                <FullScreen
                    enterFullScreen={props.enterFullScreen}
                    exitFullScreen={props.exitFullScreen}
                />
            </div>
        </div>
    )
}