import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthorsListScreen from './AuthorsListScreen';
import AuthorItemScreen from './AuthorItemScreen';

const Stack = createStackNavigator();

const NavigationRouter = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={AuthorsListScreen}
                    options={{ title: 'Authors list' }}
                />
                <Stack.Screen name="AuthorItemScreen" component={AuthorItemScreen} options={{ title: 'Author books' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationRouter;
