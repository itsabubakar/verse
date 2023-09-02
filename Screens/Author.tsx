import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from '../components/Loading'; // Import your loading spinner component

interface Author {
    author: string;
}

const AuthorsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('https://poetrydb.org/authors');
                const responseData: { authors: string[] } = await response.json();
                const authorsList = responseData.authors.map(author => ({ author }));
                setAuthors(authorsList);
            } catch (error) {
                console.error("Error fetching authors:", error);
            } finally {
                setIsLoading(false); // Set loading to false when fetching is done
            }
        };

        fetchAuthors();
    }, []);

    return (
        <View className='bg-black flex-1'>
            {isLoading ? ( // Render loading spinner if isLoading is true
                <View className='justify-center items-center flex-1'>
                    <LoadingSpinner />
                </View>
            ) : (
                <FlatList
                    className='px-6 py-4 bg-black'
                    data={authors}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className='py-1 border-b border-[#333333]'
                            onPress={() => {
                                navigation.navigate('authorpage', {
                                    author: item.author,
                                });
                            }}
                        >
                            <Text className='text-white text-lg py-2 '>{item.author}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

export default AuthorsScreen;
