import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useCallback, useEffect, useState } from 'react';

function HorariosAdmin() {
  const [events, setEvents] = useState([]);

  const getColumns = async () => {
    const response = await fetch("http://localhost:8010/horarioprofesor", {
      method: "GET",
    });
    const data = await response.json();
    return data;  
  };
  const getDayOfWeek = (dayName) => {
    const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    return days.indexOf(dayName);
  };

  const transformDataToEvents = (data) => {
    const eventsData = [];
    data.forEach(horario => {
      const diasArray = horario.dias.split(','); // Separar los días si están juntos en un string
      diasArray.forEach(dia => {
        const startDate = calculateStartDate(dia, horario.horainicio);
        const endDate = calculateEndDate(dia, horario.horafinal);
        eventsData.push({
          title: `${horario.nombre} - ${horario.curso}`,
          start: startDate.toISOString(),
          end: endDate.toISOString()
        });
      });
    });
    return eventsData;
  };
  const calculateStartDate = (dia, horaInicio) => {
    const startDate = new Date(); // Crear una nueva fecha para el inicio del evento
    const [hourInicio, minuteInicio] = horaInicio.split(':'); // Obtener la hora de inicio
    startDate.setHours(Number(hourInicio), Number(minuteInicio), 0, 0); // Establecer la hora de inicio del evento
  
    const dayOfWeek = getDayOfWeek(dia); // Obtener el día de la semana correspondiente
    const currentDayOfWeek = startDate.getDay(); // Obtener el día de la semana de la fecha actual
  
    if (dayOfWeek !== currentDayOfWeek) {
      const difference = (7 + dayOfWeek - currentDayOfWeek) % 7; // Calcular la diferencia de días hasta el próximo día de la semana
      startDate.setDate(startDate.getDate() + difference); // Ajustar la fecha al próximo día de la semana
    }
    return startDate;
  };
  
  const calculateEndDate = (dia, horaFin) => {
    const endDate = new Date(); // Crear una nueva fecha para el fin del evento
    const [hourFin, minuteFin] = horaFin.split(':'); // Obtener la hora de fin
    endDate.setHours(Number(hourFin), Number(minuteFin), 0, 0); // Establecer la hora de fin del evento
  
    const dayOfWeek = getDayOfWeek(dia); // Obtener el día de la semana correspondiente
    const currentDayOfWeek = endDate.getDay(); // Obtener el día de la semana de la fecha actual
  
    if (dayOfWeek !== currentDayOfWeek) {
      const difference = (7 + dayOfWeek - currentDayOfWeek) % 7; // Calcular la diferencia de días hasta el próximo día de la semana
      endDate.setDate(endDate.getDate() + difference); // Ajustar la fecha al próximo día de la semana
    }
  
    return endDate;
  };
  

  const fetchDataAndSetAlumno = useCallback(async () => {
    const data = await getColumns();
    const transformedEvents = transformDataToEvents(data);
    setEvents(transformedEvents);
  }, []);

  useEffect(() => {
    fetchDataAndSetAlumno();
  }, [fetchDataAndSetAlumno]);

  return (
    <div>
      <h1>Horarios</h1>
      <div className="d-block m-auto justify-content-center" style={{ width: "75%" }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          weekends={false}
          events={events}
          height="600px"
        />
      </div>
    </div>
  )
}

export default HorariosAdmin;
