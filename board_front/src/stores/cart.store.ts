
//! interface: 

import { create } from "zustand";

// 장바구니 아이템의 interfce 정의
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

// 스토어(전역저장소)의 interface 정의
interface CartStoreType {
    items: CartItem[];

    // 상태 업테이트 함수
    addItem: (item: CartItem) => void,
    removeItem: (id: number) => void, // 단건 아이템 삭제
    clearItem: () => void // 전체 아이템 삭제
}

// 저장소 생성 함수 정의
const useCartStore = create<CartStoreType>((set) => ({
    items: [],
    addItem: (item) => set((state) => ({
        items: [...state.items, item]
    })),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id)
    })),
    clearItem: () => set({items: []})
}));

export default useCartStore;