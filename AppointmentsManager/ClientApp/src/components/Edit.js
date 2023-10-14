import React, { useEffect, useState } from 'react';
import { closeModal, entry, updateAppointment } from './Lib';

export function Edit(props) {

    const [titlelength, setTitleLength] = useState(0);
    const [adresslength, setAdressLength] = useState(0);
    const [deslength, setDesLength] = useState(0);
    const [done_, setDone_] = useState(false);
    const [deleted_, setDeleted_] = useState(false);
    const [importance_, setImportance_] = useState(0);
    const [data, setData] = useState({})

    const updateApp = () => {
        console.log("Entry before update: ", entry)
        updateAppointment(entry).then(r => {
            console.log("Update successfully : ", r)
            props.refreshApp(Math.random() * 125 * Math.random())
        })
            .catch(e => console.log("Could not update the appointment: ", e))

        closeModal("edit-modal")
    }

    const defaultData = typeof (entry.date) === "string" ? entry.date.split("T")[0] : ""

    const editApp = (e) => {

        let { name, value } = e.target;

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
            case 'date':
                value = new Date(value).toISOString().split('T')[0]; // обрабатываем новую дату и обновляем состояние
                break;
            case 'levelOfImportance':
                value = Number(value);
                setImportance_(value);
                break;
            case 'done':
                value = e.target.checked;
                setDone_(value)
                break;
            case 'deleted':
                value = e.target.checked;
                setDeleted_(value)
                break;
            case 'time': // handle time input here
                entry[name] = value;
                // Make sure to use setData to trigger re-render if necessary
                setData(currentData => ({ ...currentData, [name]: value }));
                break
            default:
                break;
        }
        // const name_ = e.target.name
        // let v_ = e.target.value
        if (name !== 'time') { // If it's not the time input, we can safely set entry[name]
            entry[name] = value;
        }
    }

    useEffect(() => {
        console.log("Edit component")
        setDone_(entry.done)
        setDeleted_(entry.deleted)
        setImportance_(entry.levelOfImportance)
        setData(entry)
    }, [props.stateListener])

    return (
        <div className="modal-container">
            <div className="ms-10 modal-title">Edit Appointment</div>
            <div className="rowbom">
                <div className="mt-15 me-15">
                    <label className="hdr" htmlFor="Title_n">Title {titlelength}/150</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Title_n" maxLength={150} name="title" defaultValue={data.title} onChange={editApp} />
                    {/* <span className="ms-10">0/150</span> */}
                </div>
                <div className="mt-15">
                    <label className="hdr" htmlFor="Adress_n">Adress {adresslength}/100</label> <br />
                    <input className="TitleAdress_nbom" type="text" id="Adress_n" maxLength={100} name="adress" defaultValue={data.adress} onChange={editApp} />
                    {/* <span className="ms-10">0/100</span> */}
                </div>
            </div>

            <div className="mt-15">
                <label className="hdr" htmlFor="Description_n">Description {deslength}/300</label> <br />
                <textarea id="Description_n" maxLength={300} name="description" cols={102} rows={10} defaultValue={data.description} onChange={editApp} />
                {/* <span className="float-right me-10">/300</span> */}
            </div>
            <div className="content-center-vertical">
                <div className="mt-15 ms-10">
                    <label className="me-10" htmlFor="LevelOfImportance_e">Importance</label>
                    <select id="LevelOfImportance_e" name="levelOfImportance" value={importance_} onChange={editApp}>
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
                    <input type="date" id="Date_e" name="date" defaultValue={defaultData} onChange={editApp} />
                </div>
                <div className="mt-15 ms-10 hdr">
                    <label className="me-10" htmlFor="Time_e">Time</label>
                    <input type="time" id="Time_e" name="time" defaultValue={data.time} onChange={editApp}/>
                </div>

                <div className="ms-10 mt-15">
                    <label className="hdr" htmlFor="Done_e">Done</label>
                    <input type="checkbox" id="Done_e" name="done" checked={done_} onChange={editApp} />
                </div>

                <div className="ms-10 mt-15">
                    <label className="hdr" htmlFor="Deleted_e">Deleted</label>
                    <input type="checkbox" id="Deleted_e" name="deleted" checked={deleted_} onChange={editApp} />
                </div>
            </div>
            <div className="content-center-vertical">
                <div className="ms-10 mt-25 me-15 rowbom">
                    <div className="btn ms-30 hdr" onClick={() => closeModal("edit-modal")}>Cancel</div>
                    <div className="btn ms-10 hdr" onClick={updateApp}>Update</div>
                </div>
            </div>
        </div>
    )

}