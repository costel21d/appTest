import React, {useState, useEffect} from "react";
import {View, Text, StatusBar, SafeAreaView, FlatList, Alert, TouchableOpacity} from 'react-native';
import AuthorListViewItem from "./components/AuthorListItem";

const AuthorsListScreen = props => {

    const { navigation } = props;

    const [authorsList, setAuthorsList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const uniqueArr = authorsList.filter((item, index) => authorsList.indexOf(item) === index);

    const loadData = () => {
        const baseUrl = `https://jsonmock.hackerrank.com/api/articles`;
        fetch(`${baseUrl}?page=${page}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
                "Accept": "*/*",
            },
        })
            .then(response => response.json())
            .then(responseData => {
                const authorsArr = responseData.data.map(item => item.author);
                setAuthorsList([...authorsList, ...authorsArr]);
                if (responseData.total_pages > page) {
                    setPage(page + 1);
                } else {
                    setIsLastPage(true);
                }
            });
    }

    useEffect(() => {
        loadData();
    }, []);

    const renderLastElement = () => {
        return <View style={{ justifyContent: "center", alignItems: "center", padding: 10 }}>
            <Text>You have reached the last page</Text>
        </View>
    }

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <FlatList
                    data={uniqueArr}
                    keyExtractor={() => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                    renderItem={({item, index}) => <AuthorListViewItem item={item} index={index} onPress={() => navigation.navigate("AuthorItemScreen", item)} />}
                    onEndReached={() => isLastPage ? null : loadData()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={() => isLastPage ? renderLastElement() : null}
                />
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: 'pink' }} onPress={loadData}>
                    <Text>Click here to load next page or swipe down to scroll</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}

export default AuthorsListScreen;
