import { useEffect, useState } from 'react';
import './App.css'
import { bio } from './data/bio';
import { extraCharaters } from './data/extraChar';

function App() {

  const [char, setChar] = useState({ first: '', second: '' })

  const delayedCharacter = () => {
    let delay = 0
    extraCharaters.forEach(async (i) => {
      delay += 60
      const first = Math.floor(Math.random() * extraCharaters.length);
      const second = Math.floor(Math.random() * extraCharaters.length);
      console.log('first', first, 'second', second);
      const resFirst = await someAPICall(first, delay);
      const resSec = await someAPICall(second, delay);
      if (i === 'EXIT'){
        setChar({ first: '', second :''})
      }else{
        setChar({first:resFirst,second : resSec})
      }
    });
    function someAPICall(param, delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(extraCharaters[param])
        }, delay);
      })
    }
  }

  useEffect(()=>{
    delayedCharacter()
  },[])

  const playAnimation=()=>{
    delayedCharacter()
  }
  return (
    <div className="App">
      <table>
        <tbody>
        {
          bio.map(({ title, description })=>{
            return (
              <tr className='container' key={title}>
                <th>
                  {[...title].map((titleChar, index) => {
                    if (index % 2 === 0) return <span>{(char?.first ? char?.first : titleChar).toUpperCase()}</span>
                    return <span>{(char?.second ? char?.second : titleChar).toUpperCase()}</span>
                  })}
                </th>
                <td>{[...description].map((descriptionChar,i) => {
                  if (i % 2 === 0) return <span>{(char?.first ? char?.first : descriptionChar).toUpperCase()}</span>
                  return <span>{(char?.second ? char?.second : descriptionChar).toUpperCase()}</span>
                })}</td>
              </tr>
            )
          })
        }
        </tbody>
      </table>
      <div className='btn-container'>
        <button className='btn' onClick={playAnimation}>PLAY</button>
      </div>
    </div>
  );
}

export default App;
