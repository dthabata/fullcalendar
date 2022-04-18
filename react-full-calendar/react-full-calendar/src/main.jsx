import React from 'react'
import { createRoot } from 'react-dom/client'
import FullEventsCalendar from './FullEventsCalendar'

document.addEventListener('DOMContentLoaded', function () {
  createRoot(document.body.appendChild(document.createElement('div'))).render(
    <FullEventsCalendar />
  )
})
