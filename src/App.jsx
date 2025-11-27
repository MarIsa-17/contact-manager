import Header from './components/Header'
import ContactList from './components/ContactList'
import Footer from './components/footer'

function App() {

  return (
    <div>
      {/* Aquí renderiza los componentes */}
      <Header/>
      <main>
      <ContactList/>
      <Footer/>
      </main>
    </div>
  )
}

export default App;