import React, { Component } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    Image,
    ScrollView
} from "react-native";
import cart from '../images/cart.png'


class Header extends Component {
    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <View style={styles.cart}>
                        <Image
                            source={cart}
                            tintColor="#f5c518"
                            style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />
                        <Text
                            style={styles.testStyle}
                        >{this.props.count}</Text>
                    </View>
                </TouchableWithoutFeedback>


                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}

                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>My Favorite Movies</Text>

                            <ScrollView
                                horizontal={false}
                                showsHorizontalScrollIndicator={false}
                            >

                                {this.props.list.map((item) => {
                                    return (
                                        <View key={item[0]} style={styles.itemStyle}>
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.titleStyle}>{item[1]}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Image
                                                    source={{ uri: item[2] }}
                                                    style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                                            </View>

                                        </View>
                                    )
                                })}





                            </ScrollView>



                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#f5c518" }}
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Close Favorites</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: '90%',
        height: '90%',
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",

        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#363739',

    },
    openButton: {
        backgroundColor: "#f5c518",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 30,
        color: 'white'
    },
    header: {
        height: '12%',
        backgroundColor: '#363739',
        justifyContent: 'center',
        alignItems: 'flex-end'

    },
    cart: {
        height: '70%',
        width: '20%',

    },
    testStyle: {
        fontSize: 20,
        color: 'white',
        position: 'absolute',
        top: 15, right: 40,
        fontWeight: 'bold'
    },
    itemStyle: {
        width: 290,
        height: 140,
        marginBottom: 15,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: '#181716',
    },
    titleStyle: {
        fontSize: 25,
        color: 'white',
        margin: 3
    }
});

export default Header;