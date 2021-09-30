import React, { useState } from 'react'
import moment from 'moment';
import { useSelector } from 'react-redux'


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'UZS',

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


function Stats() {

    const [totalOrder, setTotalOrder] = useState(null)
    const [activeBtn, setActiveBtn] = useState('month')
    const orderStore = useSelector((state) => state.order.orderAll)
    // statistics
    const handleTotalOrderMonth = () => {

        //calculating month period 

        const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
        const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');

        let totalMonth = orderStore.filter(m => m.start > startOfMonth && m.start < endOfMonth)

        setTotalOrder(totalMonth.length ? totalMonth.map(item => item.title.replace(/[^0-9]/g, '')).reduce((acc, curr) => +acc + +curr) : 0)
        setActiveBtn('month')
    }

    const handleTotalOrderDay = () => {
        //calculating day period 

        const today = moment().format("YYYY-MM-DD")
        let totalDay = orderStore.filter(m => m.start > today + "T00:00" && m.start < today + "T23:59")

        // 2021-09-12
        setTotalOrder(totalDay.length ? totalDay.map(item => item.title.replace(/[^0-9]/g, '')).reduce((acc, curr) => +acc + +curr) : 0)
        console.log(today)
        setActiveBtn('day')
    }

    const handleTotalOrderWeek = () => {
        //calculating week period 

        let startWeek = moment().startOf('week').add('days', 1).format('YYYY-MM-DD')
        let endWeek = moment().endOf('week').add('days', 1).format('YYYY-MM-DD')


        let totalWeek = orderStore.filter(m => m.start > startWeek && m.start < endWeek)

        setTotalOrder(totalWeek.length ? totalWeek.map(item => item.title.replace(/[^0-9]/g, '')).reduce((acc, curr) => +acc + +curr) : 0)
        setActiveBtn('week')
    }

    return (
        <div className="modal">
            <div className="w-100 d-flex justify-between mb-16">
                <button className={`w-25 btn btn__blue ${activeBtn === "month" ? "active" : ""}`} onClick={handleTotalOrderMonth}>Месяцной</button>
                <button className={`w-25 btn btn__blue ${activeBtn === "week" ? "active" : ""}`} onClick={handleTotalOrderWeek}>Недельный</button>
                <button className={`w-25 btn btn__blue ${activeBtn === "day" ? "active" : ""}`} onClick={handleTotalOrderDay}>Дневной</button>
            </div>

            <span>{totalOrder ? formatter.format(totalOrder * 40000) : 0}</span>
        </div>
    )
}

export default Stats
