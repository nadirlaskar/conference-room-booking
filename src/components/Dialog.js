import React from 'react';
import './Dialog.css';

function Dialog({open, onCancle, message, content, footer}) {
  return (
      open?<div className={"Dialog-wrapper"} onClick={()=>onCancle()}>
          <div className={"Dialog-box"} onClick={e=>e.stopPropagation()}>
              <div className={"Dialog-header"}>{message}</div>
              <div className={"Dialog-content"}>{content}</div>
              <div className={"Dialog-footer"}>{footer}</div>
          </div>
      </div>:null
  );
}

export default Dialog;
