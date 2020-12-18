import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image } from 'react-native'


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
        {/* <Image source={{ uri: }} /> */}
    </View>
);


export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            isLoading: true

        }
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=247082c0fd9674d69377c506d2b38e04&language=en-US&page=1&language=en-US&page=1')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }



    renderItem = ({ item }) => (
        <Item title={item.title} uriLink={item.backdrop_path} />
    );



    render() {
        (console.log(this.state.data))
        return (
            <View>
                <Text> textInComponent </Text>
                <FlatList
                    data={this.state.data.results}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    initialNumToRender={5}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1

    },
    item: {
        backgroundColor: 'gray',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    }
});
