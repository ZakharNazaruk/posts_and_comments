import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  return (
    <View style={styles.commentsContainer}>
      <Text style={styles.commentsHeading}>Comments:</Text>
      {comments.map((comment) => (
        <View key={comment.id} style={styles.comment}>
          <Text style={styles.commentName}>{comment.name}</Text>
          <Text style={styles.commentEmail}>Email: {comment.email}</Text>
          <Text style={styles.commentBody}><Text style = {styles.cont}>Context:   </Text>{comment.body}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  commentsContainer: {
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    
    elevation: 4,
    
    
  },
  commentsHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  comment: {
    marginBottom: 10,
    backgroundColor:"#E8E1DB",
    borderRadius:10,
    padding:20,
    textAlign: "justify"

  },
  commentName: {
    fontWeight: "bold",
  },
  commentEmail: {
    fontStyle: "italic",
    color: "gray",
  },
  commentBody: {
    textAlign: "justify"

  },
  cont:{
    fontWeight: "bold"
  }
});