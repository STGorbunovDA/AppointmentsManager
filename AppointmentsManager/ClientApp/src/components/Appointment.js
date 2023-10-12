
export function Appointment(props) {
    
    const LevelOfImportance = ["Very Low", "Low", "Normal", "Medium", "High", "Very High"]

    return (
        <div className={`rowbom underline ${props.item.deleted ? 'bc-red' : props.item.done ? 'bc-green' : ''}`}>
            <div className="column id">{props.item.ID}</div>
            <div className="column title">{props.item.Title}</div>
            <div className="column description">{props.item.Description}</div>
            <div className={`column importance ${
                props.item.LevelOfImportance === 2  ? 'bc-yellow' :
                props.item.LevelOfImportance === 3  ? 'bc-green' : 
                props.item.LevelOfImportance === 4 ? 'bc-gold' : 
                props.item.LevelOfImportance === 5 ? 'bc-red' : ''}`}>
                    {LevelOfImportance[props.item.LevelOfImportance]}</div>
            <div className="column date">{props.item.Date}</div>
            <div className="column time">{props.item.Time}</div>
            <div className="column adress">{props.item.Adress}</div>
            <div className={`column edit`}>
                <div className={`btn edit`}>Edit</div>
            </div>
            <div className={`column delete ${props.item.deleted ? 'not-allowed' : ''}`}>
                <div className={`btn delete ${props.item.deleted ? 'no-event' : ''}`}>Delete</div>
            </div>

        </div>
    )

}