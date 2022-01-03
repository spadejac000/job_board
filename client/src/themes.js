import {createGlobalStyle} from 'styled-components'

export const lightTheme = {
  body: 'white',
  color: 'black',
  cardBGColor: 'white'
}

export const darkTheme = {
  body: '#343A40', 
  color: 'white',
  cardBGColor: 'rgb(36, 39, 41)',
  listGroupItemBGColor: 'rgb(36, 39, 41)',
  listGroupItemColor: 'white',
  accordionItemBGColor: 'rgb(36, 39, 41)',
  inputBGColor: 'rgb(36, 39, 41)',
  inputGroupTextBGColor: 'rgb(36, 39, 41)',
  inputGroupTextColor: 'white',
  inputGroupTextBorder: 'rgb(36, 39, 41)',
  inputColor: 'white!important', 
  inputBGColor: 'rgb(36, 39, 41)!important',
  inputBorder: 'rgb(36, 39, 41)!important',
  dropdownMenuBGColor: 'rgb(36, 39, 41)',
  dropdownItemColor: 'white',
  dropdownNavigationBarIconContainerBGColor: '#ffffff1a',
  dropdownItemHoverBGColor: '#343a40',
  accordionButtonBGColor: 'rgb(36, 39, 41)',
  accordionButtonColor: 'white',
  paginationBGColor: 'rgb(36, 39, 41)',
  paginationColor: '#0d6efd',
  paginationBorderColor: '#343a40'
}

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.color};
  }

  .card {
    background-color: ${props => props.theme.cardBGColor};
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
    border-color: ${props => props.theme.inputGroupTextBorder};
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

`