import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Feather from 'react-native-vector-icons/Feather';

const SettingComponent = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Feather name={props.icon} style={styles.iconStyle} />
            </View>

            <View style={styles.settingContainer}>
                <Text style={styles.title}>{props.heading}</Text>
                <Text style={styles.subtitle}>{props.subheading}</Text>
                <Text style={styles.subtitle}>{props.subtitle}</Text>
            </View>

            <View style={styles.iconBG}>
                <Feather name='chevron-right' style={styles.iconStyle} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: SPACING.space_20
    },
    settingContainer: {
        flex: 1,
    },
    iconContainer: {
        marginTop: SPACING.space_8
    },
    iconStyle: {
        color: COLORS.White,
        fontSize: FONTSIZE.size_24,
        paddingHorizontal: SPACING.space_20
    },
    iconBG: {
        justifyContent: 'center'
    },
    title: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.White
    },
    subtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.WhiteRGBA50
    }
})

export default SettingComponent;