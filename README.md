# 🐾 PetNutriAI - The Scientific Pet Diet Planner

**Tailored Nutrition. Happier Pets. Zero Guesswork.**  
A next-generation pet nutrition application built with **React**, **Vite**, and **Tailwind CSS**. It combines veterinary science with modern UI to generate precise, budget-friendly meal plans for dogs, cats, rabbits, and hamsters.

![PetNutriAI Home](./src/assets/homedog.jpeg)

---

## 🚀 Why PetNutriAI?

Most generic feeding guides are inaccurate. PetNutriAI uses **Calculated Energy Requirements** to ensure your pet gets exactly what they need—no more, no less.

### 🌟 Key Features

*   **🧬 Smart Nutrition Engine:** Calculates **RER** (Resting Energy Requirement) and **MER** (Maintenance Energy Requirement) based on:
    *   **Species Specifics:** Tailored logic for Dogs (Omnivore), Cats (Carnivore), Rabbits (Herbivore), etc.
    *   **Life Stage:** Growth factors for Puppies/Kittens vs. Seniors.
    *   **Activity Level:** Adjustments for working dogs vs. couch potatoes.
*   **🏥 Offline Health AI:**
    *   Instantly analyzes health conditions (e.g., "Diabetes", "Kidney Support") to recommend strict dietary exclusions.
    *   **Privacy First:** Runs locally in your browser. No data uploaded.
*   **💰 Budget Control:**
    *   **Budget Tier:** Affordable staple ingredients.
    *   **Balanced Tier:** Mix of quality proteins and fresh veg.
    *   **Premium Tier:** High-end cuts, organic supplements, and exotic ingredients.
*   **📅 Dynamic Meal Planner:** Generates a 7-day varied schedule to prevent "food boredom".
*   **📋 Shopping List:** Auto-aggregates ingredients into a monthly checklist with estimated costs.

---

## 🔬 The Science Behind It

We strictly follow veterinary nutritional guidelines (WSAVA / AAFCO principles).

### 1. Daily Calorie Target (MER)
We first calculate the basic energy needed to stay alive (RER) using the Kleiber's Law approximation for mammals:
$$ RER = 70 \times (Weight_{kg})^{0.75} $$

Then we apply specific multipliers (MER) based on user input:
*   **Neutered Adult:** $1.6 \times RER$
*   **Intact Adult:** $1.8 \times RER$
*   **Weight Loss:** $1.0 - 1.2 \times RER$
*   **Puppy/Kitten (<4mo):** $3.0 \times RER$
*   **Active/Working:** $2.0 - 5.0 \times RER$

### 2. Macro Distribution
Once calories are set, we split them into essential macronutrients based on species:
| Species | Protein | Fats | Carbs/Fiber |
| :--- | :---: | :---: | :---: |
| **Dog** | 25-30% | 15-20% | 50% |
| **Cat** | 40-50% | 20-30% | 10-20% |
| **Rabbit** | 12-14% | 2-4% | 80%+ (Fiber) |
| **Hamster** | 16-18% | 5-7% | 60-70% |

---

## 🛠️ Tech Stack & Architecture

Built for performance, scalability, and clean code.

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite |
| **Styling** | Tailwind CSS (v4), Lucide Icons |
| **State** | React Hooks (`useState`, `useEffect`, `useMemo`) |
| **Data** | Custom JSON stores (`ingredients.json`, `rabbit.json`) |
| **Routing** | SPA (Single Page Application) |

### 📂 File Structure Explained

```graphql
petnutriai/
├── src/
│   ├── components/
│   │   ├── PetForm.jsx          # Heart of the app. Handles 3-step profile wizard.
│   │   ├── NutritionDashboard.jsx # Visualizes the RER/MER math with charts.
│   │   ├── MealPlan.jsx         # The logic engine for generating weekly menus.
│   │   ├── BudgetSelector.jsx   # Tier selection logic.
│   │   └── Home.jsx             # Hero landing page.
│   ├── services/
│   │   ├── healthAI.js          # The "Brain". Keyword-matching engine for health risks.
│   │   └── dogApi.js            # Fetches breed data (TheDogAPI).
│   ├── data/
│   │   ├── ingredients.json     # The Database. 500+ items with prices & macros.
│   │   └── breedRisks.js        # Hardcoded medical predispositions (e.g., Dalmatians & Purines).
│   ├── utils/
│   │   └── costCalculator.js    # Utility for estimating monthly expenses.
│   └── services/
│       └── healthAI.js          # Offline Health Engine
```

---

## 📦 Installation Guide

Ready to run precise nutrition plans locally?

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/piraneshNK/SSN.git
    cd petnutriai
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Engine**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:5173` to start planning!

---

## 🔮 Future Roadmap

- [ ] **Real AI Integration:** Connect OpenAI/Gemini for generating custom recipes.
- [ ] **Auth System:** Save pet profiles to Cloud/Firebase.
- [ ] **Mobile App:** React Native port for iOS/Android.
- [ ] **Community Recipes:** Allow users to share their own balanced meal plans.

---

## ⚖️ Disclaimer & License

**Medical Disclaimer:**  
*PetNutriAI is a calculation tool, not a veterinarian. While we use standard veterinary formulas, every pet is unique. Always consult a professional before treating medical conditions with diet.*

**License:** MIT  
Free to use, modify, and distribute with attribution.

---

**Built with 💙 by Thunderbolts**
