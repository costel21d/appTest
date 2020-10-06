import React from "react";
import {View, Text, StatusBar, SafeAreaView, FlatList, StyleSheet} from 'react-native';

const AuthorItemScreen = props => {

  const author = props.route.params;
  const [books, setBooks] = React.useState([]);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
        const baseUrl = `https://jsonmock.hackerrank.com/api/articles`;
    fetch(`${baseUrl}?page=${page}&author=${author}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "access-control-allow-origin": "*",
                "Accept": "*/*",
            },
        })
            .then(response => response.json())
            .then(responseData => {
                setBooks(responseData.data);
            });
    },[]);

    const renderBooksItem = (item) => {
        return (
            <View style={styles.itemContainer}>
               <Text style={styles.text}>{item.title || item.story_title || "N/A"}</Text>
            </View>
        );
    }

    return(
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
            <FlatList
                data={books}
                keyExtractor={() => new Date().getTime().toString() + (Math.floor(Math.random() * Math.floor(new Date().getTime()))).toString()}
                renderItem={({ item }) => renderBooksItem(item)}
            />
        </SafeAreaView>
            </>
    );
};

export default AuthorItemScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#c4c4c4",
    },
    text: {
        fontSize: 22,
        fontWeight: "bold",
        color: "grey",
    }
});

