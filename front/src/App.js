import './App.css';
import { useEffect, useState } from 'react';
import socket from './server';
import InputField from './components/InputField/InputField';

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  console.log('messageList', messageList);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessageList((prevState) => prevState.concat(message));
    });
    askUserName();
  }, []);
  const askUserName = () => {
    const userName = prompt('이름을 입력하세요');

    socket.emit('login', userName, (res) => {
      if (res.success) setUser(res.data);
    });
  };

  const sendMessage = (e) => {
    e.preventDefault();

    socket.emit('sendMessage', message, (res) =>
      console.log('sended message, res:', res),
    );
  };

  return (
    <div>
      <div className='App'>
        <InputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
