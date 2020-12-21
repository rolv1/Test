import React, { Component } from 'react'
import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

import MovieComp from './MovieComp'
import MovieCube from './MovieCube'
import Header from './Header'

import { connect } from 'react-redux'
import { changeUser } from '../actions/users'
import { changeFavorites } from '../actions/favorites'
import { bindActionCreators } from 'redux'


const PREFIX = 'https://image.tmdb.org/t/p/w500'

class MoviesPage extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
            isLoading: true

        }
    }
    // fetch the data from the API
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
        <MovieCube
            title={item.title}
            uriLink={PREFIX + item.backdrop_path}
            onPress={() => {
                this.props.navigation.navigate('MovieComp', {
                    itemId: item.id,
                    itemName: item.title,
                    itemImg: (PREFIX + item.backdrop_path),
                    rating: item.vote_average,
                    itemOverview: item.overview
                })

            }}
        />
    );



    render() {
        return (
            <View>
                <Header
                    count={this.props.lstObj.lstObj.count}
                    list={this.props.lstObj.lstObj.list}
                />
                <View style={{ height: '88%' }}>

                    <FlatList
                        data={this.state.data.results}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id.toString()}
                        initialNumToRender={5}
                        contentContainerStyle={{ paddingBottom: 40 }}
                    />
                </View>
            </View>
        )
    }
}

const StackMovies = createStackNavigator();
function Movies(props) {
    return (
        <StackMovies.Navigator initialRouteName="Movies"  >

            <StackMovies.Screen options={{ headerShown: false }} name="MovieComp" component={MovieCompContainer} />
            <StackMovies.Screen options={{ headerShown: false }} name="Movies" component={MoviePageContainer} />

        </StackMovies.Navigator>
    );
}
export default Movies

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
        fontSize: 32,
    }
});

// Pick the props that we will use
const mapStateToProps = state => ({
    user: state.user,
    count: state.count,
    lstObj: state.lstObj
});


// Pick the actions that we will use
const ActionCreators = Object.assign(
    {},
    { changeUser },
    { changeFavorites },
);


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});
// Connect the screens to Redux
let MoviePageContainer = connect(mapStateToProps, mapDispatchToProps)(MoviesPage)
let MovieCompContainer = connect(mapStateToProps, mapDispatchToProps)(MovieComp)
