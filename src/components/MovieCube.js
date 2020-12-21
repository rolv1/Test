import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback
} from 'react-native'

const MovieCube = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
        >
            <View style={styles.item}>
                <View style={{ backgroundColor: '#3D3D3D', flex: 1 }}>
                    <Text style={styles.title}>{props.title}</Text>
                </View>

                <View style={{ flex: 3 }}>
                    <Image source={{ uri: props.uriLink }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 7,
        borderColor: '#f5c518',
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex',
        height: 170,


    },
    title: {
        fontSize: 32,
        color: 'white'
    }
});

export default MovieCube
