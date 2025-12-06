"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BloodBank, BloodBankData } from "../models/bloodbank.model";
import { BloodBankService } from "../services/bloodbank.service";

interface BloodBankState {
  bloodbanks: BloodBank[];
  loading: boolean;
  fetchBloodBanks: () => Promise<void>;
  addBloodBank: (data: BloodBankData) => Promise<void>;
}

export const useBloodBankStore = create<BloodBankState>()(
  persist(
    (set, get) => ({
      bloodbanks: [],
      loading: false,

      // Fetch all bloodbank records if not loaded already
      fetchBloodBanks: async () => {
        if (get().bloodbanks.length > 0) return;

        set({ loading: true });
        try {
          const data = await BloodBankService.getAll();
          set({ bloodbanks: data });
        } catch (error) {
          console.error("Failed to fetch bloodbank records:", error);
        } finally {
          set({ loading: false });
        }
      },

      // Add a new bloodbank record
      addBloodBank: async (bloodBankData: BloodBankData) => {
        set({ loading: true });
        try {
          const created = await BloodBankService.create(bloodBankData);
          set((state) => ({
            bloodbanks: [...state.bloodbanks, created],
          }));
        } catch (error) {
          console.error("Failed to add bloodbank:", error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "bloodbank-storage", // key for localStorage
    }
  )
);
