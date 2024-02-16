import styled from "styled-components";

export const PersonalBox = styled.div`
    .baseInfo {
        box-sizing: border-box;
        margin: 20px 0;
        
        .pic {
            display: block;
            margin: 0 auto;
            width: 86px;
            height: 86px;
            border-radius: 50%;
        }
        
        .name {
            line-height: 50px;
            font-size: 18px;
            text-align: center;
            color: #000;
        }
    }

    .tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #000;
        border-bottom: 1px solid #EEE;
    }
`