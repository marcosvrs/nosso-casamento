import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import ListItem from "../components/ListItem";
import Item from "../models/item";
import ItemsStackParamList from "../navigation/ItemsStackParamList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchItems } from "../store/actions/items";

interface ItemListScreenProps extends StackScreenProps<ItemsStackParamList, 'ItemList'> {
}

const ItemListScreen: FunctionComponent<ItemListScreenProps> = ({ navigation }) => {
    const styles = StyleSheet.create({
        container: {
        },
        listItem: {
            margin: 8
        }
    });

    const [isRefreshing, setIsRefreshing] = useState(false);
    const itemList = useSelector<RootState, { [key: string]: Item | undefined }>(state => state.items.itemList);
    const dispatch = useDispatch();

    const loadItems = useCallback(async () => {
        setIsRefreshing(true);
        await dispatch(fetchItems());
        setIsRefreshing(false);
    }, [dispatch]);

    useEffect(() => {
        navigation.addListener('focus', loadItems);

        return () => {
            navigation.removeListener('focus', loadItems);
        };
    }, [loadItems]);

    useEffect(() => {
        loadItems();
    }, [dispatch, loadItems]);

    function goToItem(item: Item) {
        navigation.navigate('Item', { itemId: item.id });
    }

    function mapItems(itemData: ListRenderItemInfo<Item>) {
        return <ListItem
            style={styles.listItem}
            item={itemData.item}
            onPress={goToItem.bind(undefined, itemData.item)} />;
    }

    return <FlatList
        contentContainerStyle={styles.container}
        onRefresh={loadItems}
        refreshing={isRefreshing}
        data={Object.values(itemList)}
        numColumns={2}
        renderItem={mapItems} />;
}

export default ItemListScreen