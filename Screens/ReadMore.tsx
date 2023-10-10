import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyContext } from '../Context';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute } from '@react-navigation/native';

const ReadMore: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation<any>();
    const { title, lines, author }: any = route.params;
    const { bookMarks, setBookMarks } = useContext<any>(MyContext);

    useEffect(() => {
        getData();
    }, []);


    const isBookmarked = bookMarks.some(
        (bookmark: { title: string; author: string }) => bookmark.title === title && bookmark.author === author
    );

    const handlePoem = async () => {
        const poem = {
            title: title,
            lines: lines,
            author: author,
        };

        if (isBookmarked) {
            console.log('book removed');
            Toast.show({
                type: 'info',
                text1: 'Bookmark removed',
                visibilityTime: 2000,
            });

            const updatedBookmarks = bookMarks.filter(
                (bookmark: { title: string; author: string }) => !(bookmark.title === title && bookmark.author === author)
            );
            setBookMarks(updatedBookmarks);
            await addBookMark(updatedBookmarks);
        } else {
            console.log('book added');
            Toast.show({
                type: 'error',
                text1: 'Bookmark added',
                visibilityTime: 2000,
            });
            const updatedBookmarks: any = [...bookMarks, poem];
            setBookMarks(updatedBookmarks);
            await addBookMark(updatedBookmarks);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            if (jsonValue != null) {
                setBookMarks(JSON.parse(jsonValue));
            } else {
                setBookMarks([]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const addBookMark = async (data: any) => {
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('my-key', jsonValue);
        } catch (e) {
            console.log(e);
        }
    };

    const sharePoem = async () => {
        const poemText = `${title}\n\n${lines.join('\n')}\n\nBy ${author}`;

        try {
            const result = await Share.share({
                message: poemText,
                title: 'Share Poem',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared via ${result.activityType}`);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Dismissed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View className='bg-black flex-1'>
            <View className='px-6 pb-6'>
                <View className='flex-row items-center'>
                    <TouchableOpacity className='mr-auto py-2' onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" color={'white'} size={30} />
                    </TouchableOpacity>
                </View>

                <ScrollView className='py-6 pb-10'>
                    <Text className='text-white text-2xl pb-4 font-[cormorantSemiBold] border-b border-[#333333]'>
                        {title}
                    </Text>
                    <View className='pt-4 pb-6 border-b border-[#333333]'>
                        {lines.map(
                            (
                                line: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined,
                                lineIndex: React.Key | null | undefined
                            ) => (
                                <Text
                                    className='font-[cormorantRegular] text-white text-lg '
                                    key={lineIndex}
                                >
                                    {line}
                                </Text>
                            )
                        )}
                    </View>

                    <View className='flex-row gap-4 py-5'>
                        <TouchableOpacity onPress={handlePoem}>
                            <Ionicons
                                name={isBookmarked ? "bookmark" : "bookmark-outline"}
                                color={'white'}
                                size={25}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sharePoem}>
                            <Ionicons name="share-social-outline" color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        className='pb-14'
                        onPress={() => {
                            navigation.navigate('authorpage', {
                                author: author,
                            });
                        }}
                    >
                        <Text className='text-[#929292] text-base pb-6 font-[ecsarMedium]'>
                            By {author}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

export default ReadMore;
