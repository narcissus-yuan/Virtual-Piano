import { useEffect, useState } from "react"
import Soundfont from 'soundfont-player';
import { pianoNotes, startInd, noteKey, noteCnt } from "./Arrays"

const noteAudio = {};

export default function Piano(props) {
    const [player, setPlayer] = useState(null);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        if (!props.instrument)
            return;
        
        Soundfont.instrument(
            props.audioContext,
            props.instrument,
            {
                gain: props.volume / 2,
                attack: props.adsr["attack"],
                decay: props.adsr["decay"],
                release: props.adsr["release"],
                sustain: props.adsr["sustain"],
            }
        )
        .then(function (instrument) {
            setPlayer(instrument);
        })
    }, [props.volume, props.instrument, props.adsr])

    let playNote = (note) => {
        if (!player)
            return;

        // console.log("play", note);
        noteAudio[note] = player.play(
            note,
            props.audioContext.currentTime,
            { duration: 2.0 }
        );
    }

    let stopNote = (note) => {
        if (!player)
            return;

        if (noteAudio[note])
            noteAudio[note].stop();
    }

    useEffect(() => {
        // console.log("prev", props.prevNoteState);
        // console.log("curr", props.curNoteState);
        let ind = startInd;
        for (let i = 0; i < noteCnt; i++) {
            if (props.prevNoteState[ind] !== props.curNoteState[ind]) {
                if (props.curNoteState[ind]) {
                    playNote(ind);
                } else {
                    stopNote(ind);   
                }
            }
            ind++;
        }
        props.setPrevNoteState(props.curNoteState);
    }, [props.curNoteState])

    const [noteElems, setNoteElems] = useState(null);

    useEffect(() => {
        const noteElements = pianoNotes.map((note, i) => {
            let ind = i + startInd;
            const noteActive = props.curNoteState[ind];
            const noteActiveClass = noteActive ? "active-key" : "non-active-key";
            const noteType = note[1] === "s" ? "black" : "white";
            let noteIsMajor = "";
            if (props.scale && noteType === "white") {
                noteIsMajor = note[0] === props.scale[0];
                noteIsMajor = noteIsMajor ? "major-key" : "minor-key";
            }
    
            return (
                <div
                    key={i}
                    className={`piano-key ${noteType}-key ${noteActiveClass} ${noteIsMajor}`}
                    note={note[0]}
                    note-name={note}                    
                    onMouseDown={() => {
                        playNote(ind);
                        setIsMouseDown(true);
                        props.keyDispatch({type: "key", key: ind});
                        props.keyDispatch({type: "note", key: ind});
                    }}
                    onMouseUp={() => {
                        stopNote(ind);
                        setIsMouseDown(false);
                    }}
                    onMouseEnter={() => {
                        if (!isMouseDown)
                            return;
                        playNote(ind);
                    }}
                    onMouseLeave={() => {
                        stopNote(ind);
                    }}
                >
                    <div className="piano-key-label">
                        <span
                            className={`note-key ${props.keyOpen ? "open" : "closed"}`}
                        >
                            {noteKey[ind]}
                        </span>
                        <span
                            className={`note-name ${props.nameOpen ? "open" : "closed"}`}
                        >
                            {noteType === "white" ? note : note[0] + "♯"}
                        </span>
                    </div>
                </div>
            )
        });
        setNoteElems(noteElements);
    }, [isMouseDown, props.curNoteState, props.scale, props.nameOpen, props.keyOpen])

    return (
        <div
            className="piano"
            onMouseLeave={() => {
                setIsMouseDown(false);
            }}
        >
            {noteElems}
        </div>
    )
}