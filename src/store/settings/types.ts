export interface State {
  voiceURI: string;
  pronunciationSpeed: number;
  dailyTrainingTime: DailyTrainingTime;
  themeMode: 'system' | 'light' | 'dark';
}

interface DailyTrainingTime {
  goal: number;
  achieved: number;
}
