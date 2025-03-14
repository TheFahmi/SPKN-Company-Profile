declare module 'swagger-ui-react' {
  import React from 'react';

  interface SwaggerUIProps {
    spec?: object;
    url?: string;
    layout?: string;
    docExpansion?: 'list' | 'full' | 'none';
    deepLinking?: boolean;
    defaultModelExpandDepth?: number;
    defaultModelRendering?: 'example' | 'model';
    displayOperationId?: boolean;
    displayRequestDuration?: boolean;
    filter?: boolean | string;
    maxDisplayedTags?: number;
    operationsSorter?: (a: any, b: any) => number;
    showExtensions?: boolean;
    showCommonExtensions?: boolean;
    tagSorter?: (a: any, b: any) => number;
    onComplete?: () => void;
    requestInterceptor?: (req: any) => any;
    responseInterceptor?: (res: any) => any;
    showMutatedRequest?: boolean;
    supportedSubmitMethods?: Array<string>;
    validatorUrl?: string | null;
    withCredentials?: boolean;
    persistAuthorization?: boolean;
    presets?: Array<any>;
    plugins?: Array<any>;
    pluginsOptions?: object;
    tryItOutEnabled?: boolean;
  }

  const SwaggerUI: React.FC<SwaggerUIProps>;

  export default SwaggerUI;
}

declare module '*.json' {
  const value: any;
  export default value;
} 