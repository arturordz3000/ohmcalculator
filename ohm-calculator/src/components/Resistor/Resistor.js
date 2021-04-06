import './Resistor.css';

function Resistor(props) {
    const bandsConfiguration = props.bandsConfiguration;
    const bands = [];

    for (const [index, value] of bandsConfiguration.entries()) {
        const configuration = value;
        console.log(configuration.position);
        bands.push(<div key={index} className="Resistor-band" style={{ left: configuration.position, backgroundColor: configuration.selectedColor.color }}></div>);
    }

    return (
        <div className="Resistor">
            <div className="Resistor-wire"></div>
            <div className="Resistor-body">
                {bands}
            </div>
            <div className="Resistor-wire"></div>
        </div>
    );
}

export default Resistor;