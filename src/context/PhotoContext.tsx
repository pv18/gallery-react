import {createContext, useState} from 'react';

const PhotoContext = createContext({
    count: 0,
    inc: () => {},
})

const PhotoProvider = (props:any) => {
    const [count, setCount] = useState(0)

    const inc = () => setCount((c) => c + 1)

    return (
        <PhotoContext.Provider value={{count, inc}}>
            {props.children}
        </PhotoContext.Provider>
    )
}

export {PhotoContext, PhotoProvider}