import './LanguageSelector.css'
import Flag from './Flag'

export default function LanguageSelector({ selectedLanguage, handleLanguageClick }) {


  return (
    <div className='languageSelection'>
      <Flag handleLanguageClick={handleLanguageClick} selected={selectedLanguage === 'en'} id="english" value='en' src='images/flagUK.png' alt="FlagOfUK" width="100" height='50'/>
      <Flag handleLanguageClick={handleLanguageClick} selected={selectedLanguage === 'fr'} id="french" value='fr' src='images/flagFrance.png' alt="FlagOfFrance" width="100" height='50'/>
    </div>
  )
}