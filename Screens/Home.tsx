import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from '../components/Loading';

interface Poem {
    title: string;
    lines: string[];
    author: string;
}

const RandomPoems: React.FC = () => {
    const navigation = useNavigation<any>();
    const poemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [poems, setPoems] = useState<Poem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchRandomPoems = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://poetrydb.org/random/${poemsPerPage}`);
            const data: Poem[] = await response.json();
            setPoems(prevPoems => [...prevPoems, ...data]);
        } catch (error) {
            console.error("Error fetching poems:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        fetchRandomPoems();
    }, [currentPage]);

    const handleScroll = (event: any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

        if (isEndReached && !isLoading) {
            setCurrentPage(currentPage + 1);
            fetchRandomPoems();
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setPoems([]); // Clear existing poems before refreshing
        setCurrentPage(1);
        fetchRandomPoems();
    };

    return (
        <View className='bg-black flex-1'>
            <View className='py-3'>
                <Logo />
            </View>

            <ScrollView className='py-2 border-t border-[#333333]' onScroll={handleScroll}
                refreshControl={<RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={handleRefresh} />}
            >
                {poems.map((poem, index) => (
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
                                <Text className='text-orange-500 py-5'>Read More</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('author', {
                                    author: poem.author,
                                });
                            }}
                        >
                            <Text className='text-[#929292] text-lg font-[ecsarMedium]'>By {poem.author}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {isLoading && <LoadingSpinner />}
            </ScrollView>
        </View>
    );
};

export default RandomPoems;
