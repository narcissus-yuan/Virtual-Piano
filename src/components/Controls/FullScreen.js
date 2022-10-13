import { ReactComponent as FullScreenImg } from "./../../icons/fullscreen.svg"
import { ReactComponent as ExitFullScreenImg } from "./../../icons/exit_fullscreen.svg"
import { useState } from "react";

export default function FullScreen(props) {
    const [fullScreen, setFullScreen] = useState(false);

    return (
        <button
            className={`control-panel`}
            tabIndex="0"
        >
            <div
                className="control-panel-pic full-screen-pic"
                onClick={() => {
                    if (fullScreen) {
                        props.exitFullScreen();
                    } else {
                        props.enterFullScreen();
                    }
                    setFullScreen(!fullScreen);
                }}
            >
                {
                    fullScreen
                    ? <ExitFullScreenImg />
                    : <FullScreenImg />
                }
            </div>
        </button>
    )
}