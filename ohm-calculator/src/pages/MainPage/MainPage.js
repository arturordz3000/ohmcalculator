import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'
import ResistorConfiguration from '../../models/ResistorConfiguration';
import { useEffect, useState } from 'react';
import BandColorSelector from '../../components/BandColorSelector/BandColorSelector';

const numberColors = () => {
    return [
        {rgb: 'rgb(0, 0, 0)', value: { description: '0', number: 0 }},
        {rgb: 'rgb(153, 117, 82)', value: { description: '1', number: 1 }},
        {rgb: 'rgb(255, 57, 57)', value: { description: '2', number: 2 }},
        {rgb: 'rgb(255, 165, 74)', value: { description: '3', number: 3 }},
        {rgb: 'rgb(255, 255, 122)', value: { description: '4', number: 4 }},
        {rgb: 'rgb(137, 255, 137)', value: { description: '5', number: 5 }},
        {rgb: 'rgb(72, 136, 242)', value: { description: '6', number: 6 }},
        {rgb: 'rgb(240, 144, 246)', value: { description: '7', number: 7 }},
        {rgb: 'rgb(128, 128, 128)', value: { description: '8', number: 8 }},
        {rgb: 'rgb(255, 255, 255)', value: { description: '9', number: 9 }}
    ]
}

const bandColorSelectorConfiguration = [
    {
        name: 'First Band',
        colors: numberColors()
    },
    {
        name: 'Second Band',
        colors: numberColors()
    },
    {
        name: 'Multiplier',
        colors: numberColors()
    },
    {
        name: 'Tolerance',
        colors: numberColors()
    }
]

function MainPage() {
    const configurations = [
        new ResistorConfiguration({rgb: 'rgb(0, 0, 0)', value: { description: '0', number: 0 }}, '20px'),
        new ResistorConfiguration({rgb: 'rgb(153, 117, 82)', value: { description: '1', number: 1 }}, '40px'),
        new ResistorConfiguration({rgb: 'rgb(255, 255, 122)', value: { description: '10KΩ', number: 10000 }}, '60px'),
        new ResistorConfiguration({rgb: 'rgb(72, 136, 242)', value: { description: '±0.25%', number: 0.25 }}, '180px'),
    ];

    const state = useState(configurations);
    const [resistorConfigurations] = state;

    return (
        <div className="MainPage">
            <header>
            <h1>Ohms Calculator</h1>
            </header>
            <Resistor configuration={resistorConfigurations}/>
            <BandColorSelector configuration={bandColorSelectorConfiguration} onColorSelected={(rowIndex, colorIndex) => onColorSelected(state, rowIndex, colorIndex)}/>
            <button>Calculate</button>
        </div>
    )
}

function onColorSelected(state, rowIndex, colorIndex) {
    const [resistorConfigurations, setResistorConfigurations] = state;
    const newConfigurations = [...resistorConfigurations];

    newConfigurations[rowIndex].color = bandColorSelectorConfiguration[rowIndex].colors[colorIndex];

    setResistorConfigurations(newConfigurations);
}

export default MainPage;