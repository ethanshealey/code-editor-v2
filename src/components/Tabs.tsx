import React from 'react'

interface ITabs {
    showOutput: boolean,
    setShowOutput: Function
}

const Tabs = ({showOutput, setShowOutput}: ITabs) => {

    return (
        <div id="tabs">
            <div className={`tab-option noselect ${ !showOutput ? 'tab-option-selected' : '' }`} onClick={() => setShowOutput(false)}>Input</div>
            <div className={`tab-option noselect ${ showOutput ? 'tab-option-selected' : '' }`} onClick={() => setShowOutput(true)}>Output</div>
        </div>
    )
}

export default Tabs