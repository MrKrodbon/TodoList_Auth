import type React from "react";

export interface InputProps {
  id?: string;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string | number;
  name?: string;
  placeholder?: string;
}

export interface ButtonProps {
  type: "button" | "reset" | "submit" | undefined;
  onClick?: () => void;
  value: string;
  icon?: string;
}

export interface LabelProps {
  value: string;
  children?: React.ReactNode;
  htmlFor: string;
}

export interface userSignUpProps {
  name: string;
  email: string;
  password: string;
}

export interface RouteProps {
  component: React.ReactNode;
  redirectTo?: string;
}

export type userSignInProps = Omit<userSignUpProps, "name">;

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  token: string;
  user: { name: string } | null;
  isAuthenticated: boolean;
  error: string | null;
}

export interface Todo {
  id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

export interface TodoGroup {
  id?: string;
  title: string;
  todo: Todo[];
}

export interface TodoProps {
  todo: Todo;
}
