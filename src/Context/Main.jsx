import React, { createContext, useEffect, useRef, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCSt86MyzC_0HHGoUKhGoWBrTJ2fv1mBhw",
    authDomain: "wsjp-07-55551.firebaseapp.com",
    databaseURL: "https://wsjp-07-55551-default-rtdb.firebaseio.com",
    projectId: "wsjp-07-55551",
    storageBucket: "wsjp-07-55551.appspot.com",
    messagingSenderId: "860691503851",
    appId: "1:860691503851:web:96a96a27af9071695b7cae",
    measurementId: "G-5CRBQW6MZ0"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const Context = createContext();

export default function Main(props) {
    const [showConf, setShowConf] = useState(false);
    const firstRender = useRef(true);
    const [quizzes, setQuiz] = useState([]);
    const [answers, setAnswer] = useState([]);
    // [ { index:1, user_sel:b } , {index:0, user_sel:a}]
    const [current, setCurrent] = useState(0);

    const saveKardo = () => {
        setShowConf(true);
    }
    const save = () => {
        setShowConf(false);
    }
    
    const cancle = () => {
        setShowConf(false);
    }


    const userAnswerHandler = (index, answer) => {
        const currentAnswers = [...answers];
        const found = currentAnswers.find(a => a.que_index == index);
        if (found) {
            // console.log(found.user_sel,answer);
            if (found.user_sel == answer) {
                const filteredAnswer = currentAnswers.filter(a => a.que_index != index);
                setAnswer(filteredAnswer);
            } else {
                found.user_sel = answer;
                setAnswer(currentAnswers);
            }
        } else {
            setAnswer([...answers, { que_index: index, user_sel: answer }]);
        }
    }

    const next = () => {
        setCurrent(current + 1);
    }
    const prev = () => {
        setCurrent(current - 1);
    }

    useEffect(
        () => {
            const db = getDatabase();
            const starCountRef = ref(db, 'quiz');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                const dArr = [];
                for (let k in data) {
                    dArr.push({
                        ...data[k],
                        id: k
                    })
                }
                setQuiz(dArr);
            });
        }, []
    )

    useEffect(
        () => {
            if (firstRender.current == true) {
                firstRender.current = false;
                const lsCurrent = localStorage.getItem("current");
                if (lsCurrent != null || lsCurrent != undefined) {
                    setCurrent(Number(lsCurrent));
                }

                const lsAnswers = localStorage.getItem("answer");
                if (lsAnswers != null || lsAnswers != undefined) {
                    setAnswer(JSON.parse(lsAnswers));
                }
                return;
            } else {
                localStorage.setItem("current", current);
                if (answers.length != 0)
                    localStorage.setItem("answer", JSON.stringify(answers));
            }
        }, [current, answers]
    )


    return (
        <Context.Provider value={
            { answers, saveKardo, userAnswerHandler, totalQuizz: quizzes.length, next, prev, setCurrent, current, currentData: quizzes[current] }
        }>
            <div className={`w-full h-full justify-center items-center flex fixed top-0 ${showConf ? 'animate-pulse-once' : 'hidden'}`} style={{ background: "rgba(0,0,0,0.6)" }}>
                <div className='shadow p-3 w-[600px] bg-white'>
                    <div className='text-2xl text-center'>Do you want to delete?</div>
                    <div className='justify-center my-3 flex gap-3'>
                        <button onClick={save} className='bg-green-600 px-4 py-2 text-white'>
                            Yes
                        </button>
                        <button onClick={cancle} className='bg-red-600 px-4 py-2 text-white'>
                            No
                        </button>
                    </div>
                </div>
            </div>
            {props.children}
        </Context.Provider>
    )
}


export { Context };