import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../event-utils'
import * as S from './styles'

const CompleteCalendar = ({}) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentEvents, setCurrentEvents] = useState([])

  const renderSidebar = () => {
    return (
      <S.SidebarBlock>
        <S.SidebarSection>
          <S.CalendarSubtitle>Instruções</S.CalendarSubtitle>
          <ul>
            <li>
              Selecione as datas e você será solicitado a criar um novo evento;
            </li>
            <li>Arraste, solte e redimensione eventos;</li>
            <li>Clique em um evento para excluí-lo.</li>
          </ul>
          <S.WeekendToggle>
            <label>
              <input
                type='checkbox'
                checked={weekendsVisible}
                onChange={handleWeekendsToggle}
              ></input>
              Incluir os finais de semana!
            </label>
          </S.WeekendToggle>
        </S.SidebarSection>
        <S.SidebarSection>
          <S.CalendarSubtitle>
            Todos os eventos ({currentEvents.length})
          </S.CalendarSubtitle>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </S.SidebarSection>
      </S.SidebarBlock>
    )
  }

  const renderSidebarEvent = (event) => {
    return (
      <li key={event.id}>
        <S.DatesTimesItalic>
          {formatDate(event.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </S.DatesTimesItalic>
        {event.title}
      </li>
    )
  }

  const renderEventContent = (eventInfo) => {
    return (
      <S.DatesTimes>
        {eventInfo.timeText}
        <S.DatesTimesItalic>{eventInfo.event.title}</S.DatesTimesItalic>
      </S.DatesTimes>
    )
  }

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible)
  }

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // limpa a seleção de data

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      })
    }
  }

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Você tem certeza que deseja excluir o evento '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  return (
    <S.CalendarBlock>
      {renderSidebar()}
      <S.CalendarSection>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          initialView='dayGridMonth'
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          initialEvents={INITIAL_EVENTS} // como alternativa, use a configuração "eventos" para buscar de um feed
          select={handleDateSelect}
          eventContent={renderEventContent} // função de renderização personalizada
          eventClick={handleEventClick}
          eventsSet={handleEvents} // chamado após os eventos serem inicializados/adicionados/alterados/removidos
          /* para atualizar um banco de dados remoto quando estes dispararem:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
        />
      </S.CalendarSection>
    </S.CalendarBlock>
  )
}

export default CompleteCalendar
