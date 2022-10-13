import { useState } from "react"
import Sheet from "./Sheet";

export default function Notepad(props) {
    const [isSheet, setIsSheet] = useState(false);
    const [activePanel, setActivePanel] = useState(1);

    const [title, setTitle] = useState("Title");
    const [composer, setComposer] = useState("Composer");
    const [bg, setBg] = useState("#ffffff");
    const [st, setSt] = useState("#000000");

    return (
        <>
            <Sheet
                title={title}
                composer={composer}
                strokeColor={st}
                fillColor={bg}
                isSheet={isSheet}
                setIsSheet={setIsSheet}
                noteCont={isSheet ? props.noteCont : ""}
            />

            <div className="notepad-cont">
                <div className="notepad-opts">
                    <button
                        className={`notepad-opt ${activePanel === 1 ? "active" : "non-active"}`}
                        onClick={() => setActivePanel(1)}
                        title="keyboard notes"
                    >
                        keyboard
                    </button>
                    <button
                        className={`notepad-opt ${activePanel === 2 ? "active" : "non-active"}`}
                        onClick={() => setActivePanel(2)}
                        title="note name"
                    >
                        note name
                    </button>
                    <button
                        className={`notepad-opt ${activePanel === 3 ? "active" : "non-active"}`}
                        onClick={() => setActivePanel(3)}
                        title="display as sheet music"
                    >
                        sheet music
                    </button>
                </div>
                <div className="notepad">
                    <div className="content-cont">
                        <div
                            className="content-flex"
                            style={{ marginLeft: `calc(${activePanel - 1} * 100% * -1)` }}
                        >
                            <div
                                className={`content-div ${activePanel === 1 ? "active" : "non-active"}`}
                                id="content-keyb"
                            >
                                <label htmlFor="keyb-div">Keyboard notes:</label>
                                <textarea
                                    id="keyb-div"
                                    name="keyb-div"
                                    rows="5"
                                    className="textarea-div"
                                    value={props.keyCont}
                                    onChange={(e) => {
                                        props.keyDispatch({ type: "key edit", value: e.target.value });
                                    }}
                                />
                            </div>
                            <div
                                className={`content-div ${activePanel === 2 ? "active" : "non-active"}`}
                                id="content-note"
                            >
                                <label htmlFor="note-div">Note names:</label>
                                <textarea
                                    id="note-div"
                                    name="note-div"
                                    rows="5"
                                    className="textarea-div"
                                    value={props.noteCont}
                                    onChange={(e) => {
                                        props.keyDispatch({ type: "note edit", value: e.target.value });
                                    }}
                                />
                            </div>
                            <div
                                className={`content-div ${activePanel === 3 ? "active" : "non-active"}`}
                                id="content-note"
                            >
                                <div className="content-label">
                                    <p>Display your notes in sheet music</p>
                                    <p>(Note: this does not specify note length)</p>
                                </div>
                                <div className="setting">
                                    <label htmlFor="stitle">Title</label>
                                    <input
                                        id="stitle"
                                        name="stitle"
                                        value={title}
                                        type='text'
                                        placeholder="Enter title (default: 'Title')"
                                        onChange={(e) => {setTitle(e.target.value)}}
                                    />
                                </div>
                                <div className="setting">
                                    <label htmlFor="scomp">Composer</label>
                                    <input
                                        id="scomp"
                                        name="scomp"
                                        value={composer}
                                        type='text'
                                        placeholder="Enter composer (default: 'Composer')"
                                        onChange={(e) => {setComposer(e.target.value)}}
                                    />
                                </div>
                                <div className="setting">
                                    <label htmlFor="sbg">Background color</label>
                                    <input
                                        id="sbg"
                                        name="sbg"
                                        value={bg}
                                        type='color'
                                        onChange={(e) => {setBg(e.target.value)}}
                                    />
                                </div>
                                <div className="setting">
                                    <label htmlFor="sst">Stroke color</label>
                                    <input
                                        id="sst"
                                        name="sst"
                                        value={st}
                                        type='color'
                                        onChange={(e) => {setSt(e.target.value)}}
                                    />
                                </div>
                                <div className="setting">
                                    <input
                                        id="submit"
                                        name="submit"
                                        value="Submit"
                                        type='submit'
                                        onClick={() => {
                                            setIsSheet(true);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="notepad-btns">
                        <button
                            className="notepad-btn"
                        >
                            Copy
                        </button>
                        <button
                            className="notepad-btn"
                            onClick={() => {
                                if (activePanel === 3)
                                    return;

                                props.keyDispatch({
                                    type: `${activePanel === 1 ? "key" : "note"} edit`,
                                    value: ""
                                })
                            }}
                        >
                            Clear
                        </button>
                        <button
                            className="notepad-btn"
                            onClick={() => {
                                props.keyDispatch({ type: "key edit", value: "" });
                                props.keyDispatch({ type: "note edit", value: "" });
                            }}
                        >
                            Clear both
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}