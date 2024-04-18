"use client";
import { Store } from "@tanstack/react-store";

type UserType = {
  userName: string;
  userAge: string;
  userPhone: string;
};

export const userStore = new Store<UserType>({
  userName: "",
  userAge: "",
  userPhone: "",
});
