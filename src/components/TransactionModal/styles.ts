import styled from "styled-components"; 

interface PropsBtn {
    isIncoming?: boolean;
}

export const BtnCustom = styled.div<PropsBtn>`
    padding:10px;
    height: 50px;
    border-radius: 10px;
    background-color: ${({isIncoming}) => isIncoming ? 'rgba(2, 177, 90, 0.15)' : 'rgba(235, 0, 27, 0.15)' };
    display: grid;
    place-content: center;
    font-size: 24px;
    font-weight: 600;
    color: ${({isIncoming}) => isIncoming ? '#02B15A' : '#E41414'};
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    &:hover{
        opacity: .7;
    }
`