import { NavLink } from 'react-router-dom';

export default function LinkToProfile() {
  return (
    <NavLink className="link link-to-profile" to="/profile">
      Аккаунт
      <span className="link-to-profile__icon" />
    </NavLink>
  )
}