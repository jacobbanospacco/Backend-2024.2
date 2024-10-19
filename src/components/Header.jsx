import logo from '../assets/images/logo_igp_normal.png'

export const Header = () => {
  return (
    <header className="flex place-content-between items-center mb-5">
      <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto' }} />
    </header>
  )
}
