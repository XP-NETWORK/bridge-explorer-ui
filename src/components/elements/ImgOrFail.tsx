import React, {useState} from 'react'

import failImage from '../../assets/img-broken.png'

export const ImgOrFail = ({
    src,
    className,
    width,
    height
} : {
    src: string;
    className:string;
    width: number;
    height: number
}) => {

    const [failed, setFailed] = useState(false)

    return <img src={!failed? src: failImage} alt="" className={className} width={width} height={height} onError={() => setFailed(true)}/>
}