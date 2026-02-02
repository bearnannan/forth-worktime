export interface WorkDay {
  day: number;
  date: string;
  inOut: string;
  netHours: number;
  status: 'Weekend' | 'Holiday' | '–';
  dayOfWeek: number;
}

export interface OTData {
  o10: number; // OT 1.0
  o15: number; // OT 1.5
  o20: number; // OT 2.0
  o30: number; // OT 3.0
}

export interface PaySettings {
  monthlySalary: number;
  baseHours: number;
}

export type Language = 'en' | 'th';

export type OTInputMap = Record<number, OTData>; // Key is day number
