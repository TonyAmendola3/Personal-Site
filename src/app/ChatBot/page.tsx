export default function ChatBot() {
  const chatInput = document.querySelector('.chat-input textarea') as HTMLInputElement;
  const sendChatBtn = document.querySelector('.chat-input button') as HTMLInputElement;
  const chatbox = document.querySelector(".chatbox");
  
  let userMessage: string;
  const API_KEY = 
      "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";
  
  //OpenAI Free APIKey
  
  const createChatLi = (message: string, className: string) => {
      const chatLi = document.createElement("li");
      chatLi.classList.add("chat", className);
      const chatContent = 
          className === "chat-outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
      chatLi.innerHTML = chatContent;
      return chatLi;
  }
  
  const generateResponse = (incomingChatLi: HTMLLIElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    };

    fetch(API_URL, requestOptions)
      .then(res => {
          if (!res.ok) {
              throw new Error("Network response was not ok");
          }
          return res.json();
      })
      .then(data => {
          messageElement!.textContent = data.choices[0].message.content;
      })
      .catch(() => {
          messageElement!.classList.add("error");
          messageElement!.textContent = "Oops! Something went wrong. Please try again!";
      })
      .finally(() => chatbox?.scrollTo(0, chatbox?.scrollHeight));
  };
  
  
  const handleChat = () => {
    userMessage = chatInput?.value.trim();
    if (!userMessage) {
        return;
    }
    chatbox?.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatbox?.scrollTo(0, chatbox?.scrollHeight);

    setTimeout(() => {
      const incomingChatLi = createChatLi("Thinking...", "chat-incoming")
      chatbox?.appendChild(incomingChatLi);
      chatbox?.scrollTo(0, chatbox?.scrollHeight);
      generateResponse(incomingChatLi);
    }, 600);
  }
  
  sendChatBtn.addEventListener("click", handleChat);
  
  const cancel = () => {
    const chatbotcomplete = document.querySelector(".chatBot") as HTMLElement;
    if (chatbotcomplete?.style.display != 'none') {
        chatbotcomplete.style.display = "none";
        const lastMsg = document.createElement("p");
        lastMsg.textContent = 'Thanks for using our Chatbot!';
        lastMsg.classList.add('lastMessage');
        document.body.appendChild(lastMsg)
    }
  }

    return (
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="chatBot">
          <header>
              <h2>ChatBot</h2>
              <span id="cross"
                    onClick={cancel}>X</span>
          </header>
          <ul className="chatbox">
              <li className="chat-incoming chat">
                  <p>Hey! How can I assist you today?</p>
              </li>
          </ul>
          <div className="chat-input">
              <textarea rows={0} cols={17}
                        placeholder="Enter a message..."></textarea>
              <button id="sendBTN">Send</button>
          </div>
        </div>
      </main>
    );
  }
  