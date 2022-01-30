import {createGlobalStyle} from 'styled-components'

export const lightTheme = {
  body: 'white',
  color: 'black',
  cardBGColor: 'white',
  loginRegisterBackgroundColor: 'white',
  navbarBrandLogoColor: 'white',
  loggedInNavBorder: '1px solid #e9ecef'
}

export const darkTheme = {
  body: '#343A40',
  color: 'white',
  cardBGColor: '#212529',
  listGroupItemBGColor: 'rgb(36, 39, 41)',
  listGroupItemColor: 'white',
  accordionItemBGColor: 'rgb(36, 39, 41)',
  inputBGColor: '#ffffff1a!important',
  inputGroupTextBGColor: '#ffffff1a',
  inputGroupTextColor: 'white',
  inputGroupTextBorder: 'none',
  inputColor: 'white!important',
  inputBorder: '#ffffff1a!important',
  dropdownMenuBGColor: 'rgb(36, 39, 41)',
  dropdownItemColor: 'white',
  dropdownNavigationBarIconContainerBGColor: '#ffffff1a',
  dropdownItemHoverBGColor: '#343a40',
  accordionButtonBGColor: 'rgb(36, 39, 41)',
  accordionButtonColor: 'white',
  paginationBGColor: 'rgb(36, 39, 41)',
  paginationColor: '#0d6efd',
  paginationBorderColor: '#343a40',
  webkitBoxShadow: '0 0 0px 1000px #3b3b3b inset',
  circleBorder: '1px solid white',
  loginRegisterBackgroundColor: '#343A40',
  navbarBrandLogoColor: 'white',
  linksColor: 'white',
  loggedInNavBGColor: '#343A40',
  loggedInNavBorder: '1px solid #ffffff1a',
  dashNavBrandLogoColor: 'white',
  loggedInNavColor: 'white!important'
}

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.color};
  }

  .card {
    background-color: ${props => props.theme.cardBGColor};
  }

  .modal-content {
    background-color: ${props => props.theme.cardBGColor};
  }

  .btn-close {
    background-color: ${props => props.theme.color}
  }

  .list-group-item {
    background-color: ${props => props.theme.listGroupItemBGColor};
    color: ${props => props.theme.listGroupItemColor};
  }

  .accordion-item {
    background-color: ${props => props.theme.accordionItemBGColor};
  }

  .navbar-search-input {
    background-color: ${props => props.theme.inputBGColor};
    border-color: ${props => props.theme.inputGroupTextBorder};
  }

  .navbar-search-input:focus {
    background-color: ${props => props.theme.inputBGColor};
    color: ${props => props.theme.inputColor}
  }

  .input-group-text {
    background-color: ${props => props.theme.inputGroupTextBGColor};
    color: ${props => props.theme.inputGroupTextColor};
    border: ${props => props.theme.inputGroupTextBorder};
  }

  input, select, textarea {
    background-color: ${props => props.theme.inputBGColor};
    border-color: ${props => props.theme.inputBorder};
    color: ${props => props.theme.inputColor};
  }

  input:focus {
    background-color: ${props => props.theme.inputBGColor};
    color: ${props => props.theme.inputColor};
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: ${props => props.theme.webkitBoxShadow};
    -webkit-text-fill-color: ${props => props.theme.inputColor};
  }

  .dropdown-menu {
    background-color: ${props => props.theme.dropdownMenuBGColor};
  }

  .dropdown-item {
    color: ${props => props.theme.dropdownItemColor};
  }

  .dropdown-item:hover {
    background-color: ${props => props.theme.dropdownItemHoverBGColor};
    color: ${props => props.theme.dropdownItemColor};
  }

  .dropdown-navigation-bar-icon-container {
    background-color: ${props => props.theme.dropdownNavigationBarIconContainerBGColor};
  }

  .accordion-button {
    background-color: ${props => props.theme.accordionButtonBGColor};
    color: ${props => props.theme.accordionButtonColor};
  }

  .pagination li.page-item a {
    background-color: ${props => props.theme.paginationBGColor};
    color: ${props => props.theme.paginationColor};
    border-color: ${props => props.theme.paginationBorderColor};
  }

  .save-ban-col > div,
  .exit-selected-job-col > div {
    border: ${props => props.theme.circleBorder};
  }

  .login-form-actual-container,
  .register-form-actual-container,
  .login-form,
  .register-form {
    background: ${props => props.theme.loginRegisterBackgroundColor};
  }

  .navbar-brand-logo {
    color: ${props => props.theme.navbarBrandLogoColor}!important;
  }

  .dashboard-nav-brand-logo {
    color: ${props => props.theme.dashNavBrandLogoColor}!important;
  }

  #nav-bar-links {
    color: ${props => props.theme.linksColor};
  }

  .logged-in-navbar,
  .logged-out-dash-nav {
    border-bottom: ${props => props.theme.loggedInNavBorder};
    background: ${props => props.theme.loggedInNavBGColor};
  }

  .logged-in-nav-brand-logo,
  .navigation-bar-icon-container,
  a {
    color: ${props => props.theme.loggedInNavColor};
  }

`