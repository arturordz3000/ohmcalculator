import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'
import BandColorConfiguration from '../../models/BandColorConfiguration';

function MainPage() {
    const bandsConfiguration = [
        new BandColorConfiguration('First band', [{color: '#ff0000', value: { description: '1', number: 1 }}], '20px'),
        new BandColorConfiguration('Second band', [{color: '#0000ff', value: { description: '10KΩ', number: 10000 }}], '30px'),
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