// types.ts or AppNavigator.ts
export type RootStackParamList = {
  "Manage Session": undefined;
  "Dialysis Sessions": undefined;
};

export interface ButtonProps {
  name: string; 
  size: number;
  color: string;
  id:number;
  onPress:()=>void;
}

export type DialysisSession = {
  id: string;
  date: string;          // YYYY-MM-DD
  startTime: string;     // HH:mm
  endTime: string;       // HH:mm
  weightBefore: number;  // in kg
  weightAfter: number;   // in kg
  notes?: string;
};

