
import { useEffect } from "react"
import { activeId, closeModal, deleteAppointmen } from "./Lib"

export function Delete(props) {

    const deleteApp = () => {
        deleteAppointmen(activeId.id).then(r => {
            console.log("Deleted successfully : ", r)
            props.refreshApp(Math.random() * 125 * Math.random())
        }).catch(e => console.log("Could not delete the appointment: ", e))

        closeModal("delete-modal");
    }

    useEffect(() => {
        console.log("Delete component")
    }, [props.stateListener])

    return (
        <div className="modal-container">
            <div className="modal-title">Waiteng deleting the Appointment</div>
            <p>Are you sure you want to delete Appointment?</p>

            <div>
                <div className="content-center-vertical">
                    <div className="mt-25 me-15 rowbom">
                        <div className="btn hdr" onClick={() => closeModal("delete-modal")}>Cancel</div>
                        <div className="btn ms-10 hdr" onClick={deleteApp}>Yes</div>
                    </div>
                </div>
            </div>
        </div>
    )

}