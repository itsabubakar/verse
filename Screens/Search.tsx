import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface SearchResult {
    title: string;
    author: string;
    lines: string[];
}

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const textInputRef = useRef<TextInput | null>(null);
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
            const response = await fetch(`https://poetrydb.org/author/${query}`);
            const data: SearchResult[] = await response.json();
            console.log(data);

            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <View className='bg-black flex-1 px-5'>
            <View className='py-5'>
                <TextInput
                    selectionColor="orange"
                    className='text-white text-2xl'
                    ref={textInputRef}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                />
            </View>

            <View className='flex-row gap-5 pb-6'>
                <TouchableOpacity className='border-b border-white'>
                    <Text className='text-white text-xl font-medium'>Authors</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text className='text-white text-xl font-medium'>Poems</Text>
                </TouchableOpacity>
            </View>
            {/* <Button title="Search" onPress={handleSearch} /> */}
            {searchResults.length > 0 && (
                <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ReadMore', {
                                    title: item.title,
                                    lines: item.lines,
                                });
                            }}
                        >
                            <Text className='text-white'>Title: {item.title}</Text>
                            <Text className='text-white'>Author: {item.author}</Text>
                            {/* Display lines or additional information as needed */}
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default SearchScreen;
