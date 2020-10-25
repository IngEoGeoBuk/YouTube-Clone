import React from 'react'
import { Button } from 'antd';
const CancelLogo = require('../../../assets/images/x-icon.png');

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const BTN_STYLE = {
    marginBottom:"10px", 
    backgroundColor:"red",
    position: "absolute",
    top: 0,
    right: 0
}

export default function Modal({ open, children, onClose }) {
    if(!open) return null

    return (
        <>  
            <div style={OVERLAY_STYLE} />
            <div style={MODAL_STYLES}>
                <Button onClick={onClose} 
                    style={BTN_STYLE}>
                    <img src={CancelLogo}/>
                </Button>
                {/* <button onClick={onClose}>Close Modal</button> */}
                {children}
            </div>
        </>
    )
}
