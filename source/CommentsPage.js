import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";

export default function CommentsPage({ route, navigateBack }) {
  const { postId } = route.params;
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
    setLoading(false);
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      );
    } else {
      return null;
    }
  };

  const handleCommentPress = (comment) => {
    setSelectedComment(comment);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>{selectedComment}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
        <Text style={styles.backButtonText}>Назад к постам</Text>
      </TouchableOpacity>

      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCommentPress(item.body)}>
            <View style={styles.commentContainer}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Text style={styles.commentEmail}>Email: {item.email}</Text>
              <Text numberOfLines={3} style={styles.commentBody}>
                {item.body}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C4BEB5",
    padding: 10,
  },
  commentContainer: {
    backgroundColor: "#fff",

    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  commentName: {
    fontWeight: "bold",
  },
  commentEmail: {
    fontStyle: "italic",
    color: "gray",
  },
  commentBody: {},
  activityIndicatorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  backButton: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
