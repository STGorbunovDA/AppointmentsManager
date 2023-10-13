import { useEffect, useState } from "react";
import { Delete } from "./Delete"
import { Edit } from "./Edit"
import { New } from "./New"
import { getDefault, openModal } from "./Lib";

import './components.css';
import { Appointment } from "./Appointment";

export function Home(props) {

  const [dataList, setDataList] = useState([])

  const [refreshData, setRefreshData] = useState(0)

  useEffect(() => {
    getDefault().then(data=>{
      setDataList(data)
    }).catch(e => console.log("Error inside home: ", e))
    
  }, [refreshData])

  return (
    <main>
      <h1>Manage Your Appointments / Dates very easy</h1>
      <p>This powerful web application helps you to manage your dates very easy.</p>
      <div className="add-btn rowbom items-center content-center">
        <div className="btn add" onClick={()=> openModal("new-modal")}>+</div>
      </div>

      <div className="notifications spacer-40"></div>

      <div className="parent-container">
        <section className="rowbom items-center filterBom">
          <div className="rowbom items-center filter-itemsBom">
            <button className="me-15 mt-15" >Clear Filters</button>
            <div>
              <label className="ms-10" htmlFor="All_f">All</label> <br />
              <input type="checkbox" id="All_f" name="All" />
            </div>

            <div>
              <label htmlFor="Done_f">Done</label> <br />
              <input type="checkbox" id="Done_f" name="Done" />
            </div>

            <div>
              <label htmlFor="Deleted_f">Deleted</label> <br />
              <input type="checkbox" id="Deleted_f" name="Deleted" />
            </div>

            <div>
              <label htmlFor="period">Period</label> <br />
              <select name="period" id="period" defaultValue={"4"}>
                <option value="5" disabled>Period</option>
                <option value="4" >Default</option>
                <option value="1" >Today</option>
                <option value="2" >This week</option>
                <option value="3" >Last week</option>
              </select>
            </div>

            <div>
              <label htmlFor="SpecifiedDate">Specified Date</label> <br />
              <input type="date" id="SpecifiedDate" name="SpecifiedDate" />
            </div>

            <div>
              <label htmlFor="SpecifiedTime">Specified Time</label> <br />
              <input type="time" id="SpecifiedTime" name="SpecifiedTime" />
            </div>

            <div>
              <label htmlFor="LevelOfImportance_f">Level Of Importance</label> <br />
              <select name="LevelOfImportance" id="LevelOfImportance_f" defaultValue={8}>
                <option value={8} disabled>Level Of Importance</option>
                <option value={9} >Reset</option>
                <option value={5} >Very High</option>
                <option value={4} >High</option>
                <option value={3} >Medium</option>
                <option value={2} >Normal</option>
                <option value={1} >Low</option>
                <option value={0} >Very Low</option>
              </select>
            </div>
          </div>
        </section>

      </div>

      <div className="rowbom underline hdr">
        <div className="column id">#</div>
        <div className="column title">Title</div>
        <div className="column description">Description</div>
        <div className="column importance">Importance</div>
        <div className="column date">Date</div>
        <div className="column time">Time</div>
        <div className="column adress">Adress</div>
        <div className="column edit">Edit</div>
        <div className="column delete">Delete</div>
      </div>

      {
        dataList.length === 0 ? <div className="rowbom mt-15 waiting">Loading <div className="loading">...</div> </div> :
          dataList.map(item => <Appointment item={item} key={item.id} />)
      }
      <section>
        <section className="modal new-modal hidden">
          <New refreshApp={setRefreshData}/>
        </section>
        <section className="modal edit-modal hidden">
          <Edit />
        </section>
        <section className="modal delete-modal hidden">
          <Delete />
        </section>

      </section>

    </main>
  )

}