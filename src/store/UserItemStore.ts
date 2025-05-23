import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = {
  id: string;
  name: string;
  Location: string;
};

type ItemStore = {
  items: Item[];
  addItem: (name: string, Location: string) => void;
  updateItem: (id: string, name: string, Location: string) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => Item | undefined;
};

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [
        { id: '1', name: 'Tickets For Musical Events', Location: 'Location 1' },
        { id: '2', name: 'Tickets For IPL Match', Location: 'Location 2' },
      ],
      addItem: (name, Location) =>
        set((state) => ({
          items: [
            ...state.items,
            { id: Math.random().toString(), name, Location },
          ],
        })),
      updateItem: (id, name, Location) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, name, Location } : item
          ),
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      getItem: (id) => get().items.find((item) => item.id === id),
    }),
    {
      name: 'item-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
