declare module 'react-facebook-login' {
    import * as React from 'react';
  
    interface ReactFacebookLoginProps {
      appId: string;
      autoLoad?: boolean;
      callback: (response: any) => void;
      onFailure?: (response: any) => void;
      fields?: string;
      scope?: string;
      cssClass?: string;
      xfbml?: boolean;
      cookie?: boolean;
      textButton?: string;
      version?: string;
      language?: string;
      isMobile?: boolean;
      disableMobileRedirect?: boolean;
      redirectUri?: string;
      icon?: string | React.ReactNode;
      containerStyle?: React.CSSProperties;
      buttonStyle?: React.CSSProperties;
      disable?: boolean;
    }
  
    export default class ReactFacebookLogin extends React.Component<ReactFacebookLoginProps> {}
  }