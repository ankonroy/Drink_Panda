'use client';

import Script from 'next/script';
// import '@/types/custom.d';

export default function DialogflowMessenger() {
  return (
    <>
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
        strategy="afterInteractive"
      />
      {/* @ts-expect-error Custom web component from Dialogflow */}
      <df-messenger
        intent="WELCOME"
        chat-title="mini-roy"
        agent-id="5641dbb5-c0c9-4022-b54d-b509b6d68700"
        language-code="en"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      ></df-messenger>
    </>
  );
}
