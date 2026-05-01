# Developer Productivity MVP 🚀

A focused full-stack prototype that translates raw SDLC metrics into actionable insights for developers. 

## 📖 Project Overview
This project addresses the "Metrics Overload" problem where developers see raw data but lack context on how to improve[cite: 1]. This MVP focuses on a single **Individual Contributor (IC) journey**, transforming metrics into a human-readable "story" with concrete next steps[cite: 1].

### Key Features
* **Metric Dashboard**: Real-time visualization of 5 core metrics: Lead Time, Cycle Time, Deployment Frequency, PR Throughput, and Bug Rate[cite: 1].
* **Narrative Interpretation**: A specialized section that explains the "likely story" behind the numbers to reduce developer anxiety[cite: 1].
* **Actionable Next Steps**: A tailored checklist suggesting specific engineering improvements based on current performance trends[cite: 1].

## 🛠️ Technical Stack
I prioritized **clarity and efficiency** over heavy infrastructure to deliver a high-quality product experience[cite: 1]:

* **Frontend**: React.js initialized with **Vite** for a fast development loop[cite: 1].
* **Styling**: **Tailwind CSS v4** for modern, responsive UI design[cite: 4, 6].
* **Backend/Data**: A **Python-based Data Pipeline** using Pandas to calculate metrics directly from the provided source tables[cite: 1, 2].
* **Mock API**: Static JSON-based data store acting as a lightweight backend[cite: 1].

## 📊 Metric Logic
Calculations follow the specific simplified logic defined in the assignment workbook[cite: 1]:
* **Lead Time for Changes**: Average time from PR opened to successful production deployment[cite: 1].
* **Cycle Time**: Average time from issue "In Progress" to "Done"[cite: 1].
* **Bug Rate**: Escaped production bugs found in the month divided by issues completed[cite: 1].

## 🤖 Responsible AI Use
AI was utilized as a primary collaborator to accelerate research, architecture, and debugging[cite: 1]:
* **Data Handling**: Used AI to efficiently map the source Excel tables and calculate the aggregation logic in Python[cite: 1].
* **Frontend Architecture**: Assisted in scaffolding the React component tree and configuring the Tailwind v4 Vite plugin[cite: 1].
* **Product Thinking**: Collaborated on the User Journey mapping to ensure the UI addressed the specific pain points of the IC persona[cite: 1].

## 🚀 Getting Started

### 1. Process the Data
Ensure `intern_assignment_support_pack_dev_only_v3.xlsx` is in the root directory.
```bash
pip install pandas openpyxl
python extract_data.py
```
### 2. Run the App
```bash
cd client
npm install
npm run dev
```

### 🎥 Deliverables
Video Walkthrough: https://drive.google.com/file/d/13w8QSfbo2kR-xUgi46BLhPEaLjWl5DEf/view?usp=sharing
*Miro User Journey: https://miro.com/app/board/uXjVHZ_84n8=/?share_link_id=717519092024
