import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import Comments from "./Comments";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (loading || endReached) return; // Предотвращаем повторные запросы
    setLoading(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await response.json();
      if (data.length === 0) {
        // Достигли конца списка
        setEndReached(true);
      } else {
        setPosts([...posts, ...data]); // Добавляем загруженные посты к уже имеющимся
        setPage(page + 1); // Увеличиваем номер страницы для следующей загрузки
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  const handleCommentsButtonClick = (postId) => {
    setExpandedPostId((prevPostId) => (prevPostId === postId ? null : postId));
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

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.postContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={() => handleCommentsButtonClick(item.id)}
          >
            <Text>Comments</Text>
          </TouchableOpacity>
          {expandedPostId === item.id && <Comments postId={item.id} />}
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={fetchData}
      onEndReachedThreshold={0.1} 
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: "#70ABBF",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginHorizontal:20
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "justify",
    backgroundColor: "#70ABBF",
    borderRadius: 10,
    padding: 10,
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "justify",
  },
  button: {
    backgroundColor: "#e0e8e5",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicatorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
});
