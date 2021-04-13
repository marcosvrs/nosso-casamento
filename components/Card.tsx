import React, { FunctionComponent } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

const Card: FunctionComponent<ViewProps> = (props) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'white',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: .3,
            shadowRadius: 4,
            elevation: 8,
            borderRadius: 5,
            padding: 16
        }
    });
    return <View {...props} style={{ ...styles.container, ...(props.style || {}) }}>
        {props.children}
    </View>;
}

export default Card