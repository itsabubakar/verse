import { View, Text, ScrollView } from 'react-native'
import Logo from '../components/Logo'
import { useEffect, useState } from 'react'
const Home = () => {
    const [poems, setPoems] = useState([])

    useEffect(() => {
        getPoems()
    }, [])

    const getPoems = async () => {
        const response = await fetch('https://poetrydb.org/title/love/title')
        const data = await response.json()
        console.log(data);
        setPoems(data)
    }
    return (
        <View className='bg-black flex-1'>
            <View>
                <Logo />
                <Text className='text-white'>Home</Text>
                <ScrollView>
                    {
                        poems?.map(({ title }) => {
                            return <Text className='text-white'>{title}</Text>
                        })
                    }
                </ScrollView>

            </View>
        </View>
    )
}
export default Home