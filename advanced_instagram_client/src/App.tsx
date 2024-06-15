import Alert from "./components/alert"
import { useState } from "react"
import { useEffect } from "react"

import useWebSocket, { ReadyState } from 'react-use-websocket';

type errodr = {
  state: boolean
  title: string;
  description: string
}
type WsEventTypes = 'NewSearch' | 'LogIn'

function App() {
  const { sendJsonMessage, readyState, lastMessage } = useWebSocket("ws://localhost:3002/ws");

  const [inputValue, setInputValue] = useState<string>('')
  const [error, setError] = useState<errodr>({
    state: false,
    title: "",
    description: ""
  })
  const [messageHistory, setMessageHistory] = useState<MessageEvent<string>[]>([])


  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(messageHistory[0].data)
    }
  }, [lastMessage])

  useEffect(() => {
    setTimeout(() => {
      setError({ state: false, title: "", description: "" })
    }, 10000)

  }, [error.state])

  function login() {
    sendJsonMessage<{ event: WsEventTypes, payload: Array<string> }>({
      event: "LogIn", payload: []
    })
  }

  function onSubmitKeyword() {
    if (inputValue === "") {
      setError({
        state: true,
        title: "Input Error",
        description: "Please put some keywords before launching the script ..."
      })
    } else {
      const keywords = inputValue.split(',').map(item => item.trim()).filter(item => item !== "")
      sendJsonMessage<{ event: WsEventTypes, payload: Array<string> }>({ event: "NewSearch", payload: keywords })
      setInputValue('')
    }
  }




  return (
    <div className='w-full h-full pt-7 flex justify-center items-center flex-col'>



      <div className="mb-20 flex">
        <div className="relative me-4 cursor-pointer ">
          <img className="w-10 h-10 rounded-full" src="https://cdn.icon-icons.com/icons2/827/PNG/512/server_icon-icons.com_66539.png" alt="profile image" />
          {
            connectionStatus === "Open" ? <span className="bg-green-500 top-0 start-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span> : <span className="bg-red-500 top-0 start-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
          }
        </div>

        <div onClick={() => { login() }} className="cursor-pointer relative me-4 bg-black rounded-full">
          <img className="w-10 h-10 rounded-full" src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/instagram-white-icon.png" alt="profile image" />
          {
            connectionStatus === "Open" ? <span className="bg-green-500 top-0 start-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span> : <span className="bg-red-500 top-0 start-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
          }
        </div>


      </div>
      <div className='text-center'>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          INSTASCRAPE PRO
        </h1>
        <p className="scroll-m-20 border-b pb-2 text-sm font-semibold tracking-tight first:mt-0">
          who are you looking for today ?
        </p>
      </div>



      <div className="flex m-10 flex-col text-left">
        <h4 className="scroll-m-20 pb-8 text-xl font-semibold tracking-tight">
          Instagram keyword search :
        </h4>
        <input type="email" value={inputValue} onChange={(e) => { setInputValue(e.target.value) }} id="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example, example, example, example, example," />
        <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">please make sure the keywords are "," sperated. but it will be better to only use one keyword per search</p>
        <button onClick={() => { onSubmitKeyword() }} className="mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Start the Search</button>
      </div>

      {error.state ?
        <Alert title={error.title} description={error.description} /> : ""}



    </div>
  )
}

export default App
