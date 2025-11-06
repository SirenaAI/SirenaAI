import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './DaySelector.css'

const DaySelector = ({ selectedDay, onDayChange }) => {
  const [days, setDays] = useState([])

  useEffect(() => {
    // Generar los nombres de los días
    const dayNames = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb']
    const today = new Date()
    const todayIndex = today.getDay()
    
    const generatedDays = []
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        generatedDays.push({ label: 'Hoy', value: 0 })
      } else {
        const dayIndex = (todayIndex + i) % 7
        generatedDays.push({ 
          label: dayNames[dayIndex].charAt(0).toUpperCase() + dayNames[dayIndex].slice(1), 
          value: i 
        })
      }
    }
    
    setDays(generatedDays)
  }, [])

  return (
    <div className="day-selector">
      {days.map((day) => (
        <button
          key={day.value}
          className={`day-button ${selectedDay === day.value ? 'active' : ''}`}
          onClick={() => onDayChange(day.value)}
        >
          {day.label}
        </button>
      ))}
    </div>
  )
}

DaySelector.propTypes = {
  selectedDay: PropTypes.number.isRequired,
  onDayChange: PropTypes.func.isRequired
}

export default DaySelector
