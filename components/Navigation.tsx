import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/Home';
import Author from '../Screens/Author';
import Search from '../Screens/Search';
import Bookmarks from '../Screens/Bookmarks';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();


const MyTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'tomato',
                tabBarStyle: {
                    paddingTop: 8,
                    paddingBottom: 8,
                    height: 65,
                    backgroundColor: 'black',
                    borderTopColor: '#333333',
                    borderTopWidth: 0.3,
                }

            }}

        >
            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" color={color} size={size} />
                ),
            }} name="Home" component={Home} />

            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search-outline" color={color} size={size} />
                ),
            }} name="Search" component={Search} />

            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="book-outline" color={color} size={size} />
                ),
            }} name="Author" component={Author} />
            <Tab.Screen options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="bookmarks-outline" color={color} size={size} />
                ),
            }} name="Bookmarks" component={Bookmarks} />
        </Tab.Navigator>

    );
}

export default MyTabs