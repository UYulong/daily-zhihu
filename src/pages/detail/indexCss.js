const { default: styled } = require("styled-components");

export const DetailBox = styled.div`
    .content {
        overflow-x: hidden;
        margin: 0;
        padding-bottom: 45px;
        .img-place-holder {
            overflow: hidden;
            img {
                margin: 0;
                width: 100%;
                min-height: 100%;
            }
        }
        .meta {
            .avatar {
                display: inline-block;
                margin-top: 0;
                margin-bottom: 0;
            }
        }
    }

    .tab-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        background: #DDD;
        display: flex;
        align-items: center;
        .back {
            box-sizing: border-box;
            width: 50px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            font-size: 20px;
            font-weight: 900;
            border-right: 1px solid #CCC;
        }
        .icons {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 25px;
            line-height: 25px;
            .adm-badge-wrapper,
            span {
                flex-grow: 1;
                text-align: center;
                font-size: 20px;
            }
            span {
                &:nth-last-of-type(1) {
                    color: #AAA;
                }
                &:nth-of-type(1) {
                    &.stored {
                        color: #108ee9;
                    }
                }
            }
            .adm-badge-wrapper {
                .adm-badge-fixed {
                    right: 12.5%;
                }
                .adm-badge {
                    background: none;
                    .adm-badge-content {
                        color: #555;
                    }
                }
            }
        }
        .adm-spin-loading{
            margin: 0 auto;
            width: 20px;
            height: 20px;
        }
    }
`