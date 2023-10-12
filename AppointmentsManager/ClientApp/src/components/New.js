
export function New(props) {

    return (
        <div className="modal-container">
            <div className="modal-title">New Appointment</div>
            <div className="mt-15">
                <label htmlFor="Title_n">Title</label> <br />
                <input type="text" id="Title_n" maxLength={150} name="title" />
                <span className="ms-10">0/150</span>
            </div>
            <div className="mt-15">
                <label htmlFor="Description_n">Description</label> <br />
                <input type="text" id="Description_n" maxLength={300} name="description" />
                <span className="ms-10">0/300</span>
            </div>
            <div className="mt-15">
                <label htmlFor="Adress_n">Adress</label> <br />
                <input type="text" id="Adress_n" maxLength={100} name="adress" />
                <span className="ms-10">0/100</span>
            </div>
            <div className="mt-15">
                <label className="me-10" htmlFor="LevelOfImportance_n">Importance</label>
                <select name="LevelOfImportance" id="LevelOfImportance_n" defaultValue={2}>
                    <option value={5}>Very High</option>
                    <option value={4}>High</option>
                    <option value={3}>Medium</option>
                    <option value={2}>Normal</option>
                    <option value={1}>Low</option>
                    <option value={0}>Very Low</option>
                </select>
            </div>
            <div className="mt-15">
                <label className="me-10" htmlFor="Date_n">Date</label>
                <input type="date" id="Date_n" name="date" />
            </div>
            <div className="mt-15">
                <label className="me-10" htmlFor="Time_n">Time</label>
                <input type="date" id="Time_n" name="date" />
            </div>
        </div>
    )

}