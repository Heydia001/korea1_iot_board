import axios from 'axios';
import React, { useState } from 'react'

interface GetAllBooksResponseDto {
    id: number;
    writer: string;
    title: string;
    content: string;
}

const DOMAIN = 'http://localhost:8080';
const MENU_API = 'api/v1/books';

export default function Z_Practice() {
    const [results, setResults] = useState<GetAllBooksResponseDto[]>([]);

    const fetching = async() => {
        try {
            const response  = await axios.get(
                `${DOMAIN}/${MENU_API}`
            )

            const data = response.data;

            setResults(data);

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const handleBtnClick = async () => {
        await fetching();
    }

  return (
    <div>
        <button 
        value='findAll'
        onClick={handleBtnClick}
        >
        전체 조회
        </button>
        <ul>
            {results && results.length > 0 ? (
                results.map((book) => (
                    <li key={book.id}>
                        {book.writer}, {book.title}, {book.content}
                    </li>
                ))) : (
                <li>데이터 없음</li>
            )}
        </ul>
    </div>
  )
}
