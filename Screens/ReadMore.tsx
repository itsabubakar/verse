import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';



const ReadMore: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<any>();
    const { title, lines, author }: any = route.params;

    return (
        <View className='bg-black flex-1'>
            <View className='p-6'>
                <ScrollView className='py-6 pb-10'>
                    <Text className='text-white text-2xl pb-4'>{title}</Text>
                    {lines.map((line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, lineIndex: React.Key | null | undefined) => (
                        <Text className=' text-white text-lg' key={lineIndex}>{line}</Text>
                    ))}
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('author', {
                                author: author,
                            });
                        }}
                    >
                        <Text className='text-white text-base py-5'>By {author} lore</Text>

                    </TouchableOpacity>
                </ScrollView>

            </View>

        </View>
    );
};

export default ReadMore;
