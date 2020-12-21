import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    Button,
    ScrollView,
} from 'react-native'
import Header from './Header'


export class MovieComp extends Component {
    // true is item in cart, false otherwise
    isInFlag = () => {
        let flag = false
        this.props.lstObj.lstObj.list.forEach(element => {
            if (element[0] === this.props.route.params.itemId.toString())
                flag = true
        });
        return flag
    }


    render() {
        return (
            <View>
                <Header
                    count={this.props.lstObj.lstObj.count}
                    list={this.props.lstObj.lstObj.list} />


                <View style={styles.img}>
                    <Image source={{ uri: this.props.route.params.itemImg }} style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} />
                </View>
                <View style={styles.title}>
                    <Text style={{ fontSize: 28 }}> {this.props.route.params.itemName} </Text>

                </View>

                <View style={styles.details}>
                    <ScrollView>
                        <Text

                        >
                            {this.props.route.params.itemOverview}
                        </Text>
                    </ScrollView>

                    <Text
                        style={{ fontSize: 23 }}
                    >Rating: {this.props.route.params.rating}</Text>
                </View>


                <View style={styles.buttonStyle}>
                    <View style={{ display: (this.isInFlag() ? 'none' : 'flex'), marginTop: '2%' }}>
                        <Button
                            title='Add to favorite list'
                            color='green'
                            // implementing adding a movie to our favorite list
                            onPress={() => {
                                let newList = [...(this.props.lstObj.lstObj.list)]
                                newList.push([
                                    this.props.route.params.itemId.toString(),
                                    this.props.route.params.itemName,
                                    this.props.route.params.itemImg
                                ])

                                let count = this.props.lstObj.lstObj.count + 1
                                this.props.actions.changeFavorites({
                                    list: newList,
                                    count: count
                                });
                            }}

                        />
                    </View>

                    <View style={{ display: (this.isInFlag() ? 'flex' : 'none'), marginTop: '2%' }}>
                        <Button
                            title='Remove from favorite list'
                            color='green'
                            // implementing removing a movie to our favorite list
                            onPress={() => {
                                let newList = [...(this.props.lstObj.lstObj.list)]
                                let index = newList.indexOf(toString(this.props.route.params.itemId))
                                newList.splice(index, 1)
                                let count = this.props.lstObj.lstObj.count - 1

                                this.props.actions.changeFavorites({
                                    list: newList,
                                    count: count
                                });
                            }}

                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default MovieComp


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: 'gray',
        width: '90%',
        alignSelf: 'center',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex',
        flexDirection: 'row'

    },
    title: {
        fontSize: 42,
        alignSelf: 'center',
        height: '10%'
    },
    img: {
        height: '35%'
    },
    buttonStyle: {
        width: '70%',
        alignSelf: 'center',
        height: '10%',
    },
    header: {
        height: '12%',
        backgroundColor: '#363739',
        justifyContent: 'center',
        alignItems: 'flex-end'


    },
    details: {
        height: "34%",
        width: '90%',
        alignSelf: 'center'
    },
    cart: {
        height: '70%',
        width: '20%',

    },




    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});