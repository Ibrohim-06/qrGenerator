import { Button, Input } from 'antd'
import React from 'react'

const UrlInput = ({handleUrlSubmit, url, setUrl}) => {
    return (
        <form onSubmit={handleUrlSubmit} className='flex flex-col gap-5'>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} size='large' placeholder='urlni kiriting' required isLoading={true} />
            <Button size='large' htmlType='submit' type='primary'>Yaratish</Button>
        </form>
    )
}

export default UrlInput