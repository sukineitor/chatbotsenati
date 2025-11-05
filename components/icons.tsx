import React from 'react';

export const ForkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 3C16.5523 3 17 3.44772 17 4V10.8873C18.1654 11.1248 19 12.1623 19 13.4444V21H17V13.4444C17 12.9231 16.5523 12.5 16 12.5C15.4477 12.5 15 12.9231 15 13.4444V21H13V13.4444C13 12.1623 13.8346 11.1248 15 10.8873V4C15 3.44772 15.4477 3 16 3ZM11 3V11.5H9V3H11ZM9 13.5V21H7V13.5H9ZM5 3C5.55228 3 6 3.44772 6 4V20C6 20.5523 5.55228 21 5 21C4.44772 21 4 20.5523 4 20V4C4 3.44772 4.44772 3 5 3Z"/>
  </svg>
);

export const MicIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5.4-3a5.4 5.4 0 0 1-10.8 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-1.6z"/>
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export const EndCallIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9c-1.6 0-3.15.25-4.62.72v3.1c0 .34-.02.67-.06 1C8.44 13.25 10.12 13 12 13c4.42 0 8-3.58 8-8 0-1.33-.32-2.58-.88-3.69L12 9zm0 6c-1.88 0-3.56-.25-5.06-7C5.82 8.32 5 9.05 5 10v3.5c0 .55.45 1 1 1h3.5c.95 0 1.68-.82 1.94-1.94.36-1.5.94-2.88 1.7-4.1.2-.31.13-.7-.18-לא.92L12 9zM3.93 4.93L2.5 6.36C4.78 8.64 6 12.11 6 16c0 1.68-.34 3.28-.94 4.75l1.45 1.45C7.45 20.59 8 18.37 8 16c0-4.42-1.64-8.3-4.07-11.07z"/>
    <path d="M20.49 3.51L19.07 4.93C21.35 7.21 22.98 10.68 23 14.97c0 1.68-.34 3.28-.94 4.75l1.45 1.45c.95-1.61 1.49-3.48 1.49-5.45C25 9.68 23.36 5.7 20.49 3.51z"/>
    <path d="M13.26 3.03l-.53.53c-3.13 3.13-3.13 8.22 0 11.35l.53-.53C10.13 11.25 10.13 6.16 13.26 3.03z"/>
    <path d="M17.41 13.12l-1.41 1.41c1.56-1.56 1.56-4.09 0-5.66l1.41-1.41c2.34 2.34 2.34 6.14 0 8.49z"/>
    <path d="m19.54 2.46-1.06 1.06c2.34 2.34 2.34 6.14 0 8.49l1.06-1.06c3.12-3.12 3.12-8.19 0-11.31zM4.46 19.54l1.06-1.06c-2.34-2.34-2.34-6.14 0-8.49l-1.06 1.06c-3.12 3.12-3.12 8.19 0 11.31z"/>
    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.21.81 4.24 2.18 5.82l1.41-1.41C5.54 15.36 5 13.77 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7c0 1.77-.54 3.36-1.58 4.63l1.41 1.41C20.19 16.24 21 14.21 21 12c0-4.97-4.03-9-9-9z"/>
  </svg>
);


export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
);

export const ReceiptIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z"/>
    </svg>
);

export const PackageIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 2H6c-1.11 0-2 .9-2 2v16c0 1.1.89 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zM6 20V4h7v5h5v11H6z"/>
  </svg>
);

export const KitchenIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 11c.83 0 1.5-.67 1.5-1.5S17.33 8 16.5 8 15 8.67 15 9.5s.67 1.5 1.5 1.5zM9 11.5c0 .83-.67 1.5-1.5 1.5S6 12.33 6 11.5 6.67 10 7.5 10s1.5.67 1.5 1.5z"/>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.83 0 1.5-.67 1.5-1.5S7.83 11 7 11s-1.5.67-1.5 1.5.67 1.5 1.5 1.5zm10 0c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5-1.5.67-1.5 1.5.67 1.5 1.5 1.5zM12 6c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
    <path d="M12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
  </svg>
);

export const DeliveryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
  </svg>
);

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

export const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export const SummarizeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6zm0 2h12v16H6V4zm2 2v2h8V6H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z"/>
        <path d="M12 1.25a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75zM12 6.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5z"/>
        <path d="M18.78 19.22a.75.75 0 1 1-1.06 1.06L15 17.56l-2.72 2.72a.75.75 0 0 1-1.06-1.06L13.94 16.5l-2.72-2.72a.75.75 0 1 1 1.06-1.06L15 15.44l2.72-2.72a.75.75 0 0 1 1.06 1.06L16.06 16.5l2.72 2.72z"/>
    </svg>
);
