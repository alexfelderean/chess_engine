import React, {useState} from 'react';
import styles from './StartButton.module.css'

interface StartButtonProps {
    onClick: () => void;
}

function StartButton({onClick}: StartButtonProps) {
    return (
        <button onClick={() => onClick()}>Start New Game!</button>
    )
}

export default StartButton;