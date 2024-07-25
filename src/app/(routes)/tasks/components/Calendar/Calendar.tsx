"use client"
import { CalendarProps } from "./Calendar.types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import multiMonthPlugin from "@fullcalendar/multimonth"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js"

import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import ModalAddEvents from "../ModalAddEvents";

export default function Calendar(props: CalendarProps) {
    const { events, companies } = props
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DateSelectArg>()
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        companieSelected: {
            name: "",
            id: ""
        }
    })

    
    const handleDateClick = async (selected: DateSelectArg) => {
        setOpen(true)
        setSelectedItem(selected)

    }
    // Save event 
    useEffect(() => {
        if (onSaveNewEvent && selectedItem?.view.calendar) {
            const calendarApi= selectedItem?.view.calendar
            calendarApi.unselect()

            const newEventPrisma = {
                companyId: newEvent.companieSelected.id,
                title: newEvent.eventName,
                start: new Date(selectedItem.start),
                allDay: false,
                timeFormat: 'H(:mm)'
            }
            fetch(`/api/companies/${newEvent.companieSelected.id}/event`, {
                method: "POST",
                body: JSON.stringify(newEventPrisma)
            })
            .then(() =>  {
                toast({title: "Created Event!"})
                router.refresh()
            })
            .catch((error) => {
                toast({title: "error", variant: "destructive"})
            })
            setNewEvent({
                eventName: "",
                companieSelected: {
                    name: "",
                    id: ""
                }
            })
            setOnSaveNewEvent(false)
        }
    }, [onSaveNewEvent, selectedItem]);

    // Deleted Event
    const HandleEventClick = async (selected: any) => {
        if (window.confirm(
            `Are you sure want to delete this event ${selected.event.title}`
        )) {
            try {
                const pet = await fetch(`/api/companies/event/${selected.event._def.publicId}`, {
                    method: "DELETE"
                })
                toast({title: "Event Deleted!"})
                router.refresh()
            } catch (error) {
                toast({title: "Error", variant: "destructive"})
            }
        }
    }

    return (
    <div>
        <div className="md:flex gap-x-3">
           
            <div className="w-[200px] relative">
                <div className="overflow-auto absolute left-0 top-0 h-full w-full">
                    <p className=" font-bold mb-3">Lista de tareas</p>
                    {events.map((currentEvent) => (
                        <div key={currentEvent.id} className="p-4 rounded-lg shadow-md mb-2  bg-background">
                            <p className="font-bold">{currentEvent.title}</p>
                            <p>{formatDate(currentEvent.start)}</p>

                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 calendar-container">
                <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}  
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth"
                }} 
                height="80vh" initialView="dayGridMonth" weekends={false} events={events}
                eventContent={readerEventContent}
                editable={true}
                selectable={true}
                selectMirror={true}
                select={handleDateClick}
                eventClick={HandleEventClick}>

                </FullCalendar>
            </div>
        </div>
        <ModalAddEvents open={open} setOpen={setOpen} setOnSaveNewEvent={setOnSaveNewEvent} companies={companies} setNewEvent={setNewEvent} />
    </div>
  )
}


function readerEventContent(eventInfo: EventContentArg) {
    return (
        <div className="dark:bg-background bg-white w-full p-1 text-black dark:text-white">
            <i>{eventInfo.event.title}</i>

        </div>
    )
}