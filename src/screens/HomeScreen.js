import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { upcomingMovies, nowPlayingMovies, popularMovies, baseImagePath } from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const { width, height } = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
    try {
        let response = await fetch(nowPlayingMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error('Something went wrong in getNowPlayingMoviesList Function', error,);
    }
};

const getUpcomingMoviesList = async () => {
    try {
        let response = await fetch(upcomingMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error('Something went wrong in getUpcomingMoviesList Function', error,);
    }
};

const getPopularMoviesList = async () => {
    try {
        let response = await fetch(popularMovies);
        let json = await response.json();
        return json;
    } catch (error) {
        console.error('Something went wrong in getPopularMoviesList Function', error,);
    }
};

const HomeScreen = ({ navigation }) => {

    const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState(undefined)
    const [popularMoviesList, setPopularMoviesList] = useState(undefined)
    const [upcomingMoviesList, setUpcomingMoviesList] = useState(undefined)

    useEffect(() => {
        (async () => {
            let tempNowPlaying = await getNowPlayingMoviesList();
            setNowPlayingMoviesList([{ id: 'dummy1' }, ...tempNowPlaying.results, { id: 'dummy2' }]);

            let tempUpcoming = await getUpcomingMoviesList();
            setUpcomingMoviesList(tempUpcoming.results);

            let tempPopular = await getPopularMoviesList();
            setPopularMoviesList(tempPopular.results);
        })();
    }, []);

    const searchMoviesFunction = () => {
        navigation.navigate('Search')
    }

    if (
        nowPlayingMoviesList == undefined &&
        nowPlayingMoviesList == null &&
        popularMoviesList == undefined &&
        popularMoviesList == null &&
        upcomingMoviesList == undefined &&
        upcomingMoviesList == null) {
        return (
            <ScrollView
                style={styles.container}
                bounces={false}
                contentContainerStyle={styles.ScrollViewContainer}
            >
                <StatusBar hidden />

                <View style={styles.InputHeaderContainer}>
                    <InputHeader searchFunction={searchMoviesFunction} />
                </View>

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={'large'} color={COLORS.Orange} />
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container} bounces={false}>
            <StatusBar hidden />

            <View style={styles.InputHeaderContainer}>
                <InputHeader searchFunction={searchMoviesFunction} />
            </View>

            <CategoryHeader title={'Now Playing'} />
            <FlatList
                data={nowPlayingMoviesList}
                keyExtractor={(item) => item.id}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                snapToInterval={width * 0.7 + SPACING.space_36}
                horizontal
                decelerationRate={0}
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => {
                    if (!item.original_title) {
                        return (
                            <View style={{ width: (width - (width * 0.7 + SPACING.space_36 * 2)) / 2 }}></View>
                        );
                    }
                    return (
                        <MovieCard
                            shoudlMarginatedAtEnd={true}
                            cardFunction={() => {
                                navigation.push('MovieDetails', { movieuid: item.id })
                            }}
                            cardWidth={width * 0.7}
                            isFirst={index == 0 ? true : false}
                            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                            title={item.original_title}
                            imagePath={baseImagePath('w780', item.poster_path)}
                            genre={item.genre_ids.slice(1, 4)}
                            vote_average={item.vote_average}
                            vote_count={item.vote_count}
                        />
                    )
                }}
            />

            <CategoryHeader title={'Popular'} />
            <FlatList
                data={popularMoviesList}
                keyExtractor={(item) => item.id}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => (
                    <SubMovieCard
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                            navigation.push('MovieDetails', { movieuid: item.id })
                        }}
                        cardWidth={width / 3}
                        isFirst={index == 0 ? true : false}
                        isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                        title={item.original_title}
                        imagePath={baseImagePath('w342', item.poster_path)}
                    />
                )}
            />

            <CategoryHeader title={'Upcoming'} />
            <FlatList
                data={upcomingMoviesList}
                keyExtractor={(item) => item.id}
                bounces={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={styles.containerGap36}
                renderItem={({ item, index }) => (
                    <SubMovieCard
                        shoudlMarginatedAtEnd={true}
                        cardFunction={() => {
                            navigation.push('MovieDetails', { movieuid: item.id })
                        }}
                        cardWidth={width / 3}
                        isFirst={index == 0 ? true : false}
                        isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                        title={item.original_title}
                        imagePath={baseImagePath('w342', item.poster_path)}
                    />
                )}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.Black
    },
    ScrollViewContainer: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    InputHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_28
    },
    containerGap36: {
        gap: SPACING.space_36
    }
})

export default HomeScreen