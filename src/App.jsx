import { useContext, useEffect, useState } from "react";
import { Context } from "./Context/Main";

const App = () => {
  const { next, prev, saveKardo, current, totalQuizz, answers } = useContext(Context);

  return (
    <div className="max-w-sm mx-auto flex justify-center flex-col items-center h-screen">
      <h4 className="my-4 text-right w-full">Total {answers.length} question answered out of {totalQuizz}</h4>
      <QuizCard />
      <div className="flex justify-between w-full m-2">
        <button disabled={current == 0 ? true : false}
          onClick={prev} className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Prev
        </button>
        {
          current == totalQuizz - 1
            ? <button onClick={saveKardo} className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save kardo</button>
            : <button onClick={next} className="disabled:bg-gray-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
        }
      </div>
    </div>
  );
};
export default App;


const QuizCard = () => {
  const { currentData, answers, current, userAnswerHandler } = useContext(Context);
  const [selected, setSelected] = useState(null);
  const options = ['a', 'b', 'c', 'd'];

  useEffect(
    () => {
      const found = answers.find(a => a.que_index == current);
      if (found) {
        setSelected(options.indexOf(found.user_sel));
      } else {
        setSelected(null);
      }
    }, [current]
  )

  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
      <h2 className="text-xl font-bold mb-4">{current + 1}) {currentData?.question}</h2>
      <div className="space-y-2">
        {
          [currentData?.option_a, currentData?.option_b, currentData?.option_c, currentData?.option_d]
            .map(
              (opt, index) => {
                return (
                  <button
                    onClick={
                      () => {
                        if (selected == index) {
                          setSelected(null)
                        } else {
                          setSelected(index);
                        }
                        userAnswerHandler(current, options[index]);
                        // userAnswerHandler(2,options[index]);
                        // userAnswerHandler(2,options[1]);
                        // userAnswerHandler(2,b);
                        // options[0] => a
                        // options[2] => c
                      }
                    }
                    key={index}
                    className={`${selected == index ? 'bg-blue-700 animate-pulse-once text-white' : ''} 
                    w-full border border-blue-500 font-bold py-2 px-4 rounded`}
                  >
                    {opt}
                  </button>
                )
              }
            )
        }
      </div>
    </div>
  );
};

