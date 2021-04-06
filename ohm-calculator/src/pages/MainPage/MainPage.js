import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'
import ResistorBandColorConfiguration from '../../models/ResistorBandColorConfiguration';

const numberColors = () => {
    return [
        {color: 'rgb(0, 0, 0)', value: { description: '0', number: 0 }},
        {color: 'rgb(153, 117, 82)', value: { description: '1', number: 1 }},
        {color: 'rgb(255, 255, 122)', value: { description: '10KΩ', number: 10000 }},
        {color: 'rgb(72, 136, 242)', value: { description: '±0.25%', number: 0.25 }},
        {color: 'rgb(255, 57, 57)', value: { description: '2', number: 2 }},
        {color: 'rgb(255, 165, 74)', value: { description: '3', number: 3 }},
        {color: 'rgb(137, 255, 137)', value: { description: '5', number: 5 }},
        {color: 'rgb(240, 144, 246)', value: { description: '7', number: 7 }},
        {color: 'rgb(128, 128, 128)', value: { description: '8', number: 8 }},
        {color: 'rgb(255, 255, 255)', value: { description: '9', number: 9 }},
    ]
}

function MainPage() {
    const bandsConfiguration = [
        new ResistorBandColorConfiguration({rgb: 'rgb(0, 0, 0)', value: { description: '0', number: 0 }}, '20px'),
        new ResistorBandColorConfiguration({rgb: 'rgb(153, 117, 82)', value: { description: '1', number: 1 }}, '40px'),
        new ResistorBandColorConfiguration({rgb: 'rgb(255, 255, 122)', value: { description: '10KΩ', number: 10000 }}, '60px'),
        new ResistorBandColorConfiguration({rgb: 'rgb(72, 136, 242)', value: { description: '±0.25%', number: 0.25 }}, '180px'),
    ];

    return (
        <div className="MainPage">
            <header>
            <h1>Ohms Calculator</h1>
            </header>
            <Resistor bandsConfiguration={bandsConfiguration}/>
        </div>
    )
}

export default MainPage;