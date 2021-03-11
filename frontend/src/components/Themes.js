import {createGlobalStyle} from 'styled-components'
export const lightTheme={
    body:'#f5f5f5',
    fontColor :"#eeeeee"
}
export const darkTheme={
    body:'#eeeeee',
    fontColor:'#ffffff'
}
export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
`;
