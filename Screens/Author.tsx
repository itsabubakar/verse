import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Author {
    author: string[];
}


const AuthorsScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('https://poetrydb.org/authors');
                const data: { authors: string[] } = await response.json();
                const authorsList = data.authors.map(author => ({ author }));
                setAuthors(authorsList);
                console.log(authorsList);


            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <View className='bg-black flex-1'>

            <FlatList
                className='px-5'
                data={authors}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity

                        onPress={() => {
                            navigation.navigate('AuthorPoems', {
                                author: item.author,
                            });
                        }}
                    >
                        <Text className='text-white text-lg py-2'>{item.author}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default AuthorsScreen;
