import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';

const UserAccountScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar hidden />

            <View style={styles.appHeaderContainer}>
                <AppHeader
                    header={'My Profile'}
                    action={() => navigation.goBack()}
                />
            </View>

            <View style={styles.profileContainer}>
                <Image source={require('../assets/image/avatar.jpg')} style={styles.avatarImage} />
                <Text style={styles.avatarText}>Phúc Lộc</Text>
            </View>

            <View style={styles.profileContainer}>
                <SettingComponent
                    icon={'user'}
                    heading='Account'
                    subheading='Edit Profile'
                    subtitle='Change Password'
                />
                <SettingComponent
                    icon={'settings'}
                    heading='Account'
                    subheading='Theme'
                    subtitle='Permissions'
                />
                <SettingComponent
                    icon={'dollar-sign'}
                    heading='Offers & Refferrals'
                    subheading='Offer'
                    subtitle='Refferrals'
                />
                <SettingComponent
                    icon={'info'}
                    heading='About'
                    subheading='About Movies'
                    subtitle='More'
                />
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
    profileContainer: {
        alignItems: 'center',
        padding: SPACING.space_36,
    },
    avatarImage: {
        height: 80,
        width: 80,
        borderRadius: 80
    },
    avatarText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        marginTop: SPACING.space_16,
        color: COLORS.White
    }
})

export default UserAccountScreen