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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import ModalAddEvents from "../ModalAddEvents";

export default function Calendar(props: CalendarProps) {
    const { events, companies } = props
    const router = useRouter()
    const [openDelete, setOpenDelete] = useState(false)
    const [open, setOpen] = useState(false)
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false)
    const [ trash, setTrash ] = useState(undefined)
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
    const handleDeleteClick = async () => {       
          try {
                const pet = await fetch(`/api/companies/event/${trash}`, {
                    method: "DELETE"
                })
                toast({title: "Event Deleted!"})
                router.refresh()
                
            } catch (error) {
                toast({title: "Error", variant: "destructive"})
            }
            setOpenDelete(false)

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
        setTrash(selected.event._def.publicId)
        setOpenDelete(true)
    }

    return (
    <div>
         <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="sm:max-w-[425px] ">
            <DialogHeader>
                <DialogTitle>Delete Task</DialogTitle>
                <DialogDescription>Do you want to delete this task? </DialogDescription>
                <div className=" flex gap-x-5 md:justify-end justify-center">
                    <Button className="mt-5" variant="default" onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button className="mt-5" variant="destructive" onClick={() => handleDeleteClick()}>Delete</Button>
                </div>
            </DialogHeader>
          
        </DialogContent>
    </Dialog>
        <div className="md:flex gap-x-3">
           
            <div className="w-[200px] relative">
                <div className="overflow-auto absolute left-0 top-0 h-full w-full">
                    <p className=" font-bold mb-3">Tasks List</p>
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