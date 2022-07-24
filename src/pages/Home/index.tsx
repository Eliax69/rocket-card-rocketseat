import './style.css'
import logo from './assets/logo.svg'
import followers from './assets/followers.svg'
import following from './assets/following.svg'
import repository from './assets/repository.svg'
import company from './assets/company.svg'
import location from './assets/location.svg'
import { useState, useEffect } from 'react'

function App() {

  type UserType = {
    login: string,
    avatar_url: string,
    followers: number,
    following: number,
    public_repos: number,
    company: string,
    location: string
  }

  const [user, setUser] = useState<UserType>({} as UserType)
  const [toSearch, setToSearch] = useState<string>()
  const [cardColor, setCardColor] = useState<string>()

  useEffect(() => {
    toSearch ? (
      fetch(`https://api.github.com/users/${toSearch}`).then(response => response.json()).then((data: UserType) => {
      setUser(data)
      })
    ) : null
  }, [toSearch])

  function randomColor() {
    setCardColor('#' + Math.floor(Math.random() * 16777215).toString(16))
  }

  function searchCard(){
    const inputCard = document.getElementById('inputCard');
    setToSearch(inputCard?.value)
  }

  const userBackground = {
    backgroundImage: `url(${user.avatar_url})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
  }

  const rocketCardStyle = {
    backgroundColor: cardColor
  }

  return (
    <div className='container'>
      <div className='rocket-container'>
        <h1>Compartilhe seu #rocketcard</h1>
        <div style={rocketCardStyle} className='rocket-card'>
          <div className='card'>
            <div className='card-title'>
              <img src={logo} onClick={searchCard} title='Clique aqui após inserir o seu nome' alt="Logo Rocketseat"/>
              <input id='inputCard' type="text" placeholder='Your github name:'/>
            </div>
            <div style={userBackground} className='card-image'>

            </div>
            <div className='card-info'>
              <div className='box-info'>
                <img src={followers}/>
                <span>{user.followers} Seguidores</span>
              </div>
              <div className='box-info'>
                <img src={following}/>
                <span>{user.following} Seguindo</span>
              </div>
              <div className='box-info'>
                <img src={repository}/>
                <span>{user.public_repos} Repositórios</span>
              </div>
              <div className='box-info'>
                <img src={company}/>
                <span>{user.company}</span>
              </div> 
              <div className='box-info'>
                <img src={location}/>
                <span>{user.location}</span>
              </div>
            </div>
            <div className='card-footer'>
                <img src={logo}/>
                <span>ROCKETCARD</span>
              </div>
          </div>
        </div>
      </div>
      <div className='custom-card'>
        <h2>Customizar RocketCard</h2>

        <button type='button' onClick={randomColor}>Gerar background</button>
      </div>
    </div>
  )
}

export default App
