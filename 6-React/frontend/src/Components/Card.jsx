const Card = ({title, subtitle, children}) => {
    return(
        <article className="activity-card">
            <h3>{title}</h3>
            {subtitle ? <p>{subtitle}</p> : null}
            {children}
        </article>
    )
}
export default Card;