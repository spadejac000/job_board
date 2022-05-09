import {createGlobalStyle} from 'styled-components'

export const lightTheme = {
  body: 'white',
  cardBGColor: 'white',
  loginRegisterBackgroundColor: 'white',
  navbarBrandLogoColor: 'white',
  loggedInNavBorder: '1px solid #e9ecef',
  loggedInNavIconBGColor: '#e4e6eb',
  linksColor: 'rgba(0,0,0,.55)'
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
  selectBorderColor: '#ffffff1a!important',
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
  loggedInNavColor: 'white!important',
  loggedInNavIconBGColor: '#ffffff1a',
  messageSidebarBorder: '1px solid #ffffff1a',
  navTabsBGColor: '#212529',
  navTabsBorder: 'none',
  navTabsColor: 'white',
  navTabsBorderHover: '1px solid #212529',
  hamburgerMenuColor: 'white',
  hamburgerMenuImg: `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E")`
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

  select:-webkit-autofill,
  select:-webkit-autofill:hover, 
  select:-webkit-autofill:focus, 
  select:-webkit-autofill:active,
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
    -webkit-box-shadow: ${props => props.theme.webkitBoxShadow}!important;
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
  a {
    color: ${props => props.theme.loggedInNavColor};
  }

  .navigation-bar-icon-container {
    color: ${props => props.theme.loggedInNavColor};
    background: ${props => props.theme.loggedInNavIconBGColor};
  }

  .message-sidebar,
  .message-sidebar-btn-div {
    border-right: ${props => props.theme.messageSidebarBorder};
  }

  .message-sidebar-tabs {
    border-bottom: ${props => props.theme.messageSidebarBorder}; 
  }

  .nav-tabs .nav-link.active {
    background: ${props => props.theme.navTabsBGColor};
    border: ${props => props.theme.navTabsBorder};
    color: ${props => props.theme.navTabsColor};
  }

  .nav-tabs .nav-link:hover {
    border: ${props => props.theme.navTabsBorderHover};
  }

  .message-sidebar-tabs {
    border-right: ${props => props.theme.messageSidebarBorder};
  }

  .navbar-toggler {
    border-color: ${props => props.theme.hamburgerMenuColor}!important;
  }

  .navbar-toggler-icon {
    background-image: ${props => props.theme.hamburgerMenuImg}!important;
  }

`