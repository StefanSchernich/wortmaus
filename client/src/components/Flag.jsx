import './Flag.css'

export default function Flag(props) {
  let className = ''
  if (props.selected) {
    className += 'selected'
  }

  return <img
    className={className}
    id={props.id}
    src={props.src}
    alt={props.alt}
    width={props.width}
    height={props.height}
    onClick={() => props.handleLanguageClick(props.value)}
    ></img>
}