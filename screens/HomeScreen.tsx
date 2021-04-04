import React, { Component } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import ListItem from "../components/ListItem";
import { ITEMS } from "../data/dummy-items";
import Item from "../models/item";
import RootStackParamList from "../navigators/RootStackParamList";

export default class HomeScreen extends Component<StackScreenProps<RootStackParamList, 'Home'>> {
    private styles = StyleSheet.create({
        container: {
        },
        listItem: {
            margin: 8
        }
    });

    goToItem(item: Item) {
        this.props.navigation.navigate('Item', { itemId: item.id });
    }

    private mapItems(itemData: ListRenderItemInfo<Item>) {
        return <ListItem
            style={this.styles.listItem}
            item={itemData.item}
            onPress={this.goToItem.bind(this, itemData.item)} />;
    }

    render() {
        return <FlatList
            contentContainerStyle={this.styles.container}
            data={ITEMS}
            numColumns={2}
            renderItem={this.mapItems.bind(this)} />;
    }
}
