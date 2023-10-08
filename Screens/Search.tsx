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
    const [isError, setError] = useState(false);
    const [notFound, setNotFound] = useState(false);
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
            setError(false);
            setNotFound(false)
            setIsLoading(true);
            const response = await fetch(`https://poetrydb.org/${selectedTab}/${query}`);
            const data: any = await response.json();

            // Check if the response status is 404
            if (data.status === 404) {
                setNotFound(true);

            } else {
                setNotFound(false);
                setSearchResults(data);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setError(true)
            setIsLoading(false);
        }
    };

    return (
        <View className='bg-black flex-1 px-5'>
            <View className=''>
                <TextInput
                    selectionColor="orange"
                    className='text-white text-lg font-[eczarRegular] pt-8 pb-2'
                    ref={textInputRef}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
            </View>

            <View className='flex-row pb-4 border-b border-[#333333] justify-between px-5'>
                <TouchableOpacity
                    className={` border-white ${selectedTab === 'author' ? 'border-b-2 border-orange-500' : ''}`}
                    onPress={() => {
                        setSelectedTab('author')
                        setSearchResults([])
                        setNotFound(false)
                    }}
                >
                    <Text className='text-white text-xl font-[cormorantMedium] tracking-wide'>Author</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={` border-white  ${selectedTab === 'title' ? 'border-b-2 border-orange-500' : ''}`}
                    onPress={() => {
                        setSelectedTab('title')
                        setSearchResults([])
                        setNotFound(false)
                    }}
                >
                    <Text className='text-white text-xl font-[cormorantMedium] tracking-wide'>Poem</Text>
                </TouchableOpacity>
            </View>
            {isLoading && (
                <LoadingSpinner />
            )}

            {searchResults.length === 0 && !isLoading && !isError && !notFound && (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-white font-[cormorantSemiBold] text-lg capitalize'>
                        Enter {selectedTab} to search
                    </Text>
                </View>
            )}

            {!isLoading && !isError && notFound && (
                <View className='flex-1 justify-center items-center'>
                    <Text className='text-white font-[cormorantSemiBold] text-lg capitalize'>
                        {selectedTab} not found
                    </Text>
                </View>
            )}

            {isError && (
                <View className='flex-1 justify-center items-center'>
                    <TouchableOpacity onPress={handleSearch}>
                        <Text className='text-white text-lg border-2 border-[#3b3b3b] py-2 px-4 rounded-lg mt-4 font-[cormorantSemiBold]'>Error. Click to retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            {searchResults.length > 0 && !isLoading && !isError && (
                <FlatList

                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

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
