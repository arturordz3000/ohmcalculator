import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'
import ResistorConfiguration from '../../models/ResistorConfiguration';
import { useEffect, useState } from 'react';
import BandColorSelector from '../../components/BandColorSelector/BandColorSelector';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';

const apiUrl = 'http://localhost:3000'

function MainPage() {
    const state = useState({ resistorConfiguration: [], bandColorSelectorConfiguration: [] });
    const [mainPageState, setMainPageState] = state;

    const [calculate, setCalculate] = useState();

    const calcState = useState({ isCalculating: false, calculationResult: null })
    const [calculationState, setCalculationState] = calcState;

    useEffect(() => {
        const onError = (err) => {
            alert('An error occured. The page will be reloaded.');
            window.location.reload();
        };

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
            }, onError);
        }, onError);
    }, []);

    useEffect(() => {
        if (!mainPageState.resistorConfiguration || !mainPageState.resistorConfiguration.length) {
            return;
        }
        
        const value = mainPageState.resistorConfiguration[0].color.value.number * 10 + mainPageState.resistorConfiguration[1].color.value.number;
        const multiplier = mainPageState.resistorConfiguration[2].color.value.number;
        const tolerance = mainPageState.resistorConfiguration[3].color.value.number;

        fetch(apiUrl + `/calculator?value=${value}&multiplier=${multiplier}&tolerance=${tolerance}`)
        .then(results => results.json())
        .then(data => {
            setCalculationState({ isCalculating: false, calculationResult: { successful: true, response: data.result } });
        }, error => {
            setCalculationState({ isCalculating: false, calculationResult: { successful: false, error: error.toString() } });
        });
    }, [calculate]);

    return (
        <div className="MainPage">
            <header>
            <h1>Ohms Calculator</h1>
            </header>
            <Resistor configuration={ mainPageState.resistorConfiguration }/>
            <BandColorSelector configuration={ mainPageState.bandColorSelectorConfiguration } onColorSelected={ (rowIndex, colorIndex) => onColorSelected(state, rowIndex, colorIndex) }/>
            { renderCalculateSection(calcState, setCalculate) }
            { renderResultsSection(calcState) }
        </div>
    )
}

function onColorSelected(state, rowIndex, colorIndex) {
    const [mainPageState, setMainPageState] = state;

    const newMainPageState = { ...mainPageState };
    newMainPageState.resistorConfiguration[rowIndex].color = mainPageState.bandColorSelectorConfiguration[rowIndex].colors[colorIndex];

    setMainPageState(newMainPageState);
}

function renderCalculateSection(state, setCalculate) {
    const [calculationState] = state;
    const isCalculating = calculationState.isCalculating;

    if (isCalculating) {
        return (
            <div className="MainPage-section">
                Calculating...
            </div>
        );
    } else {
        return (
            <div className="MainPage-section">
                <Button variant="primary" onClick={() => onCalculateButtonClick(state, setCalculate)}>Calculate</Button>
            </div>
        );
    }
}

function onCalculateButtonClick(state, setCalculate) {
    const [calculationState, setCalculationState] = state;

    setCalculate({});
    setCalculationState({ isCalculating: true, calculationResult: null });
}

function renderResultsSection(state) {
    const [calculationResultState] = state;
    const calculationResult = calculationResultState.calculationResult;

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