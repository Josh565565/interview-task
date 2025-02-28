// Code to fix
// useEffect(() => {
//   axios.get("https://api.example.com/user", { headers: { Authorization: `Bearer ${token}` } })
//       .then(response => {
//           setUser(response.data); // Modify to include name and profile picture
//       })
//       .catch(error => console.log(error));
// }, []);

// Solution (with full code to run and test the app)
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const UserProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "auth-token";

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("https://api.example.com/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { id, email, name, profilePicture } = response.data;

        setUser({
          id: id || "123",
          email: email || "joshuaokwor565@gmail.com",
          name: name || "Joshua Okwor",
          profilePicture: profilePicture || "https://user-profile-image.com",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError(
          error.response?.data?.message || "Failed to fetch user details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [token]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user?.profilePicture && (
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
        />
      )}
      <Text style={styles.text}>Name: {user?.name}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default UserProfileScreen;
