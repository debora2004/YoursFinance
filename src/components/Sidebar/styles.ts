import styled, { keyframes } from "styled-components"; 
export const Container = styled.div`
    width: 320px;
    height: 100%;
    background-color: ${({theme}) => theme.colors.purple[400]};
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
`

export const ContainerLogo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    margin-bottom: 50px;
`


export const Title = styled.div`
    color: ${({theme}) => theme.colors.yellow[100]};
    font-size:22px;
    font-weight: 700;
`

interface ProspMenuItem {
    isActive?: boolean
}

export const MenuItem = styled.div<ProspMenuItem>`
    text-decoration: none;
    width: 100%;
    height: 46px;
    background-color: ${({theme, isActive}) => isActive ? theme.colors.purple[300] : 'transparent'};
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    cursor:pointer;
    transition: background-color .3s ease-in-out ;
`

export const MenuLabel = styled.div`
    color: white;
    margin-top: 1px; 
    text-decoration: none;
`
const rotateInfinity = keyframes`
    from {
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }

`
export const SettingsAnimated = styled.div`
    display: grid;
    place-content: center;
    animation: ${rotateInfinity} 3s linear infinite;
    
`