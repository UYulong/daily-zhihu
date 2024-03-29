import styled from "styled-components"

export const HomeHeadbox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;

    .avatar{
        width: 34px;
        height: 34px;
        border-radius: 50%;
        overflow: hidden;
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .text{
        display: flex;
        .time{
            margin-right: 15px;
            span{
                display: block;
                line-height: 17px;
                text-align: center;
                font-size: 12px;
                &:nth-child(1){
                    font-size: 16px;
                }
            }
        }
        .title{
            padding-left: 15px;
            line-height: 34px;
            font-size: 20px;
            border-left: 1px solid #DDD;
        }
    }
`