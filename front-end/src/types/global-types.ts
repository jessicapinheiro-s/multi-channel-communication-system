type ToastType = "success" | "error";

export interface User {
  id: number;
  email: string;
  name?: string | null;
  created_at: string;   // ISO string no front
  updated_at: string;   // ISO string
  phone?: string | null;
  warnings_preferences: string;
  role: 'user' | 'admin' | string;
  warning_logs_sent?: WarningLogSent[];
}

export interface WarningLogSent {
  id: number;
  warningId: number;
  user_id: number;
  status: string;
  sent_at: string;     // ou Date
  channel: string;
  created_at: string; // ou Date
  user?: User;
  warning?: Warning;
}

export interface Warning {
  id: number;
  status: string;
  message: string;
  name: string;
  channel: string;
  created_at: string; // ou Date, dependendo do fetch
  warning_logs_sent?: WarningLogSent[];
}
export interface Receptor {
  id: number;
  name: string;
  email: string;
  phone: string;
  preferences: string;
}

export interface ToastProps {
  type?: ToastType;
  title?: string;
  message?: string;
  duration?: number; // ms
}

export interface SendEmailPros {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
  recipient_id: number;
  from_email: string;
  from_name: string;
  warning_id: number;
}