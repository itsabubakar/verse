import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LoadingSpinner from '../components/Loading';

interface SearchResult {
    title: string;
    author: string;
    lines: string[];
}

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState<'author' | 'title'>('author');
    const textInputRef = useRef<TextInput | null>(null)
    const navigation = useNavigation<any>();

    // Use useFocusEffect to focus on input when screen becomes focused
    useFocusEffect(
        React.useCallback(() => {
            if (textInputRef.current) {
                textInputRef.current.focus();
            }
        }, [])
    );

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`https://poetrydb.org/${selectedTab}/${query}`);
            const data: SearchResult[] = await response.json();
            console.log(data);

            setSearchResults(data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setIsLoading(false);
        }
    };

    return (
        <View className='bg-black flex-1 px-5'>
            <View className=''>
                <TextInput
                    selectionColor="orange"
                    className='text-white text-2xl font-[eczarRegular] pt-8 pb-2'
                    ref={textInputRef}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View className='flex-row gap-5 pb-2'>
                <TouchableOpacity
                    className={` border-white ${selectedTab === 'author' ? 'border-b-2 border-orange' : ''}`}
                    onPress={() => {
                        setSelectedTab('author')
                        setSearchResults([])
                    }}
                >
                    <Text className='text-white text-xl font-[cormorantMedium] tracking-wide'>Author</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={` border-white ${selectedTab === 'title' ? 'border-b-2 border-orange' : ''}`}
                    onPress={() => {
                        setSelectedTab('title')
                        setSearchResults([])

                    }}
                >
                    <Text className='text-white text-xl font-[cormorantMedium] tracking-wide'>Poem</Text>
                </TouchableOpacity>
            </View>
            {isLoading && (
                <LoadingSpinner />
            )}
            {searchResults.length === 0 && !isLoading && (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-white font-[cormorantSemiBold] text-2xl'>Enter {selectedTab} to search</Text>
                </View>
            )}
            {searchResults.length > 0 && !isLoading && (
                <FlatList

                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        // <View className='border-b border-[#333333] p-5' key={index}>
                        // <Text className='text-white text-2xl pb-4 font-[cormorantSemiBold]'> {poem.title}</Text>
                        // {poem.lines.slice(0, 6).map((line, lineIndex) => (
                        //     <Text className='text-white text-lg font-[cormorantRegular]' key={lineIndex}>{line}</Text>
                        // ))}
                        // {poem.lines.length > 6 && (
                        //     <TouchableOpacity
                        //         onPress={() => {
                        //             navigation.navigate('readmore', {
                        //                 title: poem.title,
                        //                 lines: poem.lines,
                        //                 author: poem.author,
                        //             });
                        //         }}
                        //     >
                        //         <Text className='text-orange-500 py-5'>Read More</Text>
                        //     </TouchableOpacity>
                        // )}
                        //     <TouchableOpacity
                        //         onPress={() => {
                        //             navigation.navigate('author', {
                        //                 author: poem.author,
                        //             });
                        //         }}
                        //     >
                        //         <Text className='text-[#929292] text-lg font-[ecsarMedium]'>By {poem.author}</Text>
                        //     </TouchableOpacity>
                        // </View>
                        <View className='border-b border-[#333333] py-3'>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('readmore', {
                                        title: item.title,
                                        lines: item.lines,
                                        author: item.author,
                                    });
                                }}
                            >
                                <Text className='text-white text-2xl pb-2 font-[cormorantSemiBold]'> {item.title}</Text>
                                {item.lines.slice(0, 6).map((line, lineIndex) => (
                                    <Text className='text-white  text-lg font-[cormorantRegular]' key={lineIndex}>{line}</Text>
                                ))}
                                <Text className='text-white py-4 font-[ecsarMedium]'>{item.author}</Text>

                            </TouchableOpacity>
                        </View>

                    )}
                />
            )}
        </View>
    );
};

export default SearchScreen;
