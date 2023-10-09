import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { createContext } from 'react'

const MyContext: any = createContext('')

const ContextProvider = ({ children }: any) => {
    const [bookMarks, setBookMarks] = useState([]);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if (jsonValue != null) {
                setBookMarks(JSON.parse(jsonValue));
            } else {
                console.log('no bookmarks');
                setBookMarks([]);
            }
        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    useEffect(() => {
        getData()
    }, [])

    return (
        <MyContext.Provider value={{
            bookMarks,
            setBookMarks
        }}>
            {children}
        </MyContext.Provider>
    )
}

export { ContextProvider, MyContext }