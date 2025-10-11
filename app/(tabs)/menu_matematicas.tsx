// app/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getHighScore } from "../utils/score";

export default function HomeScreen() {
  const router = useRouter();
  const [highScore, setHighScore] = useState(0);
  const bounceAnim = useState(new Animated.Value(1))[0];
  
  // Animation for the play button
  const startBounceAnimation = () => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => startBounceAnimation());
  };

  // Load high score and start animation when app opens
  useEffect(() => {
    async function loadHighScore() {
      const storedScore = await getHighScore();
      setHighScore(storedScore);
    }
    loadHighScore();
    startBounceAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('../../assets/images/react-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        
        <Text style={styles.title}>✨ MathFun Learning ✨</Text>
        <Text style={styles.subtitle}>¡Aprende matemáticas jugando!</Text>
        
        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>🏆 Récord Personal</Text>
          <Text style={styles.scoreValue}>{highScore}</Text>
        </View>
        
        <Animated.View style={{ transform: [{ scale: bounceAnim }] }}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => router.push("/game_matematicas")}
            activeOpacity={0.8}
          >
            <View style={styles.buttonGradient}>
              <Text style={styles.buttonText}>🚀 ¡JUGAR AHORA!</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A11CB',
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    marginBottom: 30,
    textAlign: "center",
  },
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 20,
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  scoreTitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFD700",
  },
  playButton: {
    width: width * 0.8,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF416C',
    borderRadius: 30,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
