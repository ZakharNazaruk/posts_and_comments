import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Navbar } from "./source/Navbar";
import Posts from "./source/Posts";
import CommentsPage from "./source/CommentsPage";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Posts");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const navigateToComments = (postId) => {
    setSelectedPostId(postId);
    setCurrentScreen("CommentsPage");
  };

  const navigateBackToPosts = () => {
    setSelectedPostId(null);
    setCurrentScreen("Posts");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "Posts":
        return <Posts navigateToComments={navigateToComments} />;
      case "CommentsPage":
        return (
          <CommentsPage route={{ params: { postId: selectedPostId } }} navigateBack={navigateBackToPosts} />


        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar title={"MyApp"} />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4BEB5",
    paddingBottom: 20,
  },
});
