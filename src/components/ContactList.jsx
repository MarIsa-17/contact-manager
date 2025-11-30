import ContactCard from "./ContactCard"

export default function ContactList() {
  return (
    <div>
      <ContactCard name= "Renato" lastName="Pintado" telefono={982082770} email ="renato10@gmail.com"/>
      <ContactCard name= "Aria" lastName="Nuñez" telefono={99582152} email ="arita03@gmail.com"/>
      <ContactCard name= "Cynthia" lastName="Lopez" telefono={959245125} email ="nlcynthia@gmail.com"/>
    </div>
  )
}
