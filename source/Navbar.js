import React from "react";
import { View,Text,StyleSheet } from "react-native";
export const Navbar = ({title}) =>{
    return(
        <View style={styles.navbar}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems :'center',
        justifyContent: 'flex-end',
        backgroundColor:'#327496',
        paddingBottom: 20,
        
        

    },
    text:{
        color: "#E8E1DB",
        fontSize:20,
        
    }
})