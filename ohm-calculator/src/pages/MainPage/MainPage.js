import './MainPage.css'
import Resistor from '../../components/Resistor/Resistor'

function MainPage() {
    return (
        <div className="MainPage">
            <header>
            <h1>Ohms Calculator</h1>
            </header>
            <Resistor />
        </div>
    )
}

export default MainPage;