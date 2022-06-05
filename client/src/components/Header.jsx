import { Link } from 'react-router-dom';
import '../fonts/Pacifico/Pacifico-Regular.ttf'
import './Header.css';

export default function Header(props) {  
  return (
    <Link id='headline' to='/'><h1>Wortmaus</h1></Link>
  );

}