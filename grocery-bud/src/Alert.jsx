const Alert = ({ style, msg }) => {
    return(
        <p className={`alert-${style}`}>{msg}</p>
    )
}

export default Alert;
