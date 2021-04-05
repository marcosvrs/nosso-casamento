import React, { Component } from "react"
import { Image, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import Button from "../components/Button";
import Text from "../components/Text";
import ItemsStackParamList from "../navigations/ItemsStackParamList";
import { ScrollView } from "react-native-gesture-handler";
import { connect, ConnectedProps } from "react-redux";
import { addToCart } from "../store/actions/checkout";

const connector = connect(
    (state, ownProps) =>
        ({ item: state.items.itemList[ownProps.route.params.itemId] }),
    { addToCart }
);

interface ItemDetailScreenProps extends StackScreenProps<ItemsStackParamList, 'Item'>, ConnectedProps<typeof connector> {
}

class ItemDetailScreen extends Component<ItemDetailScreenProps> {
    private styles = StyleSheet.create({
        container: {
            flex: 1
        },
        imageContainer: {
            height: '50%',
            width: '100%',
            marginBottom: 16
        },
        image: {
            width: '100%',
            height: '100%'
        },
        detailsContainer: {
            marginBottom: 16
        },
        name: {
            fontFamily: 'poppins-bold',
            fontSize: 32
        },
        price: {
            fontSize: 24
        },
        description: {},
        buttonContainer: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        button: {
            width: '40%',
            height: 50
        }
    });

    componentDidMount() {
        this.props.navigation.setOptions({ title: this.props.item?.name });
    }

    private addToCart() {
        if (this.props.item !== undefined) {
            this.props.addToCart(this.props.item.id);
        }
    }

    render() {
        if (this.props.item === undefined) {
            return <View style={this.styles.container}>
                <Text>Item not found!</Text>
            </View>
        }

        return <ScrollView contentContainerStyle={this.styles.container}>
            <View style={this.styles.imageContainer}>
                <Image style={this.styles.image} source={this.props.item.image} />
            </View>
            <View style={this.styles.detailsContainer}>
                <Text style={this.styles.name}>{this.props.item.name}</Text>
                <Text style={this.styles.price}>{this.props.item.getValueCurrency()}</Text>
                <Text style={this.styles.description}>{this.props.item.description}</Text>
            </View>
            <View style={this.styles.buttonContainer}>
                <Button style={this.styles.button} onPress={this.addToCart.bind(this)}>Comprar</Button>
            </View>
        </ScrollView>;
    }
}

export default connector(ItemDetailScreen)