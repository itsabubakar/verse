import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Logo from '../components/Logo';




const ReadMore: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<any>();
    const { title, lines, author }: any = route.params;

    return (
        <View className='bg-black flex-1'>
            <View className='p-6'>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='mr-[30%]' onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" color={'white'} size={30} />
                    </TouchableOpacity>
                    <View className='justify-center '>
                        <Logo />
                    </View>
                </View>

                <ScrollView className='py-6 pb-10'>
                    <Text className='text-white text-2xl pb-4 font-[cormorantSemiBold] border-b border-[#333333]'>{title}</Text>
                    <View className='pt-4 pb-6 border-b border-[#333333]'>
                        {lines.map((line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, lineIndex: React.Key | null | undefined) => (
                            <Text className='font-[cormorantRegular] text-white text-lg ' key={lineIndex}>{line}</Text>
                        ))}
                    </View>


                    <View className='flex-row gap-4 py-5'>
                        <TouchableOpacity>
                            <Ionicons name="bookmark-outline" color={'white'} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="share-social-outline" color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('author', {
                                author: author,
                            });
                        }}
                    >
                        <Text className='text-[#929292] text-base pb-6 font-[ecsarMedium]'>By {author}</Text>

                    </TouchableOpacity>
                </ScrollView>

            </View>

        </View>
    );
};

export default ReadMore;
