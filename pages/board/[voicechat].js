import {useRouter} from 'next/router'
import { useEffect } from 'react'

const voicechat = ()=>{
    const router = useRouter()
    let { voicechat } = router.query
    return (
        <div><h1>Detaul: {voicechat}</h1></div>
    )
}

export default voicechat