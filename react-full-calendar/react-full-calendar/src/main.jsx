import React from 'react'
import { createRoot } from 'react-dom/client'
import CompleteCalendar from './CompleteCalendar'
import './CompleteCalendar/styles.js'

document.addEventListener('DOMContentLoaded', function () {
  createRoot(document.body.appendChild(document.createElement('div'))).render(
    <CompleteCalendar />
  )
})
