import React from 'react'
import useCountStore from '../stores/count.store';
import useCartStore from '../stores/cart.store';

export default function E_zustand() {
  // state
  // state: count 값에 대한 전역 상태 관리
  const { count, increment, decrement } = useCountStore();

  // state: cart(장바구니) 값에 대한 전역 상태 관리
  const { items, addItem ,removeItem, clearItem } = useCartStore();

  // return: zustand 전역 상태 관리에 대한 출력
  return (
    <div
      style={{
        textAlign:'center',
        marginTop: '20px'
      }}
    >
      <h2>Zustand Count Example</h2>
      <p>{`Count: ${count}`}</p>

      <h2>Zustand Cart Example</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px'}}>
            {item.name} - ${item.price} X {item.quantity}
            <button
              onClick={() => removeItem(item.id)}
              style={{marginLeft: '10px', padding: '3px 5px'}}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
