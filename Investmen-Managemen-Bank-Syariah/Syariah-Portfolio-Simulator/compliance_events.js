/*
  Syariah Compliance Event Triggers
  This file maps a simulation day number to a list of
  compliance events. This simulates the quarterly
  OJK/DSN-MUI review.
*/
const complianceEvents = {
    // On Day 90 (End of Q1)
    "90": [
        { 
            ticker: "ASII", 
            status: "FAIL_DEBT", 
            message: "ASII breached the 45% debt-to-asset ratio." 
        },
        { 
            ticker: "ADRO", 
            status: "FAIL_INCOME", 
            message: "ADRO non-halal income exceeded the 10% revenue limit."
        }
    ],
    // On Day 180 (End of Q2)
    "180": [
        { 
            ticker: "TLKM", 
            status: "FAIL_DEBT", 
            message: "TLKM breached the 45% debt-to-asset ratio."
        },
        { 
            ticker: "ASII", 
            status: "PASS", 
            message: "ASII has returned to compliance."
        }
    ]
};
