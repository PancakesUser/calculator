import React from 'react';
import {resolve, evaluate} from "mathjs";
import './App.css';

function App() {
  const [input, setInput] = React.useState<string | null>(null);
  const [numbers, setNumbers] = React.useState<Array<any>>(
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  );
  const [operators, setOperators] = React.useState<Array<any>>(
    ["/", "%", "*", "-", "+"]
  );

 
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) 
  {
    const {value} = e.currentTarget;
    console.log(value);
    setInput((prevValue: string | null) => {
      // Aquí puedes realizar operaciones basadas en el valor anterior del estado (prevValue)
      if (prevValue === null) {
        // Manejar el caso cuando el estado es null
        return value;
      }

      return prevValue + value;
    });
  }


  async function returnResult() 
  {
    if(input && input.length > 0)
    {
      const result = await evaluate(`${input}`);
      setInput(result);
    }
  }

  React.useEffect(() => {
    console.log(input);
  }, [input])


  return (
    <div className="App">
      <center>
      <h1 className="text-2xl text-white">Calculadora</h1>
      </center>
      <center>
        <div className="bg-blue-500 rounded-sm shadow-lg w-fit p-5 mt-[15%]">
          <header>
            <h1>Casio</h1>
            <div className="w-full bg-white rounded-sm">
             <input disabled type="text" placeholder={`${input ? input : 0}`}/>
            </div>
          </header>
          <main className={"mt-5 border-t-2"}>
            <div className="flex flex-row justify-between gap-5">
              <div className={"flex flex-wrap flex-row gap-5 items-center justify-between w-[120px] mt-2"}>
                {numbers?.length > 0 && numbers.reverse().map((item: any) => {
                  return(
                    <>
                      <button 
                      value={item}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {handleClick(e)}}
                      className={"bg-white shadow-lg px-2 rounded-sm"} 
                      key={item}
                      >{item}
                      </button>
                    </>
                  )
                })}
                <button
                onClick={() => {setInput(null)}}
                className={"bg-purple-700 px-1 text-red-500 rounded-sm"}
                >
                  CL
                </button>
                <button 
                className={"bg-purple-700 text-red-500 rounded-sm px-2"}
                onClick={() => {returnResult()}}
                >=
                </button>
              </div>
              {/* Operadores */}
              <div className="flex flex-col gap-2 flex-nowrap items-center justify-between mt-2">
                {operators?.length > 0 && operators.map((operator: any) => {
                  return(
                    <>
                      <button
                       value={operator}
                       onClick={(e: React.MouseEvent<HTMLButtonElement>) => {handleClick(e)}}
                       key={"operator"+operator}
                       className="bg-orange-500 text-white rounded-sm  min-w-[25px]"
                      >
                        {operator}
                      </button>
                    </>
                  )
                })}
              </div>
            </div>
          </main>
        </div>
      </center>
    </div>
  );
}

export default App;
