import './Resistor.css';

function Resistor(props) {
    const bandsConfiguration = props.bandsConfiguration;
    const bands = [];

    for (const [index, value] of bandsConfiguration.entries()) {
        const configuration = value;
        bands.push(
            <div key={index} 
                 title={configuration.color.value.description} 
                 className="Resistor-band" 
                 style={{ left: configuration.position, backgroundColor: configuration.color.rgb }}>
            </div>
        );
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