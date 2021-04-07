import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'
import ResistorConfiguration from '../../models/ResistorConfiguration';
import { useEffect, useState } from 'react';
import BandColorSelector from '../../components/BandColorSelector/BandColorSelector';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';

const apiUrl = 'http://localhost:3000'

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

/*const bandColorSelectorConfiguration = [
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
]*/

function MainPage() {
    const state = useState({ resistorConfiguration: [], bandColorSelectorConfiguration: [], isCalculating: false, calculationResult: null });
    const [mainPageState, setMainPageState] = state;

    useEffect(() => {
        fetch(apiUrl + '/resistor/configuration')
        .then(results => results.json())
        .then(data => {
            const resistorConfigurations = [];
            
            for (const configuration of data) {
                resistorConfigurations.push(new ResistorConfiguration({rgb: configuration.rgb, value: configuration.value}, configuration.position));
            }

            fetch(apiUrl + '/colorSelector/configuration')
            .then(results => results.json())
            .then(data => {
                setMainPageState({...mainPageState, resistorConfiguration: resistorConfigurations, bandColorSelectorConfiguration: data});
            });
        });
    }, []);

    return (
        <div className="MainPage">
            <header>
            <h1>Ohms Calculator</h1>
            </header>
            <Resistor configuration={ mainPageState.resistorConfiguration }/>
            <BandColorSelector configuration={ mainPageState.bandColorSelectorConfiguration } onColorSelected={ (rowIndex, colorIndex) => onColorSelected(state, rowIndex, colorIndex) }/>
            { renderCalculateSection(state) }
            { renderResultsSection(state) }
        </div>
    )
}

function onColorSelected(state, rowIndex, colorIndex) {
    const [mainPageState, setMainPageState] = state;

    const newMainPageState = { ...mainPageState };
    newMainPageState.resistorConfiguration[rowIndex].color = mainPageState.bandColorSelectorConfiguration[rowIndex].colors[colorIndex];

    setMainPageState(newMainPageState);
}

function renderCalculateSection(state) {
    const [mainPageState] = state;
    const isCalculating = mainPageState.isCalculating;

    if (isCalculating) {
        return (
            <div className="MainPage-section">
                Calculating...
            </div>
        );
    } else {
        return (
            <div className="MainPage-section">
                <Button variant="primary" onClick={() => onCalculateButtonClick(state)}>Calculate</Button>
            </div>
        );
    }
}

function onCalculateButtonClick(state) {
    const [mainPageState, setMainPageState] = state;

    setMainPageState({ ...mainPageState, isCalculating: true, calculationResult: null });

    setTimeout(() => setMainPageState({ ...mainPageState, isCalculating: false, calculationResult: { successful: true, response: '10KΩ ±0.25%' } }), 5000);
}

function renderResultsSection(state) {
    const [mainPageState] = state;
    const calculationResult = mainPageState.calculationResult;

    if (calculationResult) {
        if (calculationResult.successful) {
            return (
                <div className="MainPage-section">
                    <Alert variant="success">Result: {calculationResult.response}</Alert>
                </div>
            );
        } else {
            return (
                <div className="MainPage-section">
                    <Alert variant="error">Error: {calculationResult.error}</Alert>
                </div>
            );
        }
    }
}

export default MainPage;