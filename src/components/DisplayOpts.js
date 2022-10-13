export default function DisplayOpts(props) {
    return (
        <div className="display-opts">
            <button
                className="display-opt"
                onClick={() => {
                    props.setNameOpen(!props.nameOpen)
                }}
            >
                <span className="opt-name">note name</span>
            </button>
            <button
                className="display-opt"
                onClick={() => {
                    props.setKeyOpen(!props.keyOpen)
                }}
            >
                <span className="opt-name">keyboard</span>
            </button>
        </div>
    )
}