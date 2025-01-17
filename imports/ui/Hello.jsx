import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

// Função auxiliar para chamar métodos Meteor usando promessas
const callMeteorMethod = (methodName, ...args) => {
  return new Promise((resolve, reject) => {
    Meteor.call(methodName, ...args, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export const Hello = () => {
  const [text, setText] = useState('');

  // Função para inserir o texto na coleção
  const insert = async () => {
    try {
      await callMeteorMethod('insertThread', text);
      setText('');
     } catch (error) {
      console.error('Erro ao inserir comentário:', error);
      alert('Erro ao inserir comentário.');
    }
  };

  // Função para limpar a coleção
  const clearThreads = async () => {
    const confirmed = window.confirm('Tem certeza de que deseja limpar todos os comentários? Esta ação não pode ser desfeita.');
    
    if (confirmed) {
      try {
        await callMeteorMethod('clearThreads');
      } catch (error) {
        console.error('Erro ao limpar a coleção:', error);
        alert('Erro ao limpar a coleção.');
      }
    } else {
      alert('Ação de limpeza cancelada.');
    }
  };

  return (
    <div className="flex items-top justify-center max-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <h3 className="text-3xl text-gray-900 font-bold mb-4">
            Welcome to Meteor!
          </h3>
          <div className="flex justify-center mb-2 ">
            <svg xmlns="http://www.w3.org/2000/svg"  width="75" height="75" viewBox="0 0 400 400">
              <g fill="#DE4F4F">
                <path d="M286.575 306.886L44.755 49.922l256.962 241.82c4.312 4.056 4.518 10.837.46 15.146-4.053 4.31-10.832 4.518-15.144.46-.15-.14-.318-.31-.458-.462M251.032 325.01L68.692 127.528 266.177 309.87c4.35 4.013 4.618 10.794.604 15.144-4.018 4.35-10.794 4.617-15.146.604-.2-.19-.413-.406-.602-.607M214.083 325.542L92.907 194.272 224.18 315.446c2.898 2.676 3.077 7.197.402 10.098-2.677 2.896-7.195 3.082-10.097.402-.136-.125-.277-.272-.402-.405M315.612 234.685L189.102 98.078 325.71 224.585c2.896 2.684 3.067 7.203.387 10.1-2.682 2.895-7.2 3.066-10.098.387-.13-.123-.268-.258-.388-.387M304.697 272.93L121.567 74.655l198.274 183.13c4.35 4.017 4.62 10.796.605 15.144-4.017 4.352-10.797 4.617-15.146.604-.205-.19-.418-.404-.603-.605M176.31 314.783l-57.647-62.695 62.692 57.65c1.453 1.334 1.547 3.596.215 5.045-1.338 1.453-3.598 1.55-5.05.215-.072-.07-.144-.143-.21-.215M311.093 189.297l-57.65-62.694 62.696 57.646c1.45 1.335 1.546 3.597.21 5.048-1.335 1.45-3.595 1.547-5.05.21-.07-.065-.143-.143-.207-.21" />
              </g>
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-4">Faça um comentário:</h2>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={255}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mb-4"
          />
          <button
            onClick={insert}
            type="button"
            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg"
          >
            Fazer comentário
          </button>
          <button
            onClick={clearThreads}
            type="button"
            className="mt-2 ml-2 inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-lg"
          >
            Limpar Threads
          </button>
        </div>
      </div>
    </div>
  );
};
