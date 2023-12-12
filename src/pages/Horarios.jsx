import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DARKMODE } from '../mock/constVariable';
import { isDark } from '../mock/constFunction';

const events = [
  { title: 'Meeting', start: new Date() }
]

const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
const isClassNameDark = isDark(isDarkModeStored);

function HorariosAdmin() {
  return (
    <div>
      <h1>Horarios</h1>
      <div className="d-block m-auto justify-content-center" style={{width: "75%"}}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={false}
        events={events}
        eventContent={renderEventContent}
        height="600px" // Ajusta la altura según tus necesidades, por ejemplo, 600px
        viewClassNames={isClassNameDark}

      />
      </div>
    </div>
  )
}

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

export default HorariosAdmin;