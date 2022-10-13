// Basic Piano Arrays

export const notes = [
    "C", "Cs", "D", "Ds", "E", "F", "Fs", "G", "Gs", "A", "As", "B"
]

export const keys = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l",
    "z", "x", "c", "v", "b", "n", "m"
]

// Shift-Key to Key

export const shiftKey = {
    "!": "1",
    "@": "2",
    "#": "3",
    "$": "4",
    "%": "5",
    "^": "6",
    "&": "7",
    "*": "8",
    "(": "9",
    ")": "0",
};

for (let i = 10; i < keys.length; i++) {
    shiftKey[keys[i].toUpperCase()] = keys[i];
}

// Piano Properties

export const lowPitch = 2;
export const highPitch = 6;
export const pitches = highPitch - lowPitch + 1;
export const noteCnt = pitches * 12;
export const startInd = 60 - (4 - lowPitch) * 12;

export const hasFlat = [false, true, true, false, true, true, true]
export const hasSharp = [true, true, false, true, true, true, false]

export const noteState = {};

export const pianoNotes = [];
for (let pitch = lowPitch; pitch <= highPitch; pitch++) {
    for (let note of notes) {
        pianoNotes.push(note + pitch);
    }
}

// Key -> Note & Note -> Key

export const keyNote = {}
export const noteKey = {}
export const noteName = {}

let ind = startInd;
for (let i = 0; i < keys.length; i++) {
    noteState[ind] = false;
    keyNote[keys[i]] = ind;
    noteKey[ind] = keys[i];
    noteName[ind] = pianoNotes[ind - startInd];
    ind++;
    if (hasSharp[i % hasSharp.length]) {
        noteState[ind] = false;
        keyNote[keys[i] + "s"] = ind;
        noteKey[ind] = keys[i];
        noteName[ind] = pianoNotes[ind - startInd];
        ind++;
    }
}

// Scales

export const scales = ["None"];
for (let note of notes) {
    scales.push(note + " major");
    scales.push(note + " minor");
}

// Tempos

export const tempos = [
    ["None", 0],
    ["Larghissimo", 10, 20],
    ["Solenne / Grave", 20, 40],
    ["Lento", 40, 60],
    ["Lentissimo", 48],
    ["Largo", 40, 60],
    ["Larghetto", 60, 66],
    ["Adagio", 66, 76],
    ["Adagietto", 70, 80],
    ["Tranquillo", 80],
    ["Andante moderato", 92, 98],
    ["Andante", 72, 76],
    ["Andantino", 73, 83],
    ["Moderato", 108, 120],
    ["Allegretto", 100, 128],
    ["Allegro moderato", 116, 120],
    ["Allegro", 120, 156],
    ["Vivace", 156, 176],
    ["Vivacissimo", 172, 176],
    ["Allegrissimo / Allegro vivace", 172, 176],
    ["Presto", 168, 200],
    ["Prestissimo", 200, 250]
]