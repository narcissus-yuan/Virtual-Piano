import { useState, useEffect, useRef } from "react"

export default function ControlNum(props) {
    const canvasRef = useRef(null)
    const [value, setValue] = useState(props.value);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let dpi = window.devicePixelRatio;

        function fix_dpi() {
            let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);//get CSS width
            let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);//scale the canvas
            canvas.setAttribute('height', style_height * dpi);
            canvas.setAttribute('width', style_width * dpi);
        }

        fix_dpi();

        ctx.lineWidth = 30;
        ctx.strokeStyle = "#d9d8e279";

        ctx.beginPath();
        ctx.arc(200, 200, 170, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = "#818cf8";
        ctx.beginPath();
        ctx.arc(200, 200, 170, 0,
            (value - props.minVal) / (props.maxVal - props.minVal) * 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }, [value])

    return (
        <div className={`number-cont ${props.name}-number-cont`}>
            <div className={`value-select ${props.name}-value-select`}>
                <canvas
                    ref={canvasRef}
                    width="400"
                    height="400"
                />
                <div className="input-cont">
                    <input
                        type="number"
                        name={props.name}
                        value={value}
                        min={props.minVal}
                        max={props.maxVal}
                        onChange={(e) => {setValue(e.target.value)}}
                    />
                    <div className="input-warning">Invalid Input</div>
                </div>
            </div>
        </div>
    )
}