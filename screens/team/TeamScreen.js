import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import COLORS from '../../constants/theme';;
//import * as cartActions from '../../store/actions/cart';

const TeamScreen = props => {
    const teamId = props.route.params.teamId;
    const selectedTeam = useSelector(state =>
        state.teams.myTeams.find(team => team._id === teamId)
    );
    const dispatch = useDispatch();

    //console.log("FROM ONE TEAM SCREEN ", teamId)

    return (
        <ScrollView>
            {/* <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} /> */}

            <Text style={styles.price}>{selectedTeam.name}</Text>
            <Text style={styles.description}>{selectedTeam.acronym}</Text>
        </ScrollView>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.teamName
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'Inter-Bold'
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default TeamScreen;
