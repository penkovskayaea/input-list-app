import React, { useState } from "react";
import "./App.css"; // Просто обычный CSS, не Modules

function App() {
  // Состояния (чуть больше, чем нужно)
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Обработчик ввода
  const handleInput = () => {
    const value = prompt("Введите значение");

    if (value) {
      if (value.length < 3) {
        setShowError(true);
        setIsButtonDisabled(true);
      } else {
        setInputValue(value);
        setShowError(false);
        setIsButtonDisabled(false);
      }
    }
  };

  // Обработчик добавления
  const handleAdd = () => {
    setItems([
      ...items,
      {
        text: inputValue,
        id: items.length + 1, // Не самый лучший способ, но работает
        date: new Date().toLocaleString(), // Дата как строка
      },
    ]);
    setInputValue("");
    setIsButtonDisabled(true);
  };

  return (
    <div className="app">
      <h1>Ввод значения</h1>

      <p>
        Текущее значение: "<span className="value">{inputValue}</span>"
      </p>

      {showError && (
        <div className="error-message">Ошибка: нужно минимум 3 символа!</div>
      )}

      <div className="buttons">
        <button onClick={handleInput}>Ввести новое</button>
        <button onClick={handleAdd} disabled={isButtonDisabled}>
          Добавить в список
        </button>
      </div>

      <div className="list-container">
        <h2>Список:</h2>

        {items.length === 0 ? (
          <p>Нет добавленных элементов</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.text} <small>(добавлено: {item.date})</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
