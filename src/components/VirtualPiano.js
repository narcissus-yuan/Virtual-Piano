import { useEffect, useReducer, useRef, useState } from "react"
import Piano from "./Piano"
import PianoControls from "./PianoControls";
import Notepad from "./Notepad";
import { keyNote, noteName, noteState, shiftKey } from "./Arrays"

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export default function VirtualPiano() {
    const [instrument, setInstrument] = useState("bright_acoustic_piano");
    const [scale, setScale] = useState(null);
    const [volume, setVolume] = useState(8);
    const [volMute, setVolMute] = useState(false);

    const [adsr, setAdsr] = useState({
        "attack": 0.0,
        "sustain": 2.5,
        "decay": 0.0,
        "release": 1.0,
    });

    const pianoCtx = useRef(null);

    let enterFullScreen = () => {
        if (pianoCtx.current.requestFullscreen) {
            pianoCtx.current.requestFullscreen();
        } else if (pianoCtx.current.webkitRequestFullscreen) {
            pianoCtx.current.webkitRequestFullscreen();
        } else if (pianoCtx.current.msRequestFullscreen) {
            pianoCtx.current.msRequestFullscreen();
        }
    }

    let exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    let keyReducer = function(state, action) {
        switch (action.type) {
            case "key":
                // console.log('key', state.keyCont + " " + action.key)
                return {
                    keyCont: state.keyCont + " " + action.key,
                    noteCont: state.noteCont,
                }
            case "note":
                // console.log('note', state.noteCont + " " + action.key);
                if (noteName[action.key] !== undefined)
                    return {
                        keyCont: state.keyCont,
                        noteCont: state.noteCont + " " + noteName[action.key],
                    }
                return state;
            case "key edit":
                return {
                    keyCont: action.value,
                    noteCont: state.noteCont,
                }
            case "note edit":
                return {
                    keyCont: state.keyCont,
                    noteCont: action.value,
                }
            default:
                console.error("Error: unknown key state")
        }
    }

    const [keyContState, keyDispatch] = useReducer(keyReducer, { keyCont: "", noteCont: "" })
    const [prevNoteState, setPrevNoteState] = useState(noteState);
    const [curNoteState, setCurNoteState] = useState(noteState);

    let handleKeyDown = (e) => {
        if (e.repeat || e.ctrlKey || e.altKey
            || e.target.matches("input") || e.target.matches("textarea"))
            return;
        
        const lkey = shiftKey[e.key];
        const note = !e.shiftKey ? keyNote[e.key] : keyNote[lkey + "s"]

        if (!note)
            return;

        // console.log("notedown", note);
        setCurNoteState((prevState) => ({
            ...prevState,
            [note]: true,
        }));

        keyDispatch({type: "key", key: e.key});
        keyDispatch({type: "note", key: note});
    }

    let handleKeyUp = (e) => {
        const lkey = shiftKey[e.key];
        const note1 = !e.shiftKey ? keyNote[e.key] : keyNote[lkey + "s"];
        const note2 = keyNote[e.key + "s"] ? keyNote[e.key + "s"] : keyNote[lkey];

        if (!note1 && !note2) {
            return;
        }

        // console.log("noteup", note, curNoteState);
        setCurNoteState((prevState) => ({
            ...prevState,
            [note1]: false,
            [note2]: false,
        }));
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return function cleanup() {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [])

    useEffect(() => {
        window.addEventListener("keyup", handleKeyUp);

        return function cleanup() {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [])

    const [nameOpen, setNameOpen] = useState(false);
    const [keyOpen, setKeyOpen] = useState(false);

    return (
        <>
            <header>
                <h1>Virtual Piano</h1>
                <p className="intro">A virtual piano with an assortment of instruments, scale highlight and metronome options.</p>

                <Notepad
                        keyCont={keyContState.keyCont}
                        noteCont={keyContState.noteCont}
                        keyDispatch={keyDispatch}
                    />
            </header>
            <main ref={pianoCtx}>
                <div className="piano-container">
                    <div className="piano-section">
                        <Piano
                            audioContext={audioContext}
                            instrument={instrument}
                            scale={scale}
                            volume={volume}
                            adsr={adsr}

                            nameOpen={nameOpen}
                            keyOpen={keyOpen}

                            keyDispatch={keyDispatch}
                            prevNoteState={prevNoteState}
                            curNoteState={curNoteState}
                            setPrevNoteState={setPrevNoteState}
                            setCurNoteState={setCurNoteState}
                        />
                    </div>
                    <PianoControls
                        volMute={volMute}
                        setVolMute={setVolMute}
                        volume={volume}
                        setVolume={setVolume}

                        instrument={instrument}
                        setInstrument={setInstrument}
                        scale={scale}
                        setScale={setScale}

                        adsr={adsr}
                        setAdsr={setAdsr}

                        nameOpen={nameOpen}
                        setNameOpen={setNameOpen}
                        keyOpen={keyOpen}
                        setKeyOpen={setKeyOpen}

                        enterFullScreen={enterFullScreen}
                        exitFullScreen={exitFullScreen}
                    />
                </div>
            </main>
            <footer>
                <small>By Narcissa Yuan</small>
            </footer>
        </>
    )
}