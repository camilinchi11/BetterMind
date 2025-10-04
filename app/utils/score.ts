// app/utils/score.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const HIGH_SCORE_KEY = "highscore";

// Obtener el highscore
export async function getHighScore(): Promise<number> {
  try {
    const storedScore = await AsyncStorage.getItem(HIGH_SCORE_KEY);
    return storedScore ? parseInt(storedScore, 10) : 0;
  } catch (error) {
    console.error("Error leyendo highscore", error);
    return 0;
  }
}

// Guardar un nuevo highscore si es mayor
export async function saveHighScore(score: number): Promise<void> {
  try {
    const currentHigh = await getHighScore();
    if (score > currentHigh) {
      await AsyncStorage.setItem(HIGH_SCORE_KEY, score.toString());
    }
  } catch (error) {
    console.error("Error guardando highscore", error);
  }
}