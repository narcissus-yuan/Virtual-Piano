import { useEffect, useState } from "react";

export default function ControlSelect(props) {
    const [keyword, setKeyWord] = useState(props.opt);
    const [iconState, setIconState] = useState("");
    const [opts, setOpts] = useState(<div></div>);
    // const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpts(props.optList
            .filter((opt) => {
                if (!keyword)
                    return true;
    
                let formattedOpt = props.formatOpt(opt);
                let keywordInd = formattedOpt.toLowerCase().indexOf(keyword.toLowerCase());
                if (keywordInd == -1)
                    return false;
    
                return true;
            })
            .map((opt, i) => {
                let formattedOpt = props.formatOpt(opt);
                let keywordElement;
    
                if (keyword) {
                    let keywordInd = formattedOpt.toLowerCase().indexOf(keyword.toLowerCase());
        
                    let pos2 = keywordInd + keyword.length;
                    let seg1 = formattedOpt.slice(0, keywordInd);
                    let seg2 = formattedOpt.slice(keywordInd, pos2);
                    let seg3 = formattedOpt.slice(pos2, formattedOpt.length);
    
                    const markSeg = (
                        <p>
                            {seg1}
                            <mark className="opt-highlight">{seg2}</mark>
                            {seg3}
                        </p>
                    );
    
                    keywordElement = props.formatHtmlOpt
                        ? props.formatHtmlOpt([markSeg, opt[1], opt[2]])
                        : markSeg;
                } else {
                    keywordElement = props.formatHtmlOpt
                        ? props.formatHtmlOpt(opt)
                        : <p>{formattedOpt}</p>
                }
    
                return (
                    <button
                        key={i}
                        className={`opt ${props.name}-opt`}
                        onClick={() => {
                            if (opt === "None") {
                                props.setOpt(null);
                            } else {
                                props.setOpt(opt);
                            }
                            // props.setLoading(true);
                            setKeyWord(null);
                            props.setSelOpen(false);
                        }}
                        tabIndex="0"
                    >
                        {keywordElement}
                    </button>
                )
            })
        );
    }, [keyword]);


    return (
        <div className={`selector ${props.name}-selector`}>
            <div className={`heading ${props.name}-heading`}>
                <div className={`search ${props.name}-search`}>
                    <svg width="40" height="50" id="search-icon1">
                        <circle cx="23" cy="21" r="8" stroke="#d9d8e242" strokeWidth="2" fill="transparent"></circle>
                        <line x1="29" y1="28" x2="37" y2="34" stroke="#d9d8e242" strokeWidth="2"></line>
                    </svg>
                    <svg width="40" height="50" id="search-icon2" className={iconState}>
                        <circle cx="23" cy="21" r="8" stroke="var(--primary-violet-lighter)" strokeWidth="2" fill="transparent"></circle>
                        <line x1="29" y1="28" x2="37" y2="34" stroke="var(--primary-violet-lighter)" strokeWidth="2"></line>
                    </svg>
                </div>
                <input
                    className={`input ${props.name}-input`}
                    value={keyword ? props.formatOpt(keyword) : ""}
                    placeholder={
                        `Search ${props.search}`
                    }
                    onChange={(e) => {
                        setKeyWord(e.target.value);
                    }}
                    onFocus={() => {
                        setIconState("active");
                    }}
                    onBlur={() => {
                        setIconState("");
                    }}
                />
            </div>
            <div
                className={`options ${props.name}-options`}
            >
                <div className={`result ${props.name}-result`}>
                    {
                        (opts.length
                        ? opts.length
                        : "No")
                        + " matching results"
                    }
                </div>
                {opts}
            </div>
        </div>
    )
}