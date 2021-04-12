import React, { Component } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import ListItem from "../components/ListItem";
import Item from "../models/item";
import ItemsStackParamList from "../navigation/ItemsStackParamList";
import { connect, ConnectedProps } from "react-redux";

const connector = connect((state) => ({ itemList: state.items.itemList }));

interface ItemListScreenProps extends StackScreenProps<ItemsStackParamList, 'ItemList'>, ConnectedProps<typeof connector> {
}

class ItemListScreen extends Component<ItemListScreenProps> {
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
            data={Object.values(this.props.itemList)}
            numColumns={2}
            renderItem={this.mapItems.bind(this)} />;
    }
}

export default connector(ItemListScreen)