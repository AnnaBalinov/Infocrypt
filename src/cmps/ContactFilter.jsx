import { useState } from "react"

export function ContactFilter(props) {

    const [value, setValue] = useState('')

    const handleChange = ({ target }) => {
        const value = target.value
        setValue(value)
        props.onChangeFilter(value)
    }

    return (

        <section className="contact-filter">
            <span className="material-icons search-icon">
                search
            </span>
            <input onChange={handleChange} type="text" value={value} />
        </section>
    )
}