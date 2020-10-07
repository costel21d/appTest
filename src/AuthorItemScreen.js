import React from "react";
import {View, Text, StatusBar, SafeAreaView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import EndOfList from "./components/EndOfList";

const AuthorItemScreen = props => {

  const author = props.route.params;
  const [books, setBooks] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [isLastPage, setIsLastPage] = React.useState(false);

    const loadData = () => {
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
                console.log('0: ', responseData.data);
                setBooks([...books, ...responseData.data]);

                if (responseData.total_pages > page) {
                    setPage(page + 1);
                } else {
                    setIsLastPage(true);
                }
            });
    }

  React.useEffect(() => {
        loadData();
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
                onEndReached={() => isLastPage ? null : loadData()}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => isLastPage ? EndOfList() : null}
            />
            <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", padding: 10, backgroundColor: 'pink' }} onPress={loadData}>
                <Text>Click here to load next page or swipe down to scroll</Text>
            </TouchableOpacity>
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

