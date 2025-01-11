import React from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './HtmlEditor.css'


function HtmlEditor(){
    const { quill, quillRef } = useQuill();

    return(
        <div className="Editor">
            <div  style={{ width: 930, height: 300 }}>
      <div ref={quillRef} />
    </div>

        </div>

    );

}

export default HtmlEditor;