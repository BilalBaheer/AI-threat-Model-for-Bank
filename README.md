I developed an AI-powered security system that protects bank users from fraud by monitoring unusual activities in their accounts. 
The system analyzes patterns like suspicious login attempts, unexpected transactions, or unusual spending behaviors using SQL queries on large datasets of historical banking information. 
I trained our AI model to understand what 'normal' user behavior looks like, allowing it to quickly spot potential threats when activities don't match typical patterns.
When suspicious activity is detected, the system calculates a threat score, and if this score exceeds our defined safety threshold, it automatically flags the account for immediate investigation. 
This proactive approach helps banks prevent financial fraud before it results in losses for their customers
The model learns normal user behavior by analyzing historical banking data, including typical transaction amounts, usual login locations, common banking hours, and regular spending patterns for each customer. 
I trained it using a machine learning algorithm called Isolation Forest, which helps identify inconsistency by comparing new activities against these established patterns. 
The threat score calculation starts at zero and increases based on suspicious activities - for example, if someone normally spends $100 at local stores but suddenly makes a $5,000 purchase from another country, 
the score would increase significantly. We also apply different weight multipliers for specific red flags: unusual transaction amounts get a 1.5x multiplier, new locations 1.3x, odd banking hours 1.2x, and unknown devices 1.4x. 
The final threat score ranges from 0 to 100, with any score above 70 automatically flagging the transaction for immediate review.


Make sure to Install
npm install @heroicons/react lucide-react @/components/ui
npm install express mongoose body-parser cors

[
![image](https://github.com/user-attachments/assets/b4a0039e-e3fd-47fc-9256-6851192fb5fc)
](url)
