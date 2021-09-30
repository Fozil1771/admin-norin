import React from 'react'
import moment from 'moment';
import { useForm } from 'react-hook-form'
import { addOrder } from '../../../redux/orderSlice';
import { useDispatch } from 'react-redux'
import RSelect from '../../Reusable/RSelect';

import { timeOption, daysOption, quantity } from './items'
import toast from 'react-hot-toast';

function OrderForm() {
    // const [dateEvent, setDateEvent] = useState("")
    let month = moment().format("YYYY-MM")
    const { control, register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const dispatch = useDispatch()

    const defaultValues = {
        amount: { value: "", label: "KG" },
        client: "",
        day: { value: "", label: "День" },
        time: { value: "", label: "Время" }
    };


    const handleOrder = (data) => {
        console.log(data)

        let target = data.day?.value

        let today = month + "-" + (target <= 9 ? "0" + target : target)
        // setDateEvent(today)
        console.log(target, today)

        console.log('form', data)

        let formData = {
            id: '_' + Math.random().toString(36).substr(2, 9),
            start: today + "T" + data.time?.value,
            title: data.amount?.value + " кг " + data.client,
            status: 1
        }


        if (data.amount.value && data.time.value && data.day.value) {
            dispatch(addOrder(formData))
            reset(defaultValues)
        } else {
            toast.error('Ошибка')
        }

    }



    return (
        <>
            <form onSubmit={handleSubmit(handleOrder)}>
                <h2 className="fc-toolbar-title title" style={{ marginBottom: "1.5rem" }}>Добавить заказ</h2>
                <div className="modal">
                    <div className="mb-16">
                        {/* <input

                            {...register("day", { required: true })}
                            errors={errors}
                            placeholder="Kun"
                            type="text"
                            onChange={handleOrderDate} />
                        {errors.day && <span className="input_error">Ошибка пустое поле!</span>} */}
                        <RSelect
                            options={daysOption}
                            placeholder="День"
                            register={register}
                            name={"day"}
                            control={control}
                            style={{ border: "none !important" }}

                        />
                    </div>
                    {/* <div className="inputField">
                        <input {...register("time", { required: true })} type="text" placeholder="12:00" errors={errors} />
                        {errors.time && <span className="input_error">Ошибка пустое поле!</span>}
                    </div> */}

                    <div className="mb-16">
                        <RSelect
                            options={timeOption}
                            placeholder="Время"
                            register={register}
                            name={"time"}
                            isSearchable={true}
                            control={control}
                            style={{ border: "none !important" }}
                            border={false}

                        />

                    </div>
                    <div className="inputField d-flex justify-between mb-32">
                        <RSelect
                            options={quantity}
                            placeholder="KG"
                            register={register}
                            name={"amount"}
                            isSearchable={true}
                            control={control}
                            style={{ border: "none !important" }}
                            border={false}
                            width={'25%'}

                        />
                        <div style={{ width: '70%' }}>
                            <input className="input" {...register("client", { required: true })} name="client" type="text" placeholder="" errors={errors} />
                            {errors.client && <span className="input_error">Ошибка пустое поле!</span>}
                        </div>

                    </div>


                    <button type="submit" className="order_btn" disabled={isSubmitting}>Добавить</button>
                </div>
            </form>
        </>
    )
}

export default OrderForm
