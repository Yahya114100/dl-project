from PIL import Image, ImageTk
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision import models

class PneumoniaClassifier:
    def __init__(self, model_path='best_model.pth'):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = self.load_model(model_path)
        self.transform = transforms.Compose([
            transforms.Grayscale(num_output_channels=3),
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
    
    def load_model(self, model_path):
        # إنشاء النموذج بنفس البنية
        model = models.resnet18(weights=None)
        model.conv1 = nn.Conv2d(3, 64, kernel_size=7, stride=2, padding=3, bias=False)
        model.fc = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(model.fc.in_features, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(0.3),
            nn.Linear(512, 1)
        )
        
        # تحميل الأوزان المحفوظة
        checkpoint = torch.load(model_path, map_location=self.device)
        model.load_state_dict(checkpoint['model_state_dict'])
        model.to(self.device)
        model.eval()
        return model
    
    def predict(self, image):
        # تحميل وتجهيز الصورة
        image_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        # التنبؤ
        with torch.no_grad():
            output = self.model(image_tensor).squeeze()
            probability = torch.sigmoid(output).item()
            prediction = "PNEUMONIA" if probability > 0.5 else "NORMAL"
            
        return prediction, probability
