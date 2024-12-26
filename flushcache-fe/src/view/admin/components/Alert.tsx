import React, { useState } from 'react';
import { Alert } from 'flowbite-react';

export function AlertComponent() {
  const [showAlert, setShowAlert] = useState(true);

  return (
    showAlert && (
      <div className="fixed bottom-4 right-4 w-80">
        <Alert
          color="info"
          onDismiss={() => setShowAlert(false)}
        >
          <span>
            <strong>Info!</strong> This is a bottom-right alert.
          </span>
        </Alert>
      </div>
    )
  );
};

export default AlertComponent;
