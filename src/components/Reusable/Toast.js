import React from 'react'

function Toast({ text, title }) {
    return (
        <div className="custom_toast">
            <h5 className="toast_title">{title}</h5>
            <div className="toast_content">
                <p>{text}</p>
            </div>
            <div className="toast_footer">
                <button className="btn btn__blue">Да</button>
                <button className="btn btn__red">Нет</button>
            </div>
        </div>
    )
}

export default Toast
