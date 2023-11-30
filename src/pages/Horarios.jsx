import { useState } from "react";
import { horariosLunes } from "../mock/Mock";
import { DARKMODE } from "../mock/constVariable";
import { isDark } from "../mock/constFunction";

const Horarios = () => {
  const isDarkModeStored = localStorage.getItem("dark") === DARKMODE.TRUE;
  const isClassNameDark = isDark(isDarkModeStored);
  let today = new Date();
  console.log(today);
  let activeDay;
  let month = today.getMonth();
  let year = today.getFullYear();
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const mockhorario = horariosLunes;

  const HorariosCard = ({ horarios }) => {
    return (
      <div className="container">
        <div className="row">
          {horarios.map((horario, index) => (
            <div key={index} className={"col-12 col-md-6 col-lg-3 mb-3"}>
              <div className="card">
                <div className={"card-body rounded-4" + isClassNameDark}>
                  <h3 className="card-title">{horario.curso}</h3>
                  <p className="card-text ">Hora de inicio: {horario.horaInicio}</p>
                  <p className="card-text">Hora de finalización: {horario.horaFin}</p>
                  <p className="card-text">Profesor: {horario.profesor}</p>
                  <p className="card-text">Aula: {horario.aula}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  
  // Calcular el día de la semana en que comienza el mes (1: Lunes, 2: Martes, ..., 7: Domingo)
  const startDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay();
  
  const daysInMonth = [];
  
  var start = window.performance.now();

  const [dayCard,setDayCard] = useState(false);

  // Llenar los días previos
  for (let x = startDayOfWeek - 1; x > 0; x--) {
      daysInMonth.push(
          <td key={`prev-${x}`} className="day inactive">
              {prevDays - x + 1}
          </td>
      );
  }
  
  // Llenar los días del mes actual
  for (let i = 1; i <= lastDate; i++) {
      daysInMonth.push(
          <td key={i} className="day" onClick={()=>{setDayCard(true)}}>
              {i}
          </td>
      );
  }
  
  // Llenar los días posteriores
  const totalDays = daysInMonth.length;
  for (let x = totalDays; x < 7; x++) {
      daysInMonth.push(
          <td key={`next-${x}`} className="day inactive">
              {x - totalDays + 1}
          </td>
      );
  }
  var end = window.performance.now();
  console.log(`Execution time: ${end - start} msxa`);
  return (
    <div className="w-100">
      <h1>Horarios</h1>
      <div className="container d-flex flex-column position-relative m-auto w-100 h-75">
        <div>
          <div>{months[month] + " del " + year}</div>
          {/*<div>acciones</div>*/}
        </div>
        <div className="table-responsive">
        <table className="w-100">
          <thead>
            <tr className="text-center">
              <th className="mx-2">Lunes</th>
              <th>Martes</th>
              <th>Miércoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sábado</th>
              <th>Domingo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {daysInMonth.slice(0, 7)} {/* Lunes */}
            </tr>
            <tr>
              {daysInMonth.slice(7, 14)} {/* Martes */}
            </tr>
            <tr>
              {daysInMonth.slice(14, 21)} {/* Miércoles */}
            </tr>
            <tr>
              {daysInMonth.slice(21, 28)} {/* Jueves */}
            </tr>
            <tr>
              {daysInMonth.slice(28, 35)} {/* Viernes */}
            </tr>
            <tr>
              {daysInMonth.slice(35, 42)} {/* Sábado */}
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      {dayCard && <HorariosCard horarios={mockhorario}></HorariosCard>}

    </div>
    
  );
};

export default Horarios;
