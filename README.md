# Pneumonia Detection from Chest X-Ray Images using CNN

## Description  

A Deep Learning system for detecting pneumonia from chest X-ray images using a modified ResNet18 model. The project achieves high accuracy in classifying X-ray images into "Normal" or "Pneumonia" and includes full data preprocessing, augmentation, training, evaluation, and inference on new images.
## Dataset
- **Source**: [Kaggle - Chest X-Ray Images (Pneumonia)](https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia)
- **Size**: ~5,863 images (Train: 5,216 | Val: 16 | Test: 624)
- **Classes**: NORMAL – PNEUMONIA


## Team Members & Tasks
1. Problem Definition and Data Collection ( **Mostafa Tamer** - **Yahya Sanad** - **Eman Heikal** )
2. Data cleaning and Analysis (**Hager Rageb** - **Yahya Sanad** - **Eman Heikal** )
3. Feature engineering (**Hager Rageb** - **Yahya Sanad** - **Eman Heikal** )
4. Model design (**Mostafa Tamer** - **Hager Rageb** - **Nourhan Abdel Rahman** -**Dina Khalid** )
5. Model training (**Mostafa Tamer** - **Nourhan Abdel Rahman** - **Dina Khalid**  )
6. Model testing and inference (**Nourhan Abdel Rahman** - **Dina Khalid**)
7. GUI implementation and application running (**Ahmed Elshiekh** - **Aya**)

## Project Phases
- **Problem Definition & Data Collection** :
Dataset downloaded via Kaggle API and organized into train/val/test directories.
- **Data Cleaning & Exploratory Data Analysis (EDA)** :

-Analyzed class distribution (imbalanced: more PNEUMONIA cases).

-Visualized sample images, pixel histograms, and augmentation effects.

- **Feature Engineering & Data Augmentation** :

-Converted RGB images to grayscale (1 channel).

-Applied transformations: RandomHorizontalFlip, RandomRotation(±15°), ColorJitter.

-Standardized to 224×224 resolution with normalization (mean=0.5, std=0.5).

- **Model Design** :

-Base: ResNet18 pretrained on ImageNet.

-Modifications: First conv layer adjusted for grayscale input; final FC     
 layer to 1 output.

-Loss: BCEWithLogitsLoss with positive weights to address class imbalance.

- **Model Training** :

-Optimizer: Adam (lr = 1e-4).

-Scheduler: StepLR (gamma=0.1 every 3 epochs). 

-Trained for 10 epochs on Google Colab GPU.

-Model saved as best_model.pth.
- **Model Testing & Inference** : 

-Test Accuracy: ~94–95%.

-Generated confusion matrix and classification reports.

-Implemented single-image prediction function in Python backend.



- **GUI Implementation** :

Developed a full-stack web application with React (frontend) and Python (backend).

-Frontend (React + Vite):

 Modern UI for image upload, real-time predictions, and result visualization. 
Built with components for drag-and-drop upload, progress indicators, and responsive design.

-Backend (Python): 

Handles model loading, image preprocessing, and inference via API endpoints (likely FastAPI or Flask).

-Features:

Upload chest X-ray images via web interface (supports .jpg/.png).
Send image to backend for processing with ResNet18 model.
Display prediction (NORMAL/PNEUMONIA) with confidence score and image preview.
Interactive elements like history of predictions and export results.


## Project Structure

```text
dl-project/
├── backend/                      # Python backend for model inference
│   ├── venv/                     # Virtual environment
│   ├── pycache/                  # Python cache
│   ├── bin/                      # Virtual env binaries
│   ├── include/                  # Virtual env includes
│   ├── lib/                      # Virtual env libraries
│   ├── pyvenv.cfg                # Virtual env config
│   ├── .gitignore                # Git ignore for backend
│   ├── main.py                   # Backend server (API endpoints for predictions)
│   ├── model.py                  # Model loading and inference logic (ResNet18)
│   └── tempCodeRunnerFile.py     # Temporary/test script
├── frontend/                     # React frontend with Vite
│   ├── node_modules/             # NPM dependencies
│   ├── public/                   # Static assets
│   │   ├── .gitignore
│   │   └── index.html            # Entry HTML template
│   ├── src/                      # Source code
│   │   ├── components/           # React components (e.g., Upload, PredictionDisplay)
│   │   │   └── components.json   # Component config/manifest
│   │   └── global.css            # Global styles
│   ├── .gitignore                # Git ignore for frontend
│   ├── index.css                 # Main CSS
│   ├── index.html                # (Duplicate? or build output)
│   ├── index.jsx                 # React entry point (App rendering)
│   ├── package.json              # NPM dependencies and scripts
│   ├── postcss.config.js         # PostCSS config
│   └── vite.config.js            # Vite build configuration
└── README.md                     # This file
```



## How to Run

```bash
cd backend
source venv\Scripts\activate
fastapi run main.py
cd ../frontend
npm install
npm run dev
```
## Browser 
[local host-port: 5173](http://localhost:5173)


