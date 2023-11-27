import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TicketScreen = ({ navigation, route }) => {

    const [ticketDate, setTicketData] = useState(route.params);

    useEffect(() => {
        (async () => {
            try {
                const ticket = await EncryptedStorage.getItem('ticket');
                if (ticket !== undefined && ticket !== null) {
                    setTicketData(JSON.parse(ticket));
                }
            } catch (error) {
                console.error('Something went wrong while getting Data', error);
            }
        })();
    }, []);

    if (ticketDate !== route.params && route.params != undefined) {
        setTicketData(route.params);
    }

    if (ticketDate == undefined || ticketDate == null) {
        return (
            <View style={styles.container}>
                <StatusBar hidden />

                <View style={styles.appHeaderContainer}>
                    <AppHeader
                        header={'My Tickets'}
                        action={() => navigation.goBack()}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            <View style={styles.appHeaderContainer}>
                <AppHeader
                    header={'My Tickets'}
                    action={() => navigation.goBack()}
                />
            </View>

            <View style={styles.ticketContainer}>
                <ImageBackground source={{ uri: ticketDate?.ticketImage }} style={styles.ticketBGImage}>
                    <LinearGradient
                        colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
                        style={styles.linearGradient}>
                        <View style={[styles.blackCircle, { position: 'absolute', bottom: -40, left: -40 }]}></View>
                        <View style={[styles.blackCircle, { position: 'absolute', bottom: -40, right: -40 }]}></View>
                    </LinearGradient>
                </ImageBackground>
                <View style={styles.linear}></View>

                <View style={styles.ticketFooter}>
                    <View style={[styles.blackCircle, { position: 'absolute', top: -40, left: -40 }]}></View>
                    <View style={[styles.blackCircle, { position: 'absolute', top: -40, right: -40 }]}></View>

                    <View style={styles.ticketDateContainer}>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.dateTitle}>{ticketDate?.date.date}</Text>
                            <Text style={styles.subtitle}>{ticketDate?.date.day}</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <AntDesign name='clockcircleo' style={styles.clockIcon} />
                            <Text style={styles.subtitle}>{ticketDate?.time}</Text>
                        </View>
                    </View>
                    <View style={styles.ticketSeatContainer}>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Hall</Text>
                            <Text style={styles.subtitle}>02</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Row</Text>
                            <Text style={styles.subtitle}>04</Text>
                        </View>
                        <View style={styles.subtitleContainer}>
                            <Text style={styles.subheading}>Seats</Text>
                            <Text style={styles.subtitle}>
                                {ticketDate?.seatArray.slice(0, 3).map((item, index, number) => {
                                    return item + (index == arr.length - 1 ? '' : ', ');
                                })}
                            </Text>
                        </View>
                    </View>
                    <Image source={require('../assets/image/barcode.png')} style={styles.barcodeImage} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: COLORS.Black
    },
    appHeaderContainer: {
        marginHorizontal: SPACING.space_36,
        marginTop: SPACING.space_20 * 2
    },
    ticketContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    ticketBGImage: {
        alignSelf: 'center',
        width: 300,
        aspectRatio: 200 / 300,
        borderTopLeftRadius: BORDERRADIUS.radius_25,
        borderTopRightRadius: BORDERRADIUS.radius_25,
        overflow: 'hidden',
        justifyContent: 'flex-end'
    },
    linearGradient: {
        height: '70%'
    },
    linear: {
        borderTopColor: COLORS.Black,
        borderTopWidth: 2,
        width: 300,
        alignSelf: 'center',
        backgroundColor: COLORS.Orange,
        borderStyle: 'dashed',
    },
    ticketFooter: {
        backgroundColor: COLORS.Orange,
        width: 300,
        alignItems: 'center',
        paddingBottom: SPACING.space_36,
        alignSelf: 'center',
        borderBottomLeftRadius: BORDERRADIUS.radius_25,
        borderBottomRightRadius: BORDERRADIUS.radius_25
    },
    ticketDateContainer: {
        flexDirection: 'row',
        gap: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.space_10
    },
    ticketSeatContainer: {
        flexDirection: 'row',
        gap: SPACING.space_36,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SPACING.space_10
    },
    dateTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.White
    },
    subtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.White
    },
    subheading: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.White
    },
    subtitleContainer: {
        alignItems: 'center',
    },
    clockIcon: {
        fontSize: FONTSIZE.size_14,
        color: COLORS.White,
        paddingBottom: SPACING.space_10
    },
    barcodeImage: {
        height: 50,
        aspectRatio: 158 / 52
    },
    blackCircle: {
        height: 80,
        width: 80,
        borderRadius: 80,
        backgroundColor: COLORS.Black
    }
})

export default TicketScreen