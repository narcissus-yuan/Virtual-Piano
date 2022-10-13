import { useEffect, useRef, useState } from "react"
// import { ReactComponent as TrebleClef } from "./../icons/treble_clef.svg"

const noteInd = { 'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6 }

export default function Sheet(props) {
    const canvasRef = useRef(null);

    let clef = function (ctx, lineTop) {
        const clef = new Image();
        clef.onload = function() {
            ctx.strokeStyle = props.strokeColor;
            ctx.lineWidth = "0.7";
            ctx.drawImage(clef, 55, lineTop - 15);
        };
        clef.src = "/treble_clef.svg";
    }

    let stave = function (ctx, line) {
        ctx.strokeStyle = props.strokeColor;
        ctx.lineWidth = "0.7";

        const lineTop = 180 + line * 80;

        // console.log(clef)
        clef(ctx, lineTop);

        for (let i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(50, lineTop + i * 8);
            ctx.lineTo(650, lineTop + i * 8);
            ctx.stroke();
        }
        ctx.closePath();

        for (let i = 0; i < 4; i++) {
            if (i == 3)
                ctx.lineWidth = "1";
            ctx.beginPath();
            ctx.moveTo(80 + (i + 1) * 141, lineTop);
            ctx.lineTo(80 + (i + 1) * 141, lineTop + 32);
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(85 + 4 * 141, lineTop);
        ctx.lineTo(85 + 4 * 141, lineTop + 32);
        ctx.stroke();
        ctx.closePath();
    }

    let note = function (ctx, note, num, line) {
        const pitch = parseInt(note[note.length - 1]);
        const staveCnt = parseInt(num / 4);

        const lineTop = 180 + line * 80;
        const noteXpos = 100 + num * 30 + staveCnt * 22;
        const noteYdist = (pitch - 5) * 7 + noteInd[note[0]] - 3; // relative to F4
        const noteYpos = lineTop - noteYdist * 4;
        // console.log(noteYpos);

        ctx.fillStyle = props.strokeColor;
        ctx.strokeStyle = props.strokeColor;
        ctx.lineWidth = "1.5";
        ctx.lineCap = "round";

        if (note[1] === "s") {
            const sharp = new Image();
            sharp.onload = function() {
                ctx.strokeStyle = props.strokeColor;
                ctx.lineWidth = "0.7";
                ctx.drawImage(sharp, noteXpos - 18, noteYpos - 4);
            };
            sharp.src = "/sharp.svg";

            // ctx.beginPath();
            // ctx.moveTo(noteXpos - 17, noteYpos + 1);
            // ctx.lineTo(noteXpos - 10, noteYpos - 2);
            // ctx.stroke();

            // ctx.beginPath();
            // ctx.moveTo(noteXpos - 17, noteYpos + 6);
            // ctx.lineTo(noteXpos - 10, noteYpos + 3);
            // ctx.stroke();
            
            // ctx.beginPath();
            // ctx.moveTo(noteXpos - 15, noteYpos - 2);
            // ctx.lineTo(noteXpos - 15, noteYpos + 8);
            // ctx.stroke();
            
            // ctx.beginPath();
            // ctx.moveTo(noteXpos - 11, noteYpos - 4);
            // ctx.lineTo(noteXpos - 11, noteYpos + 6);
            // ctx.stroke();
        }

        ctx.beginPath();
        ctx.ellipse(noteXpos, noteYpos, 5.25, 3.5, -0.15 * Math.PI, 0, 2 * Math.PI);
        ctx.fill();

        ctx.lineWidth = "1";
        ctx.lineCap = "round";
        if (noteYdist < -3) {
            ctx.beginPath();
            ctx.moveTo(noteXpos + 4, noteYpos);
            ctx.lineTo(noteXpos + 4, noteYpos - 27);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(noteXpos - 4, noteYpos);
            ctx.lineTo(noteXpos - 4, noteYpos + 27);
            ctx.stroke();
        }

        ctx.lineWidth = "2";
        if (noteYdist < -9) {
            let lineNum = (-9 - noteYdist) / 2;
            if ((-9 - noteYdist) % 2 == 0) {
                noteYpos -= 4;
            }
            // console.log(note, lineNum);
            for (let i = 0; i < lineNum; i++) {
                ctx.beginPath();
                ctx.moveTo(noteXpos - 8, noteYpos - 8 * i);
                ctx.lineTo(noteXpos + 8, noteYpos - 8 * i);
                ctx.stroke();
            }
            ctx.closePath();
        } else if (noteYdist > 1) {
            let lineNum = (noteYdist - 1) / 2;
            if ((noteYdist - 1) % 2 == 0) {
                noteYpos += 4;
                // console.log(note, noteYpos)
            }
            // console.log(note, lineNum);
            for (let i = 0; i < lineNum; i++) {
                ctx.beginPath();
                ctx.moveTo(noteXpos - 8, noteYpos + 8 * i);
                ctx.lineTo(noteXpos + 8, noteYpos + 8 * i);
                ctx.stroke();
            }
            ctx.closePath();
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;

        ctx.fillStyle = props.fillColor;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = props.strokeColor;
        ctx.font = "36px serif";
        const twidth = ctx.measureText(props.title).width;
        ctx.fillText(props.title, (700 - twidth) / 2, 80);

        ctx.fillStyle = props.strokeColor;
        ctx.font = "18px serif";
        const cwidth = ctx.measureText(props.composer).width;
        ctx.fillText(props.composer, 640 - cwidth, 125);


        stave(ctx, 0);
        let i = 0, line = 0;
        for (let n of props.noteCont.split(' ')) {
            if (n === "")
                continue;
            if (i > 0 && i % 16 == 0) {
                stave(ctx, ++line);
            }
            // console.log(i, n)
            note(ctx, n, (i++) % 16, line);
        }

        // note(ctx, "B2", 0, 0);
        // note(ctx, "C3", 0, 0);
        // note(ctx, "D3", 1, 0);
        // note(ctx, "E3", 2, 0);
        // note(ctx, "F3", 3, 0);
        // note(ctx, "G3", 4, 0);
        // note(ctx, "A3", 5, 0);
        // note(ctx, "B3", 6, 0);
        // note(ctx, "C4", 7, 0);
        // note(ctx, "D4", 8, 0);
        // note(ctx, "E4", 9, 0);
        // note(ctx, "F4", 10, 0);
        // note(ctx, "G4", 11, 0);
        // note(ctx, "A4", 12, 0);
        // note(ctx, "B4", 13, 0);
    }, [props.noteCont]);

    return (
        <div className={`sheet-cont ${props.isSheet ? "open" : "closed"}`}>
            <div className="sheet">
                <canvas
                    ref={canvasRef}
                    width="700"
                    height="890"
                />
            </div>
            <div
                className="modal-bg"
                onClick={() => {props.setIsSheet(false)}}
            />
        </div>
    )
}