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
  listGroupItemBGColor: '#343A40',
  listGroupItemColor: 'white',
  accordionItemBGColor: 'rgb(36, 39, 41)'
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
`