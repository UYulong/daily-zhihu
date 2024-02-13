import styled from "styled-components";


export const BannerBox = styled.div`
    height: 375px;
    background: #EEE;
  
    .adm-swiper{
        height: 100%;
    }

    .adm-swiper-item{
        position: relative;
        .adm-image,
        img{
            display: block;
            width: 100%;
            height: 100%;
        }
        .content{
            position: absolute;
            bottom: 20px;
            left: 0;
            z-index: 999;
            box-sizing: border-box;
            padding: 0 10px;
            width: 100%;
            .title{
                font-size: 18px;
                color: #FFF;
                line-height: 28px;
            }
            .author{
                font-size: 12px;
                color: rgba(255,255,255,.7);
                line-height: 28px;
            }
        }
    }
  
    .adm-swiper-indicator{
        left: auto;
        transform: none;
        right: 12px;
        bottom: 12px;
        .adm-page-indicator-dot{
            margin-right: 6px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255,255,255,.5);
            &.adm-page-indicator-dot-active{
                width: 18px;
                border-radius: 3px;
                background: #FFF;
            }
        }
    }
`