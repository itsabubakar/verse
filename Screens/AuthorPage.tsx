import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import LoadingSpinner from '../components/Loading';

interface Title {
    title: string;
}

interface Line {
    title: string;
    lines: string[];
}

const AuthorPage = () => {
    const route = useRoute();
    const navigation = useNavigation<any>();

    const { author }: any = route.params;
    const [titles, setTitles] = useState<Title[]>([]);
    const [lines, setLines] = useState<Line[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuthorTitles = async () => {
            try {
                const response = await fetch(`https://poetrydb.org/author/${author}`);
                const data: Title[] = await response.json();
                setTitles(data);
            } catch (error) {
                console.error("Error fetching author's titles:", error);
            }
        };

        const fetchLinesForAuthor = async () => {
            try {
                const response = await fetch(`https://poetrydb.org/author/${author}`);
                const data: Line[] = await response.json();
                setLines(data);
                setIsLoading(false);

            } catch (error) {
                console.error("Error fetching author's poem lines:", error);
            }
        };
        fetchAuthorTitles();
        fetchLinesForAuthor();

    }, [author]);

    return (
        <View className='bg-black flex-1'>
            <Text className='text-white px-6 pt-4 text-xl'>By {author}</Text>
            {isLoading ? ( // Render loading spinner if isLoading is true
                <View className='justify-center items-center flex-1'>
                    <LoadingSpinner />
                </View>
            ) : (
                <FlatList
                    className='px-6 py-4'

                    data={titles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className='py-1 border-b border-[#333333]'

                            onPress={() => {
                                const selectedLine = lines.find(line => line.title === item.title);
                                if (selectedLine) {
                                    navigation.navigate('readmore', {
                                        title: item.title,
                                        lines: selectedLine.lines,
                                    });
                                }
                            }}
                        >
                            <Text className='text-lg text-white py-2'>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

        </View>
    );
};

export default AuthorPage;
