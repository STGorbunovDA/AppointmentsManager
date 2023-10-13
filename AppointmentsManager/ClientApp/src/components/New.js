
import React, { useState } from 'react';
import { closeModal, entry, formaredDateToStr, formaredTimeToStr, postAppointment } from './Lib';

export function New(props) {

    const [titlelength, setTitleLength] = useState(0);
    const [adresslength, setAdressLength] = useState(0);
    const [deslength, setDesLength] = useState(0);

    
    const newApp = (e) => {

        let {name, value} = e.target;

        switch(name) {
            case 'title':
                setTitleLength(value.length);
                break;
            case 'adress':
                setAdressLength(value.length);
                break;
            case 'description':
                setDesLength(value.length);
                break;
            case 'date':
                value = new Date(value);
                break;
            case 'levelOfImportance':
                value = Number(value);
                break;
            default:
                break;
        }
        // const name_ = e.target.name
        // let v_ = e.target.value
        entry[name] = value
    }

    const postApp = () => {
        postAppointment(entry).then( r => {
            console.log("Created successfully", r)
            props.refreshApp(Math.random() * 125 * Math.random())
        }).catch(e => console.log("Error happened at posting new app: ", e))

        closeModal("new-modal")
    }

    return (
        <div className="modal-container">
            <div className="ms-10 modal-title">New Appointment</div>
            <div className="rowbom">
                <div className="mt-15 me-15">
                    <label className="hdr" htmlFor="Title_n">Title {titlelength}/150</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Title_n" maxLength={150} name="title" onChange={newApp}/>
                    {/* <span className="ms-10">0/150</span> */}
                </div>
                <div className="mt-15">
                    <label className="hdr" htmlFor="Adress_n">Adress {adresslength}/100</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Adress_n" maxLength={100} name="adress" onChange={newApp}/>
                    {/* <span className="ms-10">0/100</span> */}
                </div>
            </div>

            <div className="mt-15">
                <label className="hdr" htmlFor="Description_n">Description {deslength}/300</label> <br />
                <textarea  id="Description_n" maxLength={300} name="description" cols={102} rows={10} onChange={newApp}/>
                {/* <span className="float-right me-10">/300</span> */}
            </div>
            <div className="content-center-vertical">
                <div className="mt-15 ms-10">
                    <label className="me-10" htmlFor="LevelOfImportance_n">Importance</label>
                    <select name="levelOfImportance" id="LevelOfImportance_n" onChange={newApp} defaultValue={2}>
                        <option value={5}>Very High</option>
                        <option value={4}>High</option>
                        <option value={3}>Medium</option>
                        <option value={2}>Normal</option>
                        <option value={1}>Low</option>
                        <option value={0}>Very Low</option>
                    </select>
                </div>
                <div className="mt-15 ms-10">
                    <label className="me-10 hdr" htmlFor="Date_n">Date</label>
                    <input type="date" id="Date_n" name="date" defaultValue={formaredDateToStr()} onChange={newApp}/>
                </div>
                <div className="mt-15 ms-10 hdr">
                    <label className="me-10" htmlFor="Time_n">Time</label>
                    <input type="time" id="Time_n" name="date" defaultValue={formaredTimeToStr()} onChange={newApp}/>
                </div>
                <div className="ms-10 mt-15 me-15 rowbom">
                    <div className="btn ms-30 hdr" onClick={()=> closeModal("new-modal")}>Cancel</div>
                    <div className="btn ms-10 hdr" onClick={postApp}>Add</div>
                </div>
            </div>

        </div>
    )

}