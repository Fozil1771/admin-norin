import React, { useState, useRef } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import OrderForm from '../AddOrder/OrderForm'
import timeGridPlugin from '@fullcalendar/timegrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import interactionPlugin from '@fullcalendar/interaction'
import { deleteOrder, editStatus } from '../../../redux/orderSlice';
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast';
import Stats from '../StatisticsOrder/Stats';



function Calendar() {
    // Initialize Firebase
    const [classArchive, setClassArchive] = useState('')
    const orderStore = useSelector((state) => state.order.orderAll)

    const dispatch = useDispatch()
    console.log(orderStore)

    const CalendarRef = useRef()
    // const [events, setEvents] = useState([{ id: 1, start: "2021-08-20T15:00", title: "1kg" }])

    // const [order, setOrder] = useState()


    const removeOrder = (t, clickInfo) => {
        toast.dismiss(t.id)
        dispatch(deleteOrder(clickInfo.event.id))
    }
    const archiveOrder = (t, clickInfo) => {
        toast.dismiss(t.id)
        dispatch(editStatus(clickInfo.event.id))

    }
    // const reArchive = (t, clickInfo) => {
    //     if (toast.dismiss(t.id))
    //         dispatch(backStatus(clickInfo.event.id))
    // }


    const handleEventClick = (clickInfo) => {
        console.log(clickInfo.event.extendedProps.status)
        console.log(clickInfo.event.id)
        // clickInfo.el.classList.add('archived')
        console.log(clickInfo.view)
        dispatch(editStatus(clickInfo.event.id))

        toast((t) => (
            <div className="d-flex flex-column justify-end" style={{ width: '200px' }}>
                <span>Выберите опцию: </span>
                <div className="d-flex justify-between w-100 mt-8">
                    <button onClick={() => archiveOrder(t, clickInfo)} className="btn btn-small btn__blue mt-8" style={{ width: '100%', fontSize: '12px', padding: '2px', margin: '2px' }}>
                        Архивировать
                    </button>
                    <button onClick={() => removeOrder(t, clickInfo)} className="btn btn-small btn__red mt-8" style={{ width: '100%', fontSize: '12px', padding: '2px', margin: '2px' }}>
                        Удаилить
                    </button>
                    {/* <button onClick={() => reArchive(t, clickInfo)} className="btn btn-small btn__blue mt-8" style={{ width: '100%', fontSize: '12px', padding: '2px', margin: '2px' }}>
                        Ре-архивировать
                    </button> */}
                </div>

            </div>
        ));

        // let p = prompt()
        // if (p === "yes") {
        //     // clickInfo.event.remove()
        //     // setEvents(events.filter(e => e.id !== clickInfo.event.id))
        //     dispatch(editOrder(clickInfo.event.id))
        //     // clickInfo.el.classList.add('archived')
        //     console.log(clickInfo.event.id)


        // }

    }




    // "1.23-45/6$7.8,9".replace(/[^0-9]/g, '') //filtering out numbers from array
    // orderStore.map(kg => {
    //     return console.log(kg.title.replace(/[^0-9]/g, ''))
    // })





    // const handleEventAdd = () => {
    //     const calendarApi = CalendarRef.current.getApi()
    //     calendarApi.unselect()

    //     // if (order) {
    //     //     let newEvents = [{ id: new Date() + Math.random(), start: order.day + "T" + order.time, title: order.amount, }, ...events,]
    //     //     setEvents(newEvents)

    //     // }
    //     setOrder(null)
    //     console.log(order)
    // }

    // const ordersChange = (info) => {
    //     // console.log("change", info)
    //     dispatch(addOrder(info.event, ...orderStore))
    // }

    const handleClassName = (args) => {
        if (args.event.extendedProps.status === 0) {
            return 'archived'
        } else {
            return ''
        }
        // console.log("status", st.event.extendedProps.status)
    }


    console.log(orderStore)

    // console.log(moment().startOf('week'));
    // console.log(moment().endOf('week'));


    return (
        <>
            <div className="d-flex main_content" style={{ paddingTop: "40px" }}>

                <div className="order_add">
                    <OrderForm />
                    <Stats />
                </div>
                <section className="main_calendar">
                    <FullCalendar

                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridWeek,timeGridDay,dayGridMonth'
                        }}
                        titleFormat={{ year: 'numeric', month: 'long' }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        selectable={true}
                        initialView="dayGridMonth"
                        // editable={true}
                        droppable={true}
                        eventClick={(clickInfo) => handleEventClick(clickInfo)}
                        events={orderStore}
                        ref={CalendarRef}
                        locale={ruLocale}
                        navLinks={true}
                        navLinkWeekClick={true}
                        eventTimeFormat={{ // like '14:30:00'
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false
                        }}
                        eventClassNames={handleClassName}
                    // eventChange={ordersChange}


                    />
                </section>



            </div>


        </>
    )
}

export default Calendar
