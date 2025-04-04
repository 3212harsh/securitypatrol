import React from 'react';
import SelectAlertType from '../components/newAlerts/SelectAlertType';
import add from '../assets/add.svg';

const NewAlerts = () => {
  return (
    <div className="flex w-full h-full gap-10 justify-evenly flex-wrap items-center">
      <SelectAlertType
        title="Predefined Alerts"
        description="Choose from existing alert templates"
        image={add}
        route="/new-alerts/predefined"
      />
      <SelectAlertType
        title="Custom Alerts"
        description="Create your own custom alert"
        image={add}
        route="/new-alerts/custom"
      />
    </div>
  );
};

export default NewAlerts;
