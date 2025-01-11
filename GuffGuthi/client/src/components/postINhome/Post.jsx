import React from 'react';
import "./post.css"
import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/post/"
})
function post(){
    return(
        <div className="card">
            <div className="card-header">
            <img
                src="./src/assets/profile.jpg"
                alt="User Avatar"
                className="avatar"
            />
          <div className="author">Melissa Peters</div>
        </div>
        <div className="card-title">
          Prince Harry's lawsuit against Murdoch's UK group moves towards trial as others settle
        </div>
        <div className="card-content">
          Prince Harry is continuing his lawsuit against Rupert Murdoch's News Group Newspapers (NGN) over alleged unlawful activities by journalists and private investigators despite dozens of others settling their cases, his lawyer said on Friday.<br /><br />
          Harry, 40, the younger son of King Charles, is suing the publisher of the Sun and the now-defunct News of the World at the High Court in London, alleging NGN unlawfully obtained private information about him from 1996 until 2011.<br /><br />
          The royal's case was one of about 40 lawsuits against NGN, but all but one other litigant – Tom Watson, the former deputy leader of Britain's now-governing Labour Party – have now settled, Harry's lawyer David Sherborne told the court.
        </div>
        <div className="card-footer">
          <div className="actions">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              13k
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon">
                <path d="M21 6.5c0-.83-.67-1.5-1.5-1.5H6.81l-.94-2.06C5.7 2.55 5.31 2.31 4.88 2.19c-.27-.08-.57-.08-.84 0H3v2h1.03l2.6 5.74-.95 1.7c-.09.16-.16.33-.21.5-.3.85-.5 1.75-.5 2.68C5 17.95 6.05 20 8 20h8v-2H8c-.87 0-1-.64-1-1.5 0-.48.12-.95.32-1.36L8.67 13h7.33c.56 0 1.06-.31 1.33-.79l3.92-7.01c.05-.1.08-.21.08-.32zM7.38 11l.94-1.5h7.45l-1.58 2.5H7.38zM19 18h-2v2h2v2h2v-2h2v-2h-2v-2h-2v2z" />
              </svg>
              214
            </span>
          </div>
        </div>
      </div>
    )
}

export default post;


