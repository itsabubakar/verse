import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Key, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { MyContext } from '../Context';

const Bookmarks = () => {
    const navigation = useNavigation<any>();
    const { bookMarks, setBookMarks } = useContext<any>(MyContext);
    const [poems, setPoems] = useState([]);
    const [noPoems, setNoPoems] = useState(false);

    useEffect(() => {
        getData()
        console.log('running again');

    }, [bookMarks])

    const getData = async () => {

        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            // return jsonValue != null ? JSON.parse(jsonValue) : null;
            if (jsonValue != null && jsonValue.length > 2) {
                setPoems(JSON.parse(jsonValue));
                setNoPoems(false)
                console.log(jsonValue);

            } else {
                console.log('no bookmarks');
                setNoPoems(true);
            }
        } catch (e) {
            console.log(e);
            // error reading value
        }
    };

    return (
        <ScrollView className='bg-black'>
            {!noPoems && poems.map((poem: { title: string, lines: string[], author: string }, index: Key | null | undefined) => (
                <View className='border-b border-[#333333] p-5' key={index}>
                    <Text className='text-white text-2xl pb-4 font-[cormorantSemiBold]'> {poem.title}</Text>
                    {poem.lines.slice(0, 6).map((line, lineIndex) => (
                        <Text className='text-white text-lg font-[cormorantRegular]' key={lineIndex}>{line}</Text>
                    ))}
                    {poem.lines.length > 6 && (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('readmore', {
                                    title: poem.title,
                                    lines: poem.lines,
                                    author: poem.author,
                                });
                            }}
                        >
                            <Text className='text-orange-500 py-5 font-[cormorantSemiBold] text-lg'>Read More</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('author', {
                                author: poem.author,
                            });
                        }}
                    >
                        <Text className='text-[#929292] font-[ecsarMedium]'>By {poem.author}</Text>
                    </TouchableOpacity>
                </View>
            ))}

            {
                noPoems && (
                    <View className='mt-[80%] items-center justify-center'>
                        <Text className='text-white text-2xl pb-4 font-[cormorantSemiBold]'>No Bookmarks</Text>
                    </View>
                )
            }
        </ScrollView>
    )
}
export default Bookmarks