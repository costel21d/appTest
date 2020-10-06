import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const AuthorListViewItem = props => {

    const { item, index } = props;

    return(
        <TouchableOpacity style={styles.itemContainer} {...props}>
            <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
    );
};

export default AuthorListViewItem;

const styles = StyleSheet.create({
   itemContainer: {
      // height: 40,
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
