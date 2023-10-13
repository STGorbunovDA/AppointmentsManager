import React, { useState } from 'react';

export function Edit(props) {

    const [titlelength, setTitleLength] = useState(0);
    const [adresslength, setAdressLength] = useState(0);
    const [deslength, setDesLength] = useState(0);

    // Universal input change handler
    const newData = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'title':
                setTitleLength(value.length);
                break;
            case 'adress':
                setAdressLength(value.length);
                break;
            case 'description':
                setDesLength(value.length);
                break;
            // other cases can be added if needed
            default:
                break;
        }
    };

    return (
        <div className="modal-container">
            <div className="ms-10 modal-title">Edit Appointment</div>
            <div className="rowbom">
                <div className="mt-15 me-15">
                    <label className="hdr" htmlFor="Title_e">Title {titlelength}/150</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Title_e" maxLength={150} name="title" onChange={newData} />
                    {/* <span className="ms-10">0/150</span> */}
                </div>
                <div className="mt-15">
                    <label className="hdr" htmlFor="Adress_e">Adress {adresslength}/100</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Adress_e" maxLength={100} name="adress" onChange={newData} />
                    {/* <span className="ms-10">0/100</span> */}
                </div>
            </div>

            <div className="mt-15">
                <label className="hdr" htmlFor="Description_e">Description {deslength}/300</label> <br />
                <textarea id="Description_e" maxLength={300} name="description" cols={102} rows={10} onChange={newData} />
                {/* <span className="float-right me-10">/300</span> */}
            </div>
            <div className="content-center-vertical">
                <div className="mt-15 ms-10">
                    <label className="me-10" htmlFor="LevelOfImportance_e">Importance</label>
                    <select name="LevelOfImportance" id="LevelOfImportance_e" defaultValue={2}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
                <div className="mt-15 ms-10">
                    <label className="me-10 hdr" htmlFor="Date_e">Date</label>
                    <input type="date" id="Date_e" name="date" />
                </div>
                <div className="mt-15 ms-10 hdr">
                    <label className="me-10" htmlFor="Time_e">Time</label>
                    <input type="date" id="Time_e" name="date" />
                </div>

                <div className="ms-10 mt-15">
                    <label className="hdr" htmlFor="Done_e">Done</label>
                    <input className="" type="checkbox" id="Done_e" name="Done" />
                </div>

                <div className="ms-10 mt-15">
                    <label className="hdr" htmlFor="Deleted_e">Deleted</label>
                    <input type="checkbox" id="Deleted_e" name="Deleted" />
                </div>
            </div>
            <div className="content-center-vertical">
                <div className="ms-10 mt-25 me-15 rowbom">
                    <div className="btn ms-30 hdr">Cancel</div>
                    <div className="btn ms-10 hdr">Update</div>
                </div>
            </div>
        </div>
    )

}