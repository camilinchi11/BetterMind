import { IconSymbol } from "@/components/ui/icon-symbol";
import { useRouter, type Href } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * Inferimos el tipo del prop `name` directamente desde el componente IconSymbol.
 * Esto evita importar un tipo que quizás no exista/exporte en icon-symbol.
 */
type IconName = React.ComponentProps<typeof IconSymbol>['name'];

interface GameCardProps {
  title: string;
  description: string;
  iconName: IconName;    // 🔹 inferido desde IconSymbol
  route: string | Href;  // 🔹 permitimos string para literales simples + Href para seguridad
  comingSoon?: boolean;
}

function GameCard({
  title,
  description,
  iconName,
  route,
  comingSoon = false,
}: GameCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.gameCard, comingSoon && styles.disabledCard]}
      onPress={() => {
        if (comingSoon) return;
        // casteamos a Href para satisfacer la firma de router.push
        router.push(route as Href);
      }}
      disabled={comingSoon}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <IconSymbol size={50} name={iconName} color="#FFD700" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.gameTitle}>{title}</Text>
        <Text style={styles.gameDescription}>{description}</Text>
        {comingSoon && (
          <View style={styles.soonBadge}>
            <Text style={styles.soonText}>Próximamente</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>🎮 Juegos Mentales</Text>
        <Text style={styles.subtitle}>¡Selecciona un juego para comenzar!</Text>

        <GameCard
          title="Matemáticas"
          description="Mejora tus habilidades con operaciones básicas"
          iconName="plus.forwardslash.minus"
          route="/game"
        />

        <GameCard
          title="Memoria"
          description="Ejercita tu memoria con secuencias y patrones"
          iconName="brain"
          route="/memory"
          comingSoon
        />

        <GameCard
          title="Lógica"
          description="Resuelve acertijos y problemas de lógica"
          iconName="puzzlepiece"
          route="/logic"
          comingSoon
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A11CB',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 30,
  },
  gameCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    marginRight: 16,
  },
  gameTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  gameDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  soonBadge: {
    marginTop: 8,
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  soonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 12,
  },
  disabledCard: {
    opacity: 0.6,
  },
});
