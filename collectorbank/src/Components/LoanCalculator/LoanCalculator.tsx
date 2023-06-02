import React, { useState } from 'react';

const LoanCalculator = () => {
   const sliderEmptyBackground = "#fff";
   const sliderFilledColor = "#582F87";

   const yearlyInterestRate = 0.099;
   const monthlyInterestRate = yearlyInterestRate / 12;

   const minDebtAmount = 20000;
   const maxDebtAmount = 200000;
   const debtStep = 10000;

   const minDuration = 2;
   const maxDuration = 10;
   const durationStep = 1;

   const [debtAmount, setDebtAmount] = useState(100000);
   const [loanDuration, setLoanDuration] = useState(4);
   const [monthlyCost, setMonthlyCost] = useState(0);

   const handleDebtAmountChange = (event: any) => {
      const amount = parseInt(event.target.value, 10);
      setDebtAmount(amount);
      calculateMonthlyCost(amount, loanDuration);
   };

   const handleLoanDurationChange = (event: any) => {
      const duration = parseInt(event.target.value, 10);
      setLoanDuration(duration);
      calculateMonthlyCost(debtAmount, duration);
   };

   const calculateMonthlyCost = (amount: number, duration: number) => {
      const numberOfMonths = duration * 12;
      const cost =
         (amount *
         monthlyInterestRate *
         Math.pow(1 + monthlyInterestRate, numberOfMonths)) /
         (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);

      setMonthlyCost(Math.round(cost));
   };

   const widthMaxAmountContainer = (amount: number, max: number, step: number) => {
      const width = 100 - widthAmountContainer(amount, max, step);
            
      return width;
   }

   const widthAmountContainer = (amount: number, max: number, step: number) => {
      const width = 100 * ((amount - step) / max);

      return width;
   }

   const sliderWidth = (amount: number, max: number, step: number) => {
      return 100 * ((amount - step * 1.5) / (max - step));
   }

   const toApplicationButtonClick = () => {
      console.log(`/loan-application/?amount=${debtAmount}&months=${loanDuration * 12}`);
   }

   return (
      <div
         className="loan-calculator__container">
         <div
            className="loan-calculator__top-container">
            <h3 className="loan-calculator__top-container__header">
               Lånekalkyl
            </h3>

            <div className="loan-calculator__cost-bubble">
               <label htmlFor="monthly-cost">
                  Exempel på månadskostnad
               </label>
               <output id="monthly-cost">{monthlyCost} SEK / mån</output>
            </div>
         </div>
         <div className="loan-calculator__slider-container">
            <div className="loan-calculator__slider--hidden-text">
               <div
                  className="loan-calculator__debt-amount"
                  style={{ "width": `${widthAmountContainer(debtAmount, maxDebtAmount, debtStep)}%` }}>
                  {debtAmount} kr
               </div>
               {widthMaxAmountContainer(debtAmount, maxDebtAmount, debtStep) > 0 &&
                  <div
                     className="loan-calculator__max-debt-amount"
                     style={{ "width": `${widthMaxAmountContainer(debtAmount, maxDebtAmount, debtStep)}%` }}>
                     {debtStep + debtAmount < maxDebtAmount &&
                        <span>
                           {maxDebtAmount} kr
                        </span>
                     }
                  </div>
               }
            </div>
            <label
               htmlFor="debt-amount"
               className="loan-calculator__label">
               Lånebelopp
            </label>
            <input
               type="range"
               id="debt-amount"
               min={minDebtAmount}
               max={maxDebtAmount}
               step={debtStep}
               value={debtAmount}
               onChange={handleDebtAmountChange}
               className="loan-calculator__slider"
               style={{ "background": `linear-gradient(to right, ${sliderFilledColor} ${sliderWidth(debtAmount, maxDebtAmount, debtStep)}%, ${sliderEmptyBackground} ${sliderWidth(debtAmount, maxDebtAmount, debtStep)}%)` } as React.CSSProperties}
               />            
         </div>

         <div className="loan-calculator__slider-container">
            <div className="loan-calculator__slider--hidden-text">
               <div
                  className="loan-calculator__duration-amount"
                  style={{ "width": `${widthAmountContainer(loanDuration, maxDuration, durationStep)}%` }}>
                  {loanDuration} år
               </div>
               {widthMaxAmountContainer(loanDuration, maxDuration, durationStep) > 0 &&
                  <div
                     className="loan-calculator__max-duration-amount"
                     style={{ "width": `${widthMaxAmountContainer(loanDuration, maxDuration, durationStep)}%` }}>
                     {loanDuration < maxDuration &&
                        <span>{maxDuration} år</span>
                     }
                  </div>
               }
            </div>
            <label
               htmlFor="loan-duration"
               className="loan-calculator__label">
               Lånetid
            </label>
            <input
               type="range"
               min={minDuration}
               max={maxDuration}
               step={durationStep}
               value={loanDuration}
               onChange={handleLoanDurationChange}
               className="loan-calculator__slider"
               style={{ "background": `linear-gradient(to right, ${sliderFilledColor} ${sliderWidth(loanDuration, maxDuration, durationStep)}%, ${sliderEmptyBackground} ${sliderWidth(loanDuration, maxDuration, durationStep) }%)` } as React.CSSProperties}
               />
         </div>

         <div className="loan-calculator__action-buttons-row">
            <button
               className="primary"
               onClick={toApplicationButtonClick}>
               Till ansökan
            </button>
         </div>
      </div>
   );
};

export default LoanCalculator;