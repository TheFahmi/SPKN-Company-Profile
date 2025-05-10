declare module 'react-quill' {
  import React from 'react';
  
  export interface ReactQuillProps {
    value: string;
    onChange: (content: string) => void;
    modules?: any;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    [key: string]: any;
  }
  
  const ReactQuill: React.ForwardRefExoticComponent<ReactQuillProps & React.RefAttributes<any>>;
  
  export default ReactQuill;
} 