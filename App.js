  import React, { useState, useEffect } from "react";
  import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
  import { Navbar } from "./source/Navbar";
  import Posts from "./source/Posts";

  export default function App() {
    const [showMore, setShowMore] = useState(false);

    return (
      <View style={styles.container}>
        <View>
        <Navbar title={"MyApp"} />
        </View>
        
          <Posts  />
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#C4BEB5",
      marginTop:30,
      paddingBottom: 20,
    
    },
   
  });
